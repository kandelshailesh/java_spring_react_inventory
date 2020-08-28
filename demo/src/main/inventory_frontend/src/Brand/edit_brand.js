import React from "react";
import 'antd/dist/antd.css';
import { Route, Switch,NavLink} from 'react-router-dom';
import {Layout,Avatar,Menu,Icon,Button,Dropdown,Card,Table,Row,Col,Drawer,Select,Input,Form,DatePicker} from 'antd';
import AddBrandDrawer from "./add_drawer";
class  EditBrandDrawer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            edit_visible:false
        };
    }
    showDrawer = () => {
        this.setState({
          edit_visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          edit_visible: false
        });
      };
  
render()
{
    
    const { getFieldDecorator,getFieldValue } = this.props.form;
      
    return(
     
        <Drawer
          title="Edit Brandname"
          width={350}
          height={200}
        closable={true}
          onClose={this.onClose}
          visible={this.state.edit_visible}
          bodyStyle={{ peditingBottom: 80 }}
         
        >
            <Card style={{marginTop:"50px"}}>
                
          <Form  onSubmit={this.handleeditSubmit} layout="vertical" hideRequiredMark>
            <Row gutter={24}>
                <Col span={2}></Col>
              <Col span={18}>
                <Form.Item label="Enter brandname">
                 {getFieldDecorator("Name", {
                    rules: [{ required: true, message: "Please input the component name!" }]
                  })(
                  <Input name="Name" onChange={this.handleOnChange}   placeholder="Please enter brand name" />)}
                </Form.Item>
                <Form.Item>
                 {getFieldDecorator("ID", {
                    rules: [{ required: true, message: "Please input the component name!" }]
                  })(
                  <Input name="ID" style={{display:'none'}} onChange={this.handleOnChange}   placeholder="Please enter brand name" />)}
                </Form.Item>
                
              </Col>
              
            </Row>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <Button
                onClick={this.onClose1}
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
        </Drawer>
        
        )
}
}

const WrappedBrandForm = Form.create({ name: 'normal_login' })(AddBrandDrawer);

export default WrappedBrandForm;