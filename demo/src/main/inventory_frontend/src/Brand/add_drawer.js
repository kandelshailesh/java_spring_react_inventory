import React from "react";
import 'antd/dist/antd.css';
import { Route, Switch,NavLink} from 'react-router-dom';
import {Layout,Avatar,Menu,Icon,Button,Dropdown,Card,Table,Row,Col,Drawer,Select,Input,Form,DatePicker} from 'antd';
class  AddBrandDrawer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            add_visible:false
        };
    }
    showDrawer = () => {
        this.setState({
          add_visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          add_visible: false
        });
      };
  
render()
{
    
    const { getFieldDecorator,getFieldValue } = this.props.form;
      
    return(
<Drawer
          title="Create new Brand"
          width={350}
          height={200}
        closable={true}
          onClose={this.onClose}
          visible={this.props.visible}
          bodyStyle={{ paddingBottom: 80 }}
         
        >
            <Card style={{marginTop:"50px"}}>
                
          <Form  onSubmit={this.props.submit} layout="vertical" hideRequiredMark>
            <Row gutter={24}>
                <Col span={2}></Col>
              <Col span={18}>
              <Form.Item label="Enter brandname">
                 {getFieldDecorator("name", {
                    rules: [{ required: true, message: "Please input the brand name!" }]
                  })(
                  <Input name="name" onChange={this.handleOnChange}   placeholder="Please enter brand name" />)}
                </Form.Item>
              </Col>
              
            </Row>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <Button
                onClick={this.onClose}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button  htmlType="submit"   type="primary">
                Submit
              </Button>
            </div>
          </Form>
          </Card>
        </Drawer>)
}
}
const WrappedBrandForm = Form.create({ name: 'normal_login' })(AddBrandDrawer);

export default WrappedBrandForm;