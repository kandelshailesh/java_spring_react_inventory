import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Form,Table, Icon,Input,Select, Button, Checkbox,Col,Card,Row } from 'antd';
import DeleteIcon from "@material-ui/icons/DeleteSweepSharp";
import EditIcon from "@material-ui/icons/Edit";
import queryString from 'query-string';
import SweetAlert from 'sweetalert2-react';
import { MDBContainer, MDBDataTable, MDBTableBody, MDBTableHead } from 'mdbreact';
const provinceData = ['Select Account Group', 'Jiangsu'];


const columns1 = [
  {
    label: 'Accountname',
    field: 'accountname',
  },
  {
    label: 'Account Groups',
 
    field: 'accountgroups',
  },
  {
    label: 'Contact Person',
   
    field: 'contactperson',
  },
  {
      label: 'PAN/VAT No.',
     
      field: 'panvatno'
    },
    {
      label: 'Telephone No.',
     
      field: 'telephoneno'
    },
    {
      label: 'Mobile No.',
    
      field: 'mobileno'
    },
    {
      label: 'Options',
  
      field: 'delete',
    }, {
      label: '',
      
      field: 'edit',
    }
    
];

const columns2 = [
  {
    Header: 'Accountname',
  
    accessor: 'accountname',
  },
  {
    Header: 'Account Groups',
 
    accessor: 'accountgroups',
  },
  {
    Header: 'Contact Person',
   
    accessor: 'contactperson',
  },
  {
      Header: 'PAN/VAT No.',
     
      accessor: 'panvatno'
    },
    {
      Header: 'Telephone No.',
     
      accessor: 'telephoneno'
    },
    {
      Header: 'Mobile No.',
    
      accessor: 'mobileno'
    },
    {
      Header: 'Options',
  
      accessor: 'delete',
    }, {
      Header: '',
      
      accessor: 'edit',
    }
    
];

const columns = [
  {
    title: 'Accountname',
    dataIndex: 'accountname',
    key: 'accountname',
  },
  {
    title: 'Account Groups',
    dataIndex: 'accountgroups',
    key: 'accountgroups',
  },
  {
    title: 'Contact Person',
    dataIndex: 'contactperson',
    key: 'contactperson',
  },
  {
      title: 'PAN/VAT No.',
      dataIndex: 'panvatno',
      key: 'panvatno'
    },
    {
      title: 'Telephone No.',
      dataIndex: 'telephoneno',
      key: 'telephoneno'
    },
    {
      title: 'Mobile No.',
      dataIndex: 'mobileno',
      key: 'mobileno'
    },
    {
      title: 'Options',
      dataIndex: 'delete',
      key: 'delete',
    }, {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
    }
    
];
// var dataCollection=[{columns:columns1,rows:[]}];
var dataCollection=[];

class NormalLoginForm extends React.Component {

    constructor(props)
    {
        super(props);
this.state={
            'show':true,
            'alert': null,
            'accountlist':[],
            'status':'false',
            'formdisabled':true,
            'opacity':0.1,
            'createaccountform':
            {
            'accountname':'',
            'accountgroup':'Select Account Group',
            'panvatno':'',
            'contactperson':'',
            'address':'',
            'country':'Nepal',
            'telephoneno':'',
            'mobileno':'',
            'email':''
            },
            'inserttype':'ADD',
            'selectedid':'0'
        };
       
        this.handleAddbutton = this.handleAddbutton.bind(this);
        this.telephoneno = React.createRef();
        this.accountgrouptype= React.createRef();
        this.createaccountform= React.createRef();
        this.accountnames= React.createRef();

    }


  changehandler = (e) =>
  {
    this.setState({
      createaccountform:{
        ...this.state.createaccountform,
        [e.target.name]:e.target.value
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    this.props.form.validateFields((err, values) => {
      if (!err) {
        (async () => {
          const data =this.state.createaccountform;
          
          // const id= this.state.selectedid;
          var rawResponse;
       
          if(this.state.inserttype==='ADD')
          {
        rawResponse = await  fetch('/createaccount',
        {
        method:'POST',
        mode:"no-cors",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:queryString.stringify(data)
      });
    }
    else
    {
      data.id=this.state.selectedid;
      rawResponse = await  fetch(`/modifyaccount`,
      {
      method:'POST',
      mode:"no-cors",
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/x-www-form-urlencoded'
      },
      body:queryString.stringify(data)
    });
    }
      const content = await rawResponse.json();
      console.log(content);
      if(content.message==="OK")
      {

        if(this.state.inserttype==="UPDATE")
        {
        const getAlert = (message) => (
          <SweetAlert show={true}
            success 
            title="UPDATE SUCCESSFULLY" 
            onConfirm={ this.reload}
          >
            ${message}
          </SweetAlert>
        );
        
       this.setState({
        alert:getAlert("")
       })
       this.handleCRUD();
      }
      else
      {
        const getAlert = (message) => (
          <SweetAlert show={true}
            success 
            title="ADDED SUCCESSFULLY" 
            onConfirm={this.reload}
          >
            ${message}
          </SweetAlert>
        );
        
       this.setState({
        alert:getAlert("")
       })
      


      }
      }
      console.log(this.state);
      
   
      })();
  
} 
// this.resetform(e);

    });
  };


  resetform = (e) =>
  {

this.setState({
  createaccountform:
  {
    'accountname':'',
    'accountgroup':'',
    'panvatno':'',
    'contactperson':'',
    'address':'',
    'country':'Nepal',
    'telephoneno':'',
    'mobileno':'',
    'email':'',
  }
});
  };

  handleAddbutton = e =>
  {
      e.preventDefault();
        this.setState({
            'formdisabled':false,
            'opacity':1,
            'inserttype':"ADD",
            'createaccountform':
            {
            'accountname':'',
            'accountgroup':'Select Account Group',
            'panvatno':'',
            'contactperson':'',
            'address':'',
            'country':'Nepal',
            'telephoneno':'',
            'mobileno':'',
            'email':''
            },
        });
  };
  
 handleOnChange= (value,e) =>
 {

  alert(value);   

    this.setState({
      createaccountform:{
        ...this.state.createaccountform,
        accountgroup:value
      }
    
   });

   
 };


  handleCRUD = (e) =>
  {

    (async () => {
      const rawResponse = await  fetch('/accountlist',
      {
      method:'get',
      mode:"no-cors",
      headers:{
          'Accept':'application/json',         
      }
    });
   
    const content = await rawResponse.json();
    console.log(content);
    if(content.message==="OK")
    {
      var results=content.accountlist;
     
    
    results.forEach((result,i)=>
    {
      var id = result.id;

  dataCollection.push(
  {
    delete:<Button style={{width:"20px"}} onClick={ this.deleteaccount} id={id}  className="border-0 btn-sm bg-danger text-white"><DeleteIcon style={{width:"20px",marginLeft:"-10px"}} /></Button>,
    edit:<Button style={{width:"20px"}} onClick={this.editaccount} id={id}  className="border-0 btn-sm bg-success text-white"><EditIcon style={{width:"20px",marginLeft:"-10px"}} /></Button>,
    accountname: result.accountname,
    accountgroups: result.accountgroup,
    contactperson: result.contactperson,
    panvatno:result.panvatno,
    telephoneno:result.telephoneno,
    mobileno:result.mobileno,
    email:result.email
  }
  )
  
    });
    this.setState({
      accountlist:dataCollection
    })
    console.log(this.state);
  
     
    }
    
  
    })();
  
  }
  handlechange = (e) =>
  { 
    // e.preventDefault();
    
    this.setState({
        [e.target.name]:e.target.value
      });
  }

  deleteaccount = (e) =>
  {
    console.log(e.target.id);
    (async () => {
      const rawResponse = await  fetch('/deleteaccount',
          {
          method:'POST',
          mode:"no-cors",
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/x-www-form-urlencoded'
          },
          body:queryString.stringify({id:e.target.id})
        });
        const content = await rawResponse.json();
        
        if(content.message==="OK")
        {
          const getAlert = (message) => (
            <SweetAlert show={true}
              success 
              title="DELETED SUCCESSFULLY" 
              onConfirm={this.reload}
            >
              ${message}
            </SweetAlert>
          );
          
         this.setState({
          alert:getAlert(""),
          formdisabled:true,
          selectedid:"0"
         })
         this.resetform();
         this.handleCRUD();
     
  }
})()
  }

  reload = () =>
  {
    window.location.reload();
  }
  
  editaccount = (e) =>
  {
    this.setState({
      formdisabled:false
    })
    console.log(e.target.id);
    var id= e.target.id;
   (async () => {
    const rawResponse = await  fetch(`/accountlist/${e.target.id}`,
        {
        method:'POST',
        mode:"no-cors",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        }
      });
      const content = await rawResponse.json();
      
      if(content.message==="OK")
      {
      var result= content.accountlist;
     
      this.setState({
      'formdisabled':false,
      'opacity':1,
      'inserttype':'UPDATE',
      'selectedid':id,
      'createaccountform':
      {
        'accountname':result.accountname,
      'accountgroup':result.accountgroup,
      'panvatno':result.panvatno,
    'contactperson':result.contactperson,
    'address':result.address,
    'country':result.country,
    'telephoneno':result.telephoneno,
    'mobileno':result.mobileno,
    'email':result.email,
      }
  });
}
else
{

}
   
   })();

  }


  UNSAFE_componentWillMount()
  {
    this.handleCRUD();
  }
  render() {
  
   
    const { getFieldDecorator,getFieldValue } = this.props.form;
    const {Option} = Select;
   
    return (
        <div className="row">
<div className="col-md-9 text-center">
<Card className="mt-2 ml-3 mr-n3"  style={{height:"50px",border:"2px solid #EEE", boxShadow:"-2px -2px  #EEE,2px 2px  #EEE"}}>

    <Button className="btn mt-n4 btn-sm">Export CSV</Button>
    <Button className="btn mt-n4 btn-sm ml-3">Export PDF</Button>
    <Button id="addbutton" onClick={this.handleAddbutton} className="btn mt-n3 btn-sm border-0 float-right"><i className="fa text-success fa-plus-circle fa-2x"></i></Button>
    
    </Card>
{/*   
    <MDBDataTable className="ml-2 mr-n3 p-0" style={{fontSize:"12px",padding:"2px",border:"2px solid #EEE",  textAlign:"center !important",color:"white !important",boxShadow:"-2px -2px  #EEE,2px 2px  #EEE",}}
  paging={true}
  bordered hover
  data={this.state.accountlist[0]}
/> */}

<ReactTable className="ml-3 w-100 h-50 " columns={columns2} data={this.state.accountlist} ></ReactTable>
{/* <Table className="mt-0 ml-3 mr-n3" style={{border:"2px solid #EEE", textAlign:"center !important",color:"white !important",boxShadow:"-2px -2px  #EEE,2px 2px  #EEE",}} dataSource={this.state.accountlist} columns={columns} />; */}
</div>
        <div className="col-md-3">
      
            <Card style={{opacity:`${this.state.opacity}`}}>
      <Form onReset={this.resetform} ref={this.createaccountform} autoComplete="off" onSubmit={this.handleSubmit} className="login-form">
            <p className="m-0 mt-0" style={{fontSize:"12px",lineHeight:"5px",color:"red",textAlign:"center"}}>General Info <hr className="mt-1"/></p>
<fieldset disabled={this.state.formdisabled}>
          <Row  className="m-0">
        
        <Form.Item>
          {/* {getFieldDecorator('accountname', {
            initialValue:this.state.accountname,
            rules: [{ required: true, message: 'Please input accountname!' }],  
          })( */}
          <Input required value={this.state.createaccountform.accountname} onChange={this.changehandler} name='accountname' 
             autoComplete="off" prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Account name"
            />
          {/* )} */}
        </Form.Item>
     
      
</Row>
        
      <Row className=" m-0">
        <Form.Item>
          {/* {getFieldDecorator('accountgroup', {
            
            rules: [{ required: true, message: 'Please select account group!' }],
          })( */}
            <Select  onSelect={(value, event) => this.handleOnChange(value, event)}  name="accountgroup" autoComplete="off" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Account groups" value={this.state.createaccountform.accountgroup}>
                {provinceData.map(province => (
            <Option key={province}>{province}</Option>
          ))}
                </Select>
          {/* )} */}
        </Form.Item>
    </Row>
    <Row className=" m-0">

<Form.Item>

  <Input name="contactperson" value={this.state.createaccountform.contactperson} onChange={this.changehandler}
   autoComplete="off" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
    placeholder="Contact Person"
  />
</Form.Item>

</Row>
<Row className=" m-0">
      
        <Form.Item>
        
            <Input name="panvatno" value={this.state.createaccountform.panvatno} onChange={this.changehandler}
             autoComplete="off" prefix={<Icon  style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="PAN/VAT No."
            />
        </Form.Item>
        </Row>
        <Row className=" m-0">
     

        <p className="m-0 mt-n2" style={{fontSize:"12px",color:"red",lineHeight:"5px",textAlign:"center"}}>Address Info <hr className="mt-1"/></p>
</Row>
        <Row className=" m-0">

<Form.Item>

  <Select name="country"
   autoComplete="off" value="nepal" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
    placeholder="Select Country"
  >
      <Option value="nepal">Nepal</Option>
      </Select>

</Form.Item>
</Row>
<Row className=" m-0">

<Form.Item>

  <Input name="address" value={this.state.createaccountform.address} onChange={this.changehandler}
   autoComplete="off" prefix={<Icon type="address" style={{ color: 'rgba(0,0,0,.25)' }} />}
    placeholder="Enter Address"
  />
</Form.Item>
</Row>

      <Row className=" m-0">


<Form.Item>

  <Input name="telephoneno" ref={this.telephoneno} value={this.state.createaccountform.telephoneno} onChange={this.changehandler}
   autoComplete="off" prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
    placeholder="Telephone no."
  />
</Form.Item>
</Row>
<Row className=" m-0">

<Form.Item>

  <Input name="mobileno" value={this.state.createaccountform.mobileno} onChange={this.changehandler}
   autoComplete="off" prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
    placeholder="Mobile No."
  />
</Form.Item>
</Row>
<Row className=" m-0">



<Form.Item>

  <Input type="email" name="email" value={this.state.createaccountform.email} onChange={this.changehandler}
   autoComplete="off" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
    placeholder="Email"
  />
</Form.Item>
</Row>
<Row className=" m-0 text-center">
<Form.Item>
<Button onClick={this.resetform} style={{backgroundColor:"red",color:"white"}}
    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}>Reset</Button>
  <Button htmlType="submit" id={this.state.selectedid} className="ml-2" style={{backgroundColor:"blue",color:"white"}}
    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}>
    {this.state.inserttype} </Button>
    
 
</Form.Item>



</Row>
</fieldset>
     
       
      </Form>
      </Card>
      {this.state.alert}
      </div></div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;