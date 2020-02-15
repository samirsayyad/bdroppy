import { Page,Tabs,Card } from "@shopify/polaris";
import { Context } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import ApiConfigForm from "./tabs/ApiConfigForm";

class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab : 0 
    }
  } 
  tabs = [
    {
      id: 'Api-Configuration',
      content: 'Api Configuration',
      accessibilityLabel: 'Api Configuration',
      panelID: 'Api-Configuration-tab',
      page : <ApiConfigForm></ApiConfigForm>
    },
    {
      id: 'my-catalogs',
      content: 'My Catalogs',
      panelID: 'my-catalogs-content',
    },
    {
      id: 'Status',
      content: 'Status',
      panelID: 'Status',
    },

  ];
  static contextType = Context;
  handleTabChange = (selectedTabIndex) => {
    this.setState({selectedTab  : selectedTabIndex})
  };
  render() {
    return (
<Page>
       {/* <TitleBar
          primaryAction={{
            content: 'BDroppy',
          }}
      /> */}
        <Card>
          <Tabs tabs={this.tabs} selected={this.state.selectedTab} onSelect={this.handleTabChange}>
            <Card.Section title={this.tabs[this.state.selectedTab].content}>
            {this.tabs[this.state.selectedTab].page}
            </Card.Section>
          </Tabs>
        </Card>
      
    </Page>
    );
  }
}

export default Products;
