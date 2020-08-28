import React, { Component } from 'react';
import { Form,Table, Icon,Input,InputNumber,Select, Button, Checkbox,Col,Card,Row,Modal} from 'antd';
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


class Rate extends Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
           table_loading:true,
           ratelist:[],
           confirmLoading:false,
           rate_modal_visible:false,
           branchlist:[],
           currencylist:[],
           inventorylist:[]
        }
      }
    
      UNSAFE_componentWillMount()
      {
     
          this.list_rate();
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

      list_inventory = () =>
      { 
          return new Promise((resolve,reject)=>
          {
          const list_branch_data = fetch(`/inventory/${branch_id}`,{
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
                          inventorylist:[...this.state.inventorylist,result]
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
    
    list_rate = () =>
    {
    this.list_branch().then(()=>
    {
        this.list_currency().then(()=>
    {
        this.list_inventory().then(()=>
        {
            console.log("From list rate");
                
        const list_rate_data = fetch(`/rate/${branch_id}`,{
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
                    const rresponse1= rresponse.filter((result)=>{return result.branch_id===branch_id});
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
                          delete: <Button id={deleteid} onClick={(e)=>this.Rate_delete(e)} style={{backgroundColor:'white',border:'0px'}}><DeleteFilled  style={{color:'red'}}></DeleteFilled></Button>,
                          id:id,
                          branchId:result.branch_id
                    }
                    )
                    
                      });

                      this.setState({
                        ratelist:dataCollection,
                        loading:false
                      })     
                      dataCollection=[];
                        console.log(this.state.ratelist);
                }
            }
                })
        
    })


        })
        
    })
})

        

} 



Rate_delete = (e) =>
{
    this.handleDelete(e).then((response)=>
    {
        if(response==="yes")
        {
        this.list_rate(e);
        }

    })
}

handleDelete = (e) =>
{
    return new Promise((resolve,reject)=>
    {
        var id = e.target.id.split('-')[1];
    var rate_id = {id:id};
    Modal.confirm({title: 'Are you sure to delete this rate?',
    icon: <ExclamationCircleOutlined />,
    content: 'Warning: It cannot be undo.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
        var rawResponse;
        rawResponse = fetch(`/rate/${id}`,
        {
        method:'delete',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':store.get('token'),
        },
        body:JSON.stringify(rate_id)
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
addrate = (e) =>
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
              rawResponse = fetch(`/rate`,
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
                this.list_rate();
                
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

      <Form  onSubmit={this.addrate} style={{margin:20}} layout="inline">
          {this.state.inventorylist.map((result)=>
          {
              return <><Form.Item>{getFieldDecorator(`${result.id}`,{initialValue:result.currency_type})(<Select style={{width:70}}>
                {this.state.currencylist.map((result1)=>
                {
                    return <Select.Option value={result1.id}>
                        {result1.abbreviation}
                    </Select.Option>
                })}
              </Select>)}</Form.Item><Form.Item>{getFieldDecorator(`amount-${result.id}`)(<InputNumber></InputNumber>)}</Form.Item></>
          })}
</Form>
      </>
    )
  }
}

const WrappedRateForm = Form.create({ name: 'normal_login' })(Rate);
export default WrappedRateForm;
