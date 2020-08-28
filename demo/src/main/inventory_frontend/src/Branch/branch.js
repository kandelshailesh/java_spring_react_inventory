import React, { Component } from 'react';
import { Form,Table, Icon,Input,Select, Button, Checkbox,Col,Card,Row,Modal} from 'antd';
import store from 'store';

import EditFilled from '@ant-design/icons/EditFilled';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import CheckError from '../check_error';
const { Column, ColumnGroup } = Table;
var dataCollection=[];


class Branch extends Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
           table_loading:true,
           branchlist:[],
           branch_modal_visible:false,
           confirmLoading:false,
           add:false
      
        }
      }
    
      UNSAFE_componentWillMount()
      {
          this.list_branch();
      }

    list_branch = () =>
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
                if(rresponse.length>0)
                {
                    rresponse.forEach((result,i)=>
                    {
                        console.log(result);
                        var id = result.id;
                        var editid= "edit-"+id;
                        var deleteid= "delete-"+id;
                  console.log(id);
                    dataCollection.push(
                    {
                          key: i+1,
                          branchname:result.branchname,
                          branchaddress:result.branchaddress,
                          branchphone:result.branchphone,
                          edit:<Button id={editid} onClick={(e)=>this.branch_edit_handler(e)} style={{backgroundColor:'white',border:'0px'}}><EditFilled style={{color:'green'}}></EditFilled></Button>,
                          delete: <Button id={deleteid} onClick={(e)=>this.branch_delete(e)} style={{backgroundColor:'white',border:'0px'}}><DeleteFilled  style={{color:'red'}}></DeleteFilled></Button>,
                          id:id,
                          branchId:result.branchid
                    }
                    )
                    
                      });
                      this.setState({
                        branchlist:dataCollection,
                        loading:false
                      })     
                      dataCollection=[];
                }
                })
        
    })
} 



branch_delete = (e) =>
{
    this.handleDelete(e).then((response)=>
    {
        if(response==="yes")
        {
        this.list_branch(e);
        }

    })
}

handleDelete = (e) =>
{
    return new Promise((resolve,reject)=>
    {
        var id = e.target.id.split('-')[1];
    var branch_id = {id:id};
    Modal.confirm({title: 'Are you sure to delete this branch?',
    icon: <ExclamationCircleOutlined />,
    content: 'Warning: It cannot be undo.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
        var rawResponse;
        rawResponse = fetch(`/branch/${id}`,
        {
        method:'delete',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':store.get('token'),
        },
        body:JSON.stringify(branch_id)
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

branch_edit_handler = (e) =>
{
    e.preventDefault();
    var id = Number(e.target.id.split('-')[1]);
    
    this.props.form.setFieldsValue({
        branchname:this.state.branchlist.filter((result)=> {return id===result.id})[0].branchname,
        branchaddress:this.state.branchlist.filter((result)=> {return id===result.id})[0].branchaddress,
        branchphone:this.state.branchlist.filter((result)=> {return id===result.id})[0].branchphone,
        id:id
    })
    
    this.setState({
     add:false,
     branch_modal_visible:true
    })
}

branch_edit = (e) =>
{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>
    {
        console.log(err);
        (async () => {
            //   const data =this.state.name; 
            if(!err)
            {
              const data =values; 
    
    
              console.log(data);
              const id= this.props.form.getFieldValue('id');
              var rawResponse;
              rawResponse = fetch(`/branch/${id}`,
              {
              method:'PUT',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization':store.get('token'),
              },
              body:JSON.stringify(values)
            }).then((response)=>
            {
            CheckError(response);

            console.log(response.status);

                response.json().then((rresponse)=>
                {
                    console.log(rresponse);
                this.list_branch();
                this.setState({
                    branch_modal_visible:false
                })
                })
            });
    
           
    
            this.props.form.setFieldsValue({
                branchname:'',
                branchaddress:'',
                branchphone:'',
                id:''
            })
                }    })();
    })
}

addbranch = (e) =>
{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>
    {
        console.log(err);
        (async () => {
            //   const data =this.state.name; 
            if(this.props.form.getFieldValue('branchname') && this.props.form.getFieldValue('branchaddress') && this.props.form.getFieldValue('branchphone'))
            {
              const data =values; 
    
    
              console.log(data);
              // const id= this.state.selectedid;
              var rawResponse;
              rawResponse = fetch('/branch',
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
                this.list_branch();
                this.setState({
                    branch_modal_visible:false
                })
                })
            });
    
           
    
    this.props.form.setFieldsValue(
      {
      branchname:'',
      branchaddress:'',
      branchphone:''
      }
    )
      
                }    })();
    })
}

onCancel = (e) =>
{
    this.setState({
        branch_modal_visible:false,
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
      <Button onClick={()=>this.setState({branch_modal_visible:true})} style={{margin:10,border:0}}><PlusCircleFilled style={{color:'blue',fontSize:26}} />Branch</Button>
    
    
      <Table style={{margin:15}} size="small" loading={this.state.loading} dataSource={this.state.branchlist}>
      <Column title="S.N." dataIndex=
          "key" index="key">
              </Column>
        
              <Column title="Name" dataIndex=
          "branchname" index="branchname">
              </Column>
              <Column title="Address" dataIndex="branchaddress" index="branchaddress"></Column>
              <Column title="Phone" dataIndex=
          "branchphone" index="branchphone">
              </Column>
         
              
              
                  <Column title="Edit" dataIndex="edit" index="edit"></Column>
                  <Column title="Delete" dataIndex="delete" index="delete"></Column>
          
          </Table>

          <Modal onOk={this.state.add ? this.addbranch : this.branch_edit} okText={this.state.add ? "ADD" : "UPDATE"} onCancel={this.onCancel} visible={this.state.branch_modal_visible} confirmLoading={this.state.confirmLoading} title="Create branch" centered 
          width="200">
          <Form onReset={this.resetform} ref={this.createaccountform} autoComplete="off" onSubmit={this.handleSubmit} className="login-form">
          <Row>
              <Form.Item style={{padding:3}} >
              {getFieldDecorator("branchname", {
                    rules: [{ required: true, message: "Please input branchname" }]
                  })(
              <Input style={Inputstyle} name="branchname" placeholder="Branchname"></Input>)}
              </Form.Item>
          </Row>
          <Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("branchaddress", {
                    rules: [{ required: true, message: "Please input branchaddress" }]
                  })(
<Input style={Inputstyle} name="branchaddress" placeholder="Address"></Input>)}
                  </Form.Item>
</Row>
<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("branchphone", {
                    rules: [{ required: true, message: "Please input branch phone" }]
                  })(
<Input style={Inputstyle} name="branchphone" placeholder="Phone"></Input>)}
                  </Form.Item>
</Row>
<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("id", {
                    rules: [{ required: true, message: "Please input branch phone" }]
                  })(
<Input style={{display:"none"}}></Input>)}
                  </Form.Item>
</Row>
              </Form>

          </Modal>

         
        
      </>
    )
  }
}

const WrappedBranchForm = Form.create({ name: 'normal_login' })(Branch);
export default WrappedBranchForm;
