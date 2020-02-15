import {useState , useCallback} from "react";
import { TextField , Select , Form ,FormLayout , Button} from '@shopify/polaris';



function formConfiguration(){
  const [Key, setKey] = useState('');
  const handleChangeKey = useCallback((newKey) => setKey(newKey), []);

  const [Password, setPassword] = useState('');
  const handleChangePassword = useCallback((newPassword) => setPassword(newPassword), []);


  const [selected, setSelected] = useState('Live mode');
  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const options = [
    {label: 'Live mode', value: 'Live mode'},
    {label: 'Sandbox mode', value: 'Sandbox mode'},
  ];


  const handleSubmit = useCallback((_event) => {
    setKey('');
    setPassword(false);
  }, []);
  return(<div>
    <p>Setup your API</p>
    <br></br>
    <Form method="post" onSubmit={() => handleSubmit()}>
      <FormLayout>
        <Select
          label="API URL"
          options={options}
          onChange={handleSelectChange}
          value={selected}
        />
        <FormLayout.Group>
        <TextField label="API Key" value={Key} onChange={handleChangeKey} />
        <TextField label="API Password" value={Password} onChange={handleChangePassword} />
        </FormLayout.Group>
        <Button primary submit>Save Changes</Button>
      </FormLayout>
    </Form>
    </div>)
}

const apiConfiguration = () => (
    formConfiguration()
);
  
export default apiConfiguration;