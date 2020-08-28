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


class Currency extends Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
           table_loading:true,
           currencylist:[],
           currency_modal_visible:false,
           confirmLoading:false,
           selectedid:'',
           add:false
        }
      }
    
      UNSAFE_componentWillMount()
      {
          this.list_currency();
      }

    list_currency = () =>
    {
        const list_currency_data = fetch('/currency',{
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
                        console.log(result);
                        var id = result.id;
                        var editid= "edit-"+id;
                        var deleteid= "delete-"+id;
                  console.log(id);
                    dataCollection.push(
                    {
                          key: i+1,
                          currency:result.currency,
                          abbreviation:result.abbreviation,
                          edit:<Button id={editid} onClick={(e)=>this.currency_edit_handler(e)} style={{backgroundColor:'white',border:'0px'}}><EditFilled style={{color:'green'}}></EditFilled></Button>,
                          delete: <Button id={deleteid} onClick={(e)=>this.currency_delete(e)} style={{backgroundColor:'white',border:'0px'}}><DeleteFilled  style={{color:'red'}}></DeleteFilled></Button>,
                          id:id,
                         
                    }
                    )
                    
                      });
                      this.setState({
                        currencylist:dataCollection,
                        loading:false
                      })     
                      dataCollection=[];
                }
                })
        
    })
} 



currency_delete = (e) =>
{
    this.handleDelete(e).then((response)=>
    {
        if(response==="yes")
        {
        this.list_currency(e);
        }

    })
}

handleDelete = (e) =>
{
    return new Promise((resolve,reject)=>
    {
        var id = e.target.id.split('-')[1];
    var currency_id = {id:id};
    Modal.confirm({title: 'Are you sure to delete this currency?',
    icon: <ExclamationCircleOutlined />,
    content: 'Warning: It cannot be undo.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
        var rawResponse;
        rawResponse = fetch(`/currency/${id}`,
        {
        method:'delete',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':store.get('token'),
        },
        body:JSON.stringify(currency_id)
      }).then((response)=>
      {
      console.log(response.status);
      CheckError(response);


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

addcurrency = (e) =>
{
    e.preventDefault();
    this.props.form.validateFields(['currency','abbreviation'],(err,values)=>
    {
        console.log(err);
        (async () => {
            //   const data =this.state.name; 
            if(!err)
            {
              const data =values; 
    
    
              console.log(data);
              // const id= this.state.selectedid;
              var rawResponse;
              rawResponse = fetch('/currency',
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
            CheckError(response);

            console.log(response.status);

                response.json().then((rresponse)=>
                {
                    console.log(rresponse);
                this.list_currency();
                this.setState({
                    currency_modal_visible:false
                })
                })
            });
    
           
    
    this.props.form.setFieldsValue(
      {
      currency:'',
      abbreviation:''
      }
    )
      
                }    })();
    })
}

currency_edit_handler = (e) =>
{
    e.preventDefault();
    var id = Number(e.target.id.split('-')[1]);
    console.log(this.state.currencylist.filter((result)=> {return id===result.id})[0].abbreviation);
  
    this.props.form.setFieldsValue({
        abbreviation:this.state.currencylist.filter((result)=> {return id===result.id})[0].abbreviation,
        currency:this.state.currencylist.filter((result)=> {return id===result.id})[0].currency,
        id:id
    })
    
    this.setState({
     add:false,
     currency_modal_visible:true
    })
}

currency_edit = (e) =>
{
    e.preventDefault();
    this.props.form.validateFields(['currency','abbreviation','id'],(err,values)=>
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
              rawResponse = fetch(`/currency/${id}`,
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
            CheckError(response);

            console.log(response.status);

                response.json().then((rresponse)=>
                {
                    console.log(rresponse);
                this.list_currency();
                this.setState({
                    currency_modal_visible:false
                })
                })
            });
    
           
    
    this.props.form.setFieldsValue(
      {
      currency:'',
      abbreviation:'',
      id:''
      }
    )
      
                }    })();
    })
}


onCancel = (e) =>
{
    this.setState({
        currency_modal_visible:false,
        
    })
}
  render() {
    const { getFieldDecorator,getFieldValue } = this.props.form;

    const Inputstyle = {
        width:250,height:35,alignContent:'center',textAlign:'center',textAlignLast:'center'
      };
    return (
      <>
      <Button onClick={()=>this.setState({currency_modal_visible:true,add:true})} style={{margin:10,border:0}}><PlusCircleFilled style={{color:'blue',fontSize:26}} />Currency</Button>
    
    
      <Table style={{margin:15}} size="small" loading={this.state.loading} dataSource={this.state.currencylist}>
      <Column title="S.N." dataIndex=
          "key" index="key">
              </Column>
        
              <Column title="Currency" dataIndex=
          "currency" index="currency">
              </Column>
              <Column title="Abbreviation" dataIndex="abbreviation" index="abbreviation"></Column>
              
              
              
                  <Column title="Edit" dataIndex="edit" index="edit"></Column>
                  <Column title="Delete" dataIndex="delete" index="delete"></Column>
          
          </Table>

          <Modal onOk={this.state.add ? this.addcurrency : this.currency_edit} okText={this.state.add ? "ADD" : "UPDATE"} onCancel={this.onCancel} visible={this.state.currency_modal_visible} confirmLoading={this.state.confirmLoading} title="Create currency" centered 
          width="200">
          <Form onReset={this.resetform} ref={this.createaccountform} autoComplete="off" onSubmit={this.handleSubmit} className="login-form">
          <Row>
              <Form.Item style={{padding:3}} >
              {getFieldDecorator("currency", {
                    rules: [{ required: true, message: "Please input currencyname" }]
                  })(
              <Input style={Inputstyle} placeholder="Currency"></Input>)}
              </Form.Item>
          </Row>
          <Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("abbreviation", {
                    rules: [{ required: true, message: "Please input abbreviation" }]
                  })(
<Input style={Inputstyle} placeholder="Abbreviation"></Input>)}
                  </Form.Item>
</Row>
<Row>
              <Form.Item style={{padding:3}}>
              {getFieldDecorator("id", {
                    rules: [{ required: true, message: "Please input abbreviation" }]
                  })(
<Input style={{display:"none"}} placeholder="id"></Input>)}
                  </Form.Item>
</Row>
              </Form>

          </Modal>

         
        
      </>
    )
  }
}

const WrappedCurrencyForm = Form.create({ name: 'normal_login' })(Currency);
export default WrappedCurrencyForm;
