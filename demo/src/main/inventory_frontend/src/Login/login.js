import React, { Component } from 'react'
import { Form,Table, Icon,Input,Select, Button, Checkbox,Col,Card,Row } from 'antd';
import LoginImage from '../login.jpg';
import { AudioOutlined,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import store from 'store';
import { Redirect } from 'react-router-dom';
const suffix = (
    <EyeInvisibleOutlined     style={{
        fontSize: 16,
    
        paddingRight: 4,
      }}
    />
  );

  


class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            branchnlist:[]
        }
    }



  handleSubmit = (e) => {
    e.preventDefault();
  
    this.props.form.validateFields((err, values) => {
      console.log(err);
        (async () => {
        //   const data =this.state.name; 
        if(this.props.form.getFieldValue('username') && this.props.form.getFieldValue('password') && this.props.form.getFieldValue('branchid'))
        {
          const data =values; 


          console.log(data);
          // const id= this.state.selectedid;
          var rawResponse;
          rawResponse = fetch('/authenticate',
          {
          method:'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(values)
        }).then((response)=>
        {
        console.log(response.status);

        if(response.status===401 || response.status===500)
        {
            alert("Username or password didnot match");
            store.set('isloggedin',false)
         this.props.history.push('/login');
        }
        else
        {
            response.json().then((rresponse)=>
            {
                console.log(rresponse)
                if(rresponse.token!=undefined)
                {
            store.set('token','Bearer '+rresponse.token);
            store.set('isloggedin',true);
            store.set('branchid',this.props.form.getFieldValue('branchid'));
         this.props.history.push('/');
                }
                else{
                  store.set('isloggedin',false)
         this.props.history.push('/login');
                }


            })
          }
        });

        // const content = await rawResponse.json();

//         if(content.message==="Category created Successfully")
//   {
// console.log("Cateogory created Successfully");
// this.onClose();
// const getAlert = (message) => (
//   <SweetAlert show={true}
//     success 
//     title="Category created successfully" 
    
//   >
//     ${message}
//   </SweetAlert>
// );

this.props.form.setFieldsValue(
  {
    username:'',
    pasword:''
  }
)
  
            }    })();
        })
    }
    
  render() {

    if(store.get('isloggedin'))
  {
    return(<Redirect to="/"></Redirect>);
  } 
    const { getFieldDecorator,getFieldValue } = this.props.form;

    const Inputstyle = {
        width:250,height:35,alignContent:'center',textAlign:'center'
      };
    return (
      <React.Fragment>
          <div style={{display:'flex',backgroundRepeat:'repeat',backgroundImage:`url(${LoginImage})`,height:'100vh',justifyContent:'center',alignContent:'center',alignItems:'center'}}>            
          <Card hoverable title="ForEx" style={{textAlign:'center'}}>
                  
              <Form onReset={this.resetform} ref={this.createaccountform} autoComplete="off" onSubmit={this.handleSubmit} className="login-form">
          <Row>
              <Form.Item style={{padding:3}} >
              {getFieldDecorator("username", {
                    rules: [{ required: true, message: "Please input username" }]
                  })(
              <Input style={Inputstyle}   name="username" placeholder="Username"></Input>)}

              </Form.Item>
          </Row>
          <Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("password", {
                    rules: [{ required: true, message: "Please input password" }]
                  })(
<Input.Password style={Inputstyle} name="password" placeholder="Password"></Input.Password>)}
                  </Form.Item>
</Row>
<Row>
    <Form.Item style={{padding:3}} >
    {getFieldDecorator("branchid", {
                    rules: [{ required: true, message: "Please input username" }]
                  })(
    <Select placeholder="Choose Branch" style={Inputstyle}  name="branchid" autoComplete="off">
    <Select.Option style={Inputstyle} key="1">Branch1</Select.Option>
    <Select.Option  style={Inputstyle}key="2">Branch2</Select.Option>
    <Select.Option   style={Inputstyle} key="3">Branch3</Select.Option>
</Select>)}

    </Form.Item>
    <Form.Item style={{width:250,justifyContent:'center',alignContent:'center',display:'flex'}} >
        <Button htmlType="submit" type="primary">Login</Button>
    </Form.Item>
</Row>

              </Form>

              </Card>
                </div>
      </React.Fragment>
        
      
    )
  }
}


const WrappedLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedLoginForm;