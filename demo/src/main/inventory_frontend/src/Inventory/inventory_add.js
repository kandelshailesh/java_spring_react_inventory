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
const {Option} = Select;
var dataCollection=[];
const branch_id = store.get('branchid');


class Inventory extends Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
           table_loading:true,
           inventorylist:[],
           confirmLoading:false,
           inventory_modal_visible:false,
           branchlist:[],
           currencylist:[]
        }
      }
    
      UNSAFE_componentWillMount()
      {
     
          this.list_inventory();
      }

    
      
      list_currency = () =>
      { 
          return new Promise((resolve,reject)=>
          {
          const list_branch_data = fetch('/currency',{
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
                          currencylist:[...this.state.currencylist,result]
                      })
                      if(Number(i+1)===rresponse.length)
                      {
                          
                      
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
    
    list_inventory = () =>
    {
    this.list_branch().then(()=>
    {
        this.list_currency().then(()=>
    {
        console.log("From list inventory");
                
        const list_inventory_data = fetch(`/inventory/${branch_id}`,{
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
                console.log(rresponse);
                if(rresponse.length>0)
                {
                    const rresponse1= rresponse.filter((result)=>{return result.branch_id==branch_id});
                    if(rresponse1.length>0)
                    {
                    rresponse1.forEach((result,i)=>
                    {
                        // console.log(result);
                        var id = result.id;
                        var editid= "edit-"+id;
                        var deleteid= "delete-"+id;
                        var currencyname=this.state.currencylist.filter((mapresult)=>{return mapresult.id === result.currency_type }).length>0 ?this.state.currencylist.filter((mapresult)=>{return mapresult.id === result.currency_type })[0].currency+'('+this.state.currencylist.filter((mapresult)=>{return mapresult.id === result.currency_type })[0].abbreviation+')':'-';
                                          console.log(id);
            
                    dataCollection.push(
                    {
                          key: i+1,
                          currencytype:currencyname,
                          amount:result.amount,
                          edit:<Button id={editid} onClick={(e)=>this.edit_handler(e)} style={{backgroundColor:'white',border:'0px'}}><EditFilled style={{color:'green'}}></EditFilled></Button>,
                          delete: <Button id={deleteid} onClick={(e)=>this.Inventory_delete(e)} style={{backgroundColor:'white',border:'0px'}}><DeleteFilled  style={{color:'red'}}></DeleteFilled></Button>,
                          id:id,
                          branchId:result.branch_id
                    }
                    )
                    
                      });

                      this.setState({
                        inventorylist:dataCollection,
                        loading:false
                      })     
                      dataCollection=[];
                        console.log(this.state.inventorylist);
                }
            }
                })
        
    })

    })
})

        

} 



Inventory_delete = (e) =>
{
    this.handleDelete(e).then((response)=>
    {
        if(response==="yes")
        {
        this.list_inventory(e);
        }

    })
}

handleDelete = (e) =>
{
    return new Promise((resolve,reject)=>
    {
        var id = e.target.id.split('-')[1];
    var inventory_id = {id:id};
    Modal.confirm({title: 'Are you sure to delete this inventory?',
    icon: <ExclamationCircleOutlined />,
    content: 'Warning: It cannot be undo.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
        var rawResponse;
        rawResponse = fetch(`/inventory/${id}`,
        {
        method:'delete',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':store.get('token'),
        },
        body:JSON.stringify(inventory_id)
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
addinventory = (e) =>
{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>
    {
        console.log(err);
        (async () => {
            //   const data =this.state.name; 
            if(this.props.form.getFieldValue('currency_type') && this.props.form.getFieldValue('amount'))
            {
              const data =values; 
    
    
              console.log(data);
              // const id= this.state.selectedid;
              var rawResponse;
              rawResponse = fetch(`/inventory`,
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
                this.list_inventory();
                
                })
            });
    
           
    
    this.props.form.setFieldsValue(
      {
       currencytype:'',
       amount:''
      }
    )
      
                }    })();
    })
    
}



  render() {
    const { getFieldDecorator,getFieldValue } = this.props.form;

    const Inputstyle = {
        width:250,height:35,alignContent:'center',textAlign:'center',textAlignLast:'center'
      };
      function onChange(value) {
        console.log(`selected ${value}`);
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }
      
    return (
      <>

      <Form  onSubmit={this.addinventory} style={{display:'flex',margin:20,justifyContent:'center'}} layout="inline">


          <Form.Item>
              {getFieldDecorator("currency_type",
              {
                  rules:[{required:true}]
              })(
                  <Select showSearch style={{width:300}} placeholder="Select currency type" 
                optionFilterProp="children" onSearch={onSearch}
                 onChange={onSearch}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                      {this.state.currencylist.map((result)=>{
                   return <Select.Option value={result.id} key={1}>{result.currency}({result.abbreviation})</Select.Option>

                      })}
                  </Select>
              )}
          </Form.Item>
          <Form.Item>
              {getFieldDecorator("amount",
              {
                  rules:[{required:true}]
              })(
                
                      <Input placeholder="Amount" />
                
              )}
          </Form.Item>
          <Form.Item>
              {getFieldDecorator("branch_id",
              {
                  rules:[{required:true}],
                  initialValue:branch_id
              })(
                
                      <Input style={{display:"none"}} placeholder="Amount" />
                
              )}
          </Form.Item>
          <Form.Item>
        <Button htmlType="submit" type="primary">ADD</Button>
    </Form.Item>
      </Form>
      <Table style={{margin:15}} size="small" loading={this.state.loading} dataSource={this.state.inventorylist}>
      <Column title="S.N." dataIndex=
          "key" index="key">
              </Column>
        
              <Column title="Currency(Abbreviation)" dataIndex=
          "currencytype" index="currencytype">
              </Column>
              <Column title="Amount" dataIndex="amount" index="amount"></Column>
           
         
              
              
                  <Column title="Edit" dataIndex="edit" index="edit"></Column>
                  <Column title="Delete" dataIndex="delete" index="delete"></Column>
        </Table>
        
      </>
    )
  }
}

const WrappedInventoryForm = Form.create({ name: 'normal_login' })(Inventory);
export default WrappedInventoryForm;
