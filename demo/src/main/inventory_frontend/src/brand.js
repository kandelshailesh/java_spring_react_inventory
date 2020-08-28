import React from "react";
import 'antd/dist/antd.css';
import { Route, Switch,NavLink} from 'react-router-dom';
import {Layout,Avatar,Menu,Icon,Button,Dropdown,Card,Table,Row,Col,Drawer,Select,Input,Form,DatePicker} from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import SettingFilled from '@ant-design/icons/SettingFilled';
import UserOutlined from '@ant-design/icons/UserOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import BellFilled from '@ant-design/icons/BellFilled';
import EditFilled from '@ant-design/icons/EditFilled';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import SweetAlert from 'sweetalert2-react';
import queryString from 'query-string';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ContentLoader,{Facebook} from 'react-content-loader';
import HeaderLoader from './header_loader';
import BrandDetails from './brand_details';

const { Column, ColumnGroup } = Table;

const {Option} = Select;

const data = [
  {
    key: '1',
    brandName:'Samsung',
    edit:<EditFilled style={{color:'green'}}></EditFilled>,
    delete: <DeleteFilled style={{color:'red'}}></DeleteFilled>
  },
  {
    key: '2',
    brandName: 'Jim',
    edit:<EditFilled style={{color:'green'}}></EditFilled>,
    delete: <DeleteFilled style={{color:'red'}}></DeleteFilled>
    
  },
  {
    key: '3',
    brandName: 'Joe',
    edit:<EditFilled style={{color:'green'}}></EditFilled>,
    delete: <DeleteFilled style={{color:'red'}}></DeleteFilled>
    
  },
];

const data1 = [
    {
      key: '1',
      brandName:'Samsung',
      category:10,
      group:20,
      item:50
    },
    {
      key: '2',
      brandName: 'Jim',
      category:10,
      group:20,
      item:50
      
    },
    {
      key: '3',
      brandName: 'Joe',
      category:10,
      group:20,
      item:50
      
    },
  ];
  

  var dataCollection=[];

class Brand extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { add_visible: false,
            edit_visible:false,
        brandlist:[],
        editname:'Shailesh',
        name:'',
        alert:null,
        table_loading:true};

        this.createbrandform= React.createRef();
    }
    showDrawer = () => {
      this.setState({
        add_visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        add_visible: false,
        edit_visible:false
      });
    };

    

    list_data = (e) =>
  {

    (async () => {
      const rawResponse = await  fetch('/select_brand',
      {
      method:'post',
      mode:"no-cors",
      headers:{
          'Accept':'application/json',         
      }
    });
   
    const content = await rawResponse.json();
    if(content.message==="OK")
    {
      var results=content.brandlist;
    results.forEach((result,i)=>
    {
      var id = result._id;
      var editid= "edit-"+id;
      var deleteid= "delete-"+id;
console.log(id);
  dataCollection.push(
  {
        key: i+1,
        brandName:result.name,
        edit:<Button id={editid} onClick={(e)=>this.edit_handler(e)} style={{backgroundColor:'white',border:'0px'}}><EditFilled style={{color:'green'}}></EditFilled></Button>,
        delete: <Button id={deleteid} onClick={(e)=>this.handleDelete(e)} style={{backgroundColor:'white',border:'0px'}}><DeleteFilled  style={{color:'red'}}></DeleteFilled></Button>,
        id:id
  }
  )
  
    });
    this.setState({
      brandlist:dataCollection,
      table_loading:false
    })     
    dataCollection=[];
    }
    })();
  }

 edit_handler = (e) =>
 {
     console.log(e.target.id);
    var targetid= e.target.id.split('-')[1];
    console.log(targetid);
     this.state.brandlist.map((result,i)=>
     {
     if(result.id===targetid)
     {
         console.log("True");
         console.log(result.brandName);
         this.props.form.setFieldsValue({
             Name:result.brandName,
             ID:targetid
         })
        this.setState({
            edit_visible:true
        })
     }    
     })
 }
 handleOnChange= (e) =>
 {
  
    this.setState({
        [e.target.name]:e.target.value
      });
    }

  handleSubmit = (e) => {
    e.preventDefault();
  
    this.props.form.validateFields((err, values) => {
      
        (async () => {
        //   const data =this.state.name; 
        if(this.props.form.getFieldValue('name'))
        {
          const data =this.props.form.getFieldValue('name'); 


          console.log(data);
          // const id= this.state.selectedid;
          var rawResponse;
          rawResponse = await  fetch('/create_brand',
          {
          method:'POST',
          mode:"no-cors",
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/x-www-form-urlencoded'
          },
          body:queryString.stringify({name:data})
        });

        const content = await rawResponse.json();
        if(content.message==="Brand created Successfully")
  {
console.log("Brand created Successfully");
this.onClose();
const getAlert = (message) => (
  <SweetAlert show={true}
    success 
    title="Brand created successfully" 
    
  >
    ${message}
  </SweetAlert>
);

this.props.form.setFieldsValue(
  {
    name:''
  }
)
this.setState({
alert:getAlert("")
})
this.list_data();
  }
  else

  {
      console.log(content.err);
      const getAlert = (message) => (
        <SweetAlert show={true}
          success 
          title="Brandname Already Exists" 
          
        >
          ${message}
        </SweetAlert>
      );
      
     this.setState({
      alert:getAlert("")
     })
      
  }
}
})();
      
    })
  }

  handleDelete = (e) =>
  {
    e.preventDefault();
    var id= e.target.id.split('-')[1];
    (async () => {
        var rawResponse;
        rawResponse = await  fetch('/delete_brand',
        {
        method:'POST',
        mode:"no-cors",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:queryString.stringify({id:id})
      });

      const content = await rawResponse.json();
      if(content.message==="Deleted Successfully")
{
console.log("DEleted successfully");
this.onClose();
const getAlert = (message) => (
<SweetAlert show={true}
  success 
  title="Brand deleted successfully" 
  
>
  ${message}
</SweetAlert>
);


this.list_data();
}
else

{
  console.log("Error occured");
}
})();
  }

  handleeditSubmit = (e) => {
    e.preventDefault();
  
    this.props.form.validateFields((err, values) => {
    
        (async () => {
          if(this.props.form.getFieldValue('Name') && this.props.form.getFieldValue('ID'))
          {
          const data =this.props.form.getFieldValue('Name'); 
          const id= this.props.form.getFieldValue('ID'); 
          console.log(data);
          // const id= this.state.selectedid;
          var rawResponse;
          rawResponse = await  fetch('/update_brand',
          {
          method:'POST',
          mode:"no-cors",
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/x-www-form-urlencoded'
          },
          body:queryString.stringify({name:data,id:id})
        });

        const content = await rawResponse.json();
        if(content.message==="Successfully Updated")
  {
console.log("Brand updated successfully");
this.onClose();
this.list_data();
this.props.form.setFieldsValue(
  {
  Name:'',
  id:''
  }
)
  }
  else

  {
      console.log("Error");
  }
}
})();
      
    })
  }

    UNSAFE_componentWillMount()
  {
    this.list_data();
  }
    

 render()
 {
    const { getFieldDecorator,getFieldValue } = this.props.form;


    return(<React.Fragment>
        <Row gutter={[16,16]} style={{margin:'10px'}} >
            <Col span={1}>
            </Col>
            <Col span={12}>
                <Card>
         <BrandDetails title="Brand Description" data={data1}/>
         </Card>
          </Col>
          
            <Col span={10} >
             <Card>
                <Button type="primary" onClick={this.showDrawer}>Create Brand</Button>
      <Table loading={this.state.table_loading} pagination={{ defaultPageSize: 4, showSizeChanger: true, pageSizeOptions: ['4', '8', '12']}} dataSource={this.state.brandlist} style={{marginTop:'20px'}}>
      <Column title="S.N." dataIndex=
          "key" index="key">
              </Column>
          <Column title="BrandName" dataIndex=
          "brandName" index="brandName">
              </Column>
         
                  <Column title="Edit" dataIndex="edit" index="edit"></Column>
                  <Column title="Delete" dataIndex="delete" index="delete"></Column>
          
          </Table>
          {this.state.alert}

          <Drawer
          title="Create new Brand"
          width={350}
          height={200}
        closable={true}
          onClose={this.onClose}
          visible={this.state.add_visible}
          bodyStyle={{ paddingBottom: 80 }}
         
        >
            <Card style={{marginTop:"50px"}}>
                
          <Form  onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
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
        </Drawer>
        <Drawer
          title="Edit Brandname"
          width={350}
          height={200}
        closable={true}
          onClose={this.onClose}
          visible={this.state.edit_visible}
          bodyStyle={{ paddingBottom: 80 }}
         
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
        
        
         
          </Card>
        
          </Col>
          </Row>
          
    </React.Fragment>)
 }
}

const WrappedBrandForm = Form.create({ name: 'normal_login' })(Brand);

export default WrappedBrandForm;
