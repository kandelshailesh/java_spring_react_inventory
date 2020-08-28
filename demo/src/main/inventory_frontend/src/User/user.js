import React, { Component } from 'react';
import { Form,Table, Icon,Input,Select, Button, Checkbox,Col,Card,Row,Modal} from 'antd';
import store from 'store';

import EditFilled from '@ant-design/icons/EditFilled';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import CheckError from '../check_error';
// import check_error from '../check_error';
const { Column, ColumnGroup } = Table;
var dataCollection=[];


class User extends Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
           table_loading:true,
           userlist:[],
           staff_modal_visible:false,
           confirmLoading:false,
           admin_modal_visible:false,
           branchlist:[],
           usertype:''
        }
      }
    
      UNSAFE_componentWillMount()
      {
     
          this.list_user();
      }

      
    list_branch = () =>
    { 
        return new Promise((resolve,reject)=>
        {
        const list_branch_data = fetch('/branch',{
            method:"get",
            headers:
            {
                'Authorization':store.get('token'),
                'Accept':'application/json'
            }
        }).then((response)=>
        {

            response.json().then((rresponse)=>
            {
                console.log(rresponse);
                if(rresponse.length>0)
                {   
                    rresponse.forEach((result,i)=>
                    {
                        console.log("I is ",i);
                       
                    this.setState({
                        branchlist:[...this.state.branchlist,result]
                    })
                    if(Number(i+1)===rresponse.length)
                    {
                        console.log("Branch list");
                        console.log(this.state.branchlist);
                        resolve('ok');
                    }
                    
    })
}
else
{
    resolve('ok');
}
            })
        }) 


    })
    }
    
    list_user = () =>
    {
    this.list_branch().then(()=>
    {
        console.log("From list user");
                
        const list_user_data = fetch('/user',{
            method:"get",
            headers:
            {
                'Authorization':store.get('token'),
                'Accept':'application/json'
            }
        }).then((response)=>
        {   
            CheckError(response);
            response.json().then((rresponse)=>
            {
                if(rresponse.length>0)
                {
                    rresponse.forEach((result,i)=>
                    {
                        // console.log(result);
                        var id = result.id;
                        var editid= "edit-"+id;
                        var deleteid= "delete-"+id;
                        var branchname1= result.usertype==="staff"? this.state.branchlist.filter((mapresult) =>{return result.branch_id===mapresult.id})[0].branchname:'-';
                                          console.log(id);
                  console.log("Branchname1");
                  console.log(branchname1);
                    dataCollection.push(
                    {
                          key: i+1,
                          email:result.email,
                          name:result.name,
                          usertype:result.usertype,
                          address:result.address,
                          branchname:branchname1,
                          phone:result.phone,
                          edit:<Button id={editid} onClick={(e)=>this.edit_handler(e)} style={{backgroundColor:'white',border:'0px'}}><EditFilled style={{color:'green'}}></EditFilled></Button>,
                          delete: <Button id={deleteid} onClick={(e)=>this.User_delete(e)} style={{backgroundColor:'white',border:'0px'}}><DeleteFilled  style={{color:'red'}}></DeleteFilled></Button>,
                          id:id,
                          branchId:result.branch_id
                    }
                    )
                    
                      });

                      this.setState({
                        userlist:dataCollection,
                        loading:false
                      })     
                      dataCollection=[];
                        console.log(this.state.userlist);
                }
                })
        
    })

    })

        

} 



User_delete = (e) =>
{
    this.handleDelete(e).then((response)=>
    {
        if(response==="yes")
        {
        this.list_user(e);
        }

    })
}

handleDelete = (e) =>
{
    return new Promise((resolve,reject)=>
    {
        var id = e.target.id.split('-')[1];
    var user_id = {id:id};
    Modal.confirm({title: 'Are you sure to delete this user?',
    icon: <ExclamationCircleOutlined />,
    content: 'Warning: It cannot be undo.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
        var rawResponse;
        rawResponse = fetch(`/user/${id}`,
        {
        method:'delete',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':store.get('token'),
        },
        body:JSON.stringify(user_id)
      }).then((response)=>
      {
      console.log(response.status);

          response.json().then((rresponse)=>
          {
          console.log(rresponse);
          resolve(rresponse.success);
          })
      })

    },
    onCancel() {
      console.log('Cancel');
      resolve("no")
    },})

    })
    
}
addadmin = (e) =>
{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>
    {
        console.log(err);
        (async () => {
            //   const data =this.state.name; 
            if(this.props.form.getFieldValue('email') && this.props.form.getFieldValue('password') && this.props.form.getFieldValue('name') && this.props.form.getFieldValue('address') && this.props.form.getFieldValue('phone'))
            {
              const data =values; 
    
    
              console.log(data);
              // const id= this.state.selectedid;
              var rawResponse;
              rawResponse = fetch('/user',
              {
              method:'POST',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization':store.get('token'),
              },
              body:JSON.stringify(values)
            }).then((response)=>
            {
            console.log(response.status);

                response.json().then((rresponse)=>
                {
                    console.log(rresponse);
                this.list_user();
                this.setState({
                    admin_modal_visible:false
                })
                })
            });
    
           
    
    this.props.form.setFieldsValue(
      {
       email:'',
        pasword:'',
        name:'',
        branch_id:'',
        phone:'',
        address:''
      }
    )
      
                }    })();
    })
    
}
adduser = (e) =>
{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>
    {
        console.log(err);
        (async () => {
            //   const data =this.state.name; 
            if(this.props.form.getFieldValue('email') && this.props.form.getFieldValue('password') && this.props.form.getFieldValue('branch_id') && this.props.form.getFieldValue('name') && this.props.form.getFieldValue('address') && this.props.form.getFieldValue('phone'))
            {
              const data =values; 
    
    
              console.log(data);
              // const id= this.state.selectedid;
              var rawResponse;
              rawResponse = fetch('/user',
              {
              method:'POST',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization':store.get('token'),
              },
              body:JSON.stringify(values)
            }).then((response)=>
            {
            console.log(response.status);

                response.json().then((rresponse)=>
                {
                    console.log(rresponse);
                this.list_user();
                this.setState({
                    staff_modal_visible:false
                })
                })
            });
    
           
    
    this.props.form.setFieldsValue(
      {
       email:'',
        pasword:'',
        name:'',
        branch_id:'',
        phone:'',
        address:''
      }
    )
      
                }    })();
    })
}

onCancel = (e) =>
{
    this.setState({
        staff_modal_visible:false,
        admin_modal_visible:false
    })
}
  render() {
    const { getFieldDecorator,getFieldValue } = this.props.form;

    const Inputstyle = {
        width:250,height:35,alignContent:'center',textAlign:'center',textAlignLast:'center'
      };
    return (
      <>
      <Button onClick={()=>{this.setState({staff_modal_visible:true,usertype:'staff'});
    this.props.form.setFieldsValue({
        branch_id: 'Choose branch'
    })}} style={{margin:10,border:0}}><PlusCircleFilled style={{color:'blue',fontSize:26}} />Staff</Button>
    
      <Button onClick={()=>{this.setState({admin_modal_visible:true,usertype:'admin'});
    this.props.form.setFieldsValue({
        branch_id: '0'
    })}} style={{margin:10,border:0}}><PlusCircleFilled style={{color:'blue',fontSize:26}} />Admin</Button>
    
      <Table style={{margin:15}} size="small" loading={this.state.loading} dataSource={this.state.userlist}>
      <Column title="S.N." dataIndex=
          "key" index="key">
              </Column>
          <Column title="Username" dataIndex=
          "email" index="email">
              </Column>
              <Column title="Name" dataIndex=
          "name" index="name">
              </Column>
              <Column title="Usertype" dataIndex="usertype" index="usertype"></Column>
              <Column title="Branchname" dataIndex=
          "branchname" index="branchname">
              </Column>
         
              <Column title="Address" dataIndex=
          "address" index="address">
              </Column>
              <Column title="Phone" dataIndex=
          "phone" index="phone">
              </Column>
              
                  {/* <Column title="Edit" dataIndex="edit" index="edit"></Column> */}
                  <Column title="Delete" dataIndex="delete" index="delete"></Column>
          
          </Table>

          <Modal onOk={this.adduser} onCancel={this.onCancel} visible={this.state.staff_modal_visible} confirmLoading={this.state.confirmLoading} title="Create Staff" centered 
          width="200">
          <Form onReset={this.resetform} ref={this.createaccountform} autoComplete="off" onSubmit={this.handleSubmit} className="login-form">
          <Row>
              <Form.Item style={{padding:3}} >
              {getFieldDecorator("email", {
                    rules: [{ required: true, message: "Please input username" }]
                  })(
              <Input style={Inputstyle} name="email" placeholder="Username"></Input>)}
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
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("name", {
                    rules: [{ required: true, message: "Please input name" }]
                  })(
<Input style={Inputstyle} name="name" placeholder="Fullname"></Input>)}
                  </Form.Item>
</Row>
<Row>
    <Form.Item style={{padding:3}} >
    {getFieldDecorator("branch_id", {
                    rules: [{ required: true, message: "Please select branch" }]
                  })(
    <Select placeholder="Choose Branch" style={Inputstyle}  name="branch_id" >
        {this.state.branchlist.map((result,i)=>
        {
          return  <Select.Option style={Inputstyle} value={result.id} key={i}>{result.branchname}</Select.Option>
        })}
   
</Select>)}

    </Form.Item>

</Row>
<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("address", {
                    rules: [{ required: true, message: "Please input address" }]
                  })(
<Input style={Inputstyle} name="address" placeholder="Address"></Input>)}
                  </Form.Item>
</Row>
<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("phone", {
                    rules: [{ required: true, message: "Please input phone" }]
                  })(
<Input style={Inputstyle} name="phone" placeholder="Phone"></Input>)}
                  </Form.Item>
</Row>

<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("usertype",{initialValue:this.state.usertype})(
<Input   style={{display:'none'}} name="usertype" placeholder="Usertype"></Input>)}
                  </Form.Item>
</Row>

              </Form>

          </Modal>

          <Modal onOk={this.adduser} onCancel={this.onCancel} visible={this.state.admin_modal_visible} confirmLoading={this.state.confirmLoading} title="Create Admin" centered 
          width="200">
          <Form onReset={this.resetform} ref={this.createaccountforms} autoComplete="off" onSubmit={this.handleSubmit} className="login-forms">
          <Row>
              <Form.Item style={{padding:3}} >
              {getFieldDecorator("email", {
                    rules: [{ required: true, message: "Please input username" }]
                  })(
              <Input style={Inputstyle} name="email" placeholder="Username"></Input>)}
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
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("name", {
                    rules: [{ required: true, message: "Please input name" }]
                  })(
<Input style={Inputstyle} name="name" placeholder="Fullname"></Input>)}
                  </Form.Item>
</Row>

<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("address", {
                    rules: [{ required: true, message: "Please input address" }]
                  })(
<Input style={Inputstyle} name="address" placeholder="Address"></Input>)}
                  </Form.Item>
</Row>
<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("phone", {
                    rules: [{ required: true, message: "Please input phone" }]
                  })(
<Input style={Inputstyle} name="phone" placeholder="Phone"></Input>)}
                  </Form.Item>
</Row>

<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("usertype",{initialValue:this.state.usertype})(
<Input   style={{display:'none'}} name="usertype" placeholder="Usertype"></Input>)}
                  </Form.Item>
</Row>
<Row>
    <Form.Item style={{padding:3}} >
    {getFieldDecorator("branch_id", {
                    initialValue:"0",
                    rules: [{ required: true, message: "Please select branch" }]
                  })(
    <Select placeholder="Choose Branch" style={{display:"none"}} defaultActiveFirstOption={true} name="branch_id" >
     <Select.Option value="0">Admin</Select.Option>
   
</Select>)}

    </Form.Item>

</Row>



              </Form>

          </Modal>
        
        
      </>
    )
  }
}

const WrappedUserForm = Form.create({ name: 'normal_login' })(User);
export default WrappedUserForm;
