require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const session = require('koa-session');
dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const {receiveWebhook, registerWebhook} = require('@shopify/koa-shopify-webhooks');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY , HOST , } = process.env;

///////////////////////////////////////////////////
const initDB = require("./database");
initDB();
////////////////////////////////////////////////////
//////////////////////////////////////////////////////

const mount = require("koa-mount");
const graphqlHTTP = require("koa-graphql");
const schema = require("./graphql/schema");

///////////////////////////////////////////////////

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    server.use(session(server));
    server.keys = [SHOPIFY_API_SECRET_KEY];
    server.use(
        createShopifyAuth({
          apiKey: SHOPIFY_API_KEY,
          secret: SHOPIFY_API_SECRET_KEY,
          scopes: ['read_products'],
          async afterAuth(ctx) {
            const { shop, accessToken } = ctx.session;
            console.log(shop , accessToken);

            ctx.cookies.set('shopOrigin', shop, { httpOnly: false });

            const registration = await registerWebhook({
              address: `${HOST}/webhooks/products/create`,
              topic: 'PRODUCTS_CREATE',
              accessToken,
              shop,
              apiVersion: ApiVersion.October19
            });
         
            if (registration.success) {
              console.log('Successfully registered webhook!');
            } else {
              console.log('Failed to register webhook', registration.result);
              console.log('Failed to register webhook', registration.result.data.webhookSubscriptionCreate.userErrors );

            }
            

            ctx.redirect('/');
          },
        }),
        
      );

    const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

    router.post('/webhooks/products/create', webhook, (ctx) => {
      console.log('received webhook: ', ctx.state.webhook);
    });

    server.use(graphQLProxy({ version: ApiVersion.April19 }));
    server.use(
      mount(
        "/graphql-mdb",
        graphqlHTTP({
          schema: schema,
          graphiql: true
        })
      )
    );
    server.use(verifyRequest());
    server.use(async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
      return
    });
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
  });