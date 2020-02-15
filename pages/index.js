import {Page ,Layout , Tabs,Card} from '@shopify/polaris';
import {useState , useCallback} from "react";
import { TitleBar } from '@shopify/app-bridge-react';


import apiConfiguration from "./tabs/apiConfiguration";
function TabsContainer() {
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );
  const tabs = [
    {
      id: 'Api-Configuration',
      content: 'Api Configuration',
      accessibilityLabel: 'Api Configuration',
      panelID: 'Api-Configuration-tab',
      page : apiConfiguration()
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
  return (
    <Page>
       {/* <TitleBar
          primaryAction={{
            content: 'BDroppy',
          }}
      /> */}
        <Card>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <Card.Section title={tabs[selected].content}>
            {tabs[selected].page}
            </Card.Section>
          </Tabs>
        </Card>
      
    </Page>
  );
}

const Index = () => TabsContainer();
  
export default Index;