import React, { Component } from "react";
import { TextField , Select , Form ,FormLayout , Button} from '@shopify/polaris';
import Cookies from 'js-cookie';

 

class ApiConfigForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_key : "" ,
      api_password : "" ,
      api_mode : "Live mode" ,
      shop_name : Cookies.get("shopOrigin") , 
    }

    this.URL_options =  [
      {label: 'Live mode', value: 'Live mode'},
      {label: 'Sandbox mode', value: 'Sandbox mode'},
    ]
    this.gqlServerUrl ="/graphql-mdb";
  }

  handleChange = (value , id ) =>{
     this.setState({
       [id] :  value
     })
  }
  handleSubmit = () => {
    const customer_data =  this.state
    console.log(customer_data)
    this.addCustomerToShopify(customer_data)
    .then(res => {
      console.log("create cusotmer", res);
      console.log("succeed to add customer into app data");
    })
    .catch(err => {
      console.log("failed to add customer into shopify");
      console.log(err);
    });
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


ADD_CUSTOMER_SHOPIFY = (customer_data) => {
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



addCustomerToShopify = customer_data => {
  return fetch(
    this.gqlServerUrl,
    this.gqlServerOpts(this.ADD_CUSTOMER_SHOPIFY(customer_data))
  );
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
