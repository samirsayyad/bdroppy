import React, { Component } from "react";
import { TextField , Select , Form ,FormLayout , Button} from '@shopify/polaris';
import Cookies from 'js-cookie';

 

class ApiConfigForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : null ,
      api_key : "" ,
      api_password : "" ,
      api_mode : "Live mode" ,
      shop_name : Cookies.get("shopOrigin") || "shop.test.bdroppy" , 
    }
    this.gqlServerUrl ="/graphql-mdb";

    this.getCustomer(this.state.shop_name)
    this.URL_options =  [
      {label: 'Live mode', value: 'Live mode'},
      {label: 'Sandbox mode', value: 'Sandbox mode'},
    ]
  }


  handleChange = (value , id ) =>{
     this.setState({
       [id] :  value
     })
  }
  handleSubmit = () => {
    if (this.state.id !== null ){
      const customer_data =  this.state
      console.log( "handleSubmit edit" ,customer_data)
      this.editCustomer(customer_data)
      .then(res => {
        console.log("editCustomer cusotmer", res);
        console.log("succeed to editCustomer into app data");
      })
      .catch(err => {
        console.log("failed to editCustomer into shopify");
        console.log(err);
      });
    }else{
      const customer_data =  this.state
      console.log( "handleSubmit add" ,customer_data)
      this.addCustomer(customer_data)
      .then(res => {
        console.log("create cusotmer", res);
        console.log("succeed to add customer into app data");
      })
      .catch(err => {
        console.log("failed to add customer into shopify");
        console.log(err);
      });
    }
  }

  gqlServerOpts = (body, variables = null) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: variables
      ? JSON.stringify({
          query: body,
          variables
        })
      : JSON.stringify({
          query: body
        })
  });


  ADD_CUSTOMER_GRAPHQL = (customer_data) => {
    const {
      api_key,
      api_password,
      api_mode,
      shop_name,
      access_token,
    } = customer_data;

    return `
        mutation CustomerMutation	{
          setCustomer(
            api_key:  "${api_key}",
            api_password: "${api_password}",
            
            api_mode: "${api_mode}",
            shop_name: "${shop_name}",
            access_token : "${access_token}",
          )
          {
    
                  id
            
          }
      }`;
  };


  EDIT_CUSTOMER_GRAPHQL = (customer_data) => {
    const {
      api_key,
      api_password,
      api_mode,
      shop_name,
      access_token,
    } = customer_data;

    return `
        mutation CustomerMutation	{
          editCustomer(
            api_key:  "${api_key}",
            api_password: "${api_password}",
            api_mode: "${api_mode}",
            shop_name: "${shop_name}",
            access_token : "${access_token}",
          )
          {
    
                  id
            
          }
      }`;
  };

  GET_CUSTOMER_GRAPHQL = (shop_name) => {
    return `
    {customer(shop_name :"${shop_name}" ) {
     id , api_key , api_password , api_mode
    }}
      `;
  };

  addCustomer = customer_data => {
    return fetch(
      this.gqlServerUrl,
      this.gqlServerOpts(this.ADD_CUSTOMER_GRAPHQL(customer_data))
    );
  };

  editCustomer = customer_data => {
    return fetch(
      this.gqlServerUrl,
      this.gqlServerOpts(this.EDIT_CUSTOMER_GRAPHQL(customer_data))
    );
  };
  getCustomer = shop_name => {
    fetch(
      this.gqlServerUrl,
      this.gqlServerOpts(this.GET_CUSTOMER_GRAPHQL(shop_name))
    ) 
    .then(response => response.json())
    //.then(data => console.log("sdsds",data.data.customer) );
    .then(data => this.setState( data.data.customer ) );
  };
  render(){
    return(
      <div>
    <p>Setup your API</p>
    <br></br>
    <Form method="post" onSubmit={() => this.handleSubmit()}>
      <FormLayout>
        <Select
          label="API URL"
          id = "api_mode"
          options={this.URL_options }
          onChange={this.handleChange}
          value={this.state.api_mode}
        />
        <FormLayout.Group>
        <TextField label="API Key" id="api_key" value={this.state.api_key} onChange={this.handleChange} />
        <TextField label="API Password" id="api_password" value={this.state.api_password} onChange={this.handleChange} />
        </FormLayout.Group>
        <Button primary submit>Save Changes</Button>
      </FormLayout>
    </Form>
    </div>
    )
  }
}

export default ApiConfigForm;
