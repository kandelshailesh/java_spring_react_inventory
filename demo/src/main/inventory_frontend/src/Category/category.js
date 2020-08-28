import React from "react";
import 'antd/dist/antd.css';
import { Route, Switch,NavLink} from 'react-router-dom';
import {Layout,Avatar,Menu,Icon,Button,Dropdown,Card,Table,Row,Col,Drawer,Select,Input,Form,DatePicker} from 'antd';
import EditFilled from '@ant-design/icons/EditFilled';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import SweetAlert from 'sweetalert2-react';
import queryString from 'query-string';
import CategoryDetails from './category_details';

const { Column, ColumnGroup } = Table;

const {Option} = Select;
const data1 = [
    {
      key: '1',
      categoryName:'Samsung',
      group:20,
      item:50
    },
    {
      key: '2',
      categoryName: 'Jim',
      group:20,
      item:50
      
    },
    {
      key: '3',
      categoryName: 'Joe',

      group:20,
      item:50
      
    },
  ];
  

  var dataCollection=[];

class Category extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { add_visible: false,
            edit_visible:false,
        categorylist:[],
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

    

    list_category = (e) =>
  {

    (async () => {
      const rawResponse = await  fetch('/select_category',
      {method:'get',
      mode:"no-cors",
      headers:{
          'Accept':'application/json',         
      }
    });
   
    const content = await rawResponse.json();
    if(content.message==="OK")
    {
      var results=content.categorylist;

      if(results.length===0)
      {
        this.setState({
          table_loading:false
        })
      }
      else
      {
    results.forEach((result,i)=>
    {
      console.log(result);
      var id = result._id;
      var editid= "edit-"+id;
      var deleteid= "delete-"+id;
console.log(id);
  dataCollection.push(
  {
        key: i+1,
        categoryName:result.name,
        brandName:result.brand[0].name,
        edit:<Button id={editid} onClick={(e)=>this.edit_handler(e)} style={{backgroundColor:'white',border:'0px'}}><EditFilled style={{color:'green'}}></EditFilled></Button>,
        delete: <Button id={deleteid} onClick={(e)=>this.handleDelete(e)} style={{backgroundColor:'white',border:'0px'}}><DeleteFilled  style={{color:'red'}}></DeleteFilled></Button>,
        id:id,
        brandId:result.brand[0]._id
  }
  )
  
    });
    this.setState({
      categorylist:dataCollection,
      table_loading:false
    })     
    dataCollection=[];
    }
    }
    })();
  }

  list_brand = (e) =>
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
      console.log(results);
      if(results.length===0)
      {
        this.setState({
          table_loading:false
        })
      }
      else
      {
    this.setState({
      brandlist:results,
      table_loading:false
    })     
    }
    }
    })();
  }

 edit_handler = (e) =>
 {
     console.log(e.target.id);
    var targetid= e.target.id.split('-')[1];
    console.log(targetid);
     this.state.categorylist.map((result,i)=>
     {
     if(result.id===targetid)
     {
         console.log("True");
         console.log(result);
         this.props.form.setFieldsValue({
             Name:result.categoryName,
             CatId:result.id,
             Id:result.brandId
         })
        this.setState({
            edit_visible:true
        })
     }    
     })
 }

   

  handleSubmit = (e) => {
    e.preventDefault();
  
    this.props.form.validateFields((err, values) => {
      console.log(err);
        (async () => {
        //   const data =this.state.name; 
        if(this.props.form.getFieldValue('name') && this.props.form.getFieldValue('id'))
        {
          const data ={name:this.props.form.getFieldValue('name'),brand:this.props.form.getFieldValue('id')}; 


          console.log(data);
          // const id= this.state.selectedid;
          var rawResponse;
          rawResponse = await  fetch('/create_category',
          {
          method:'POST',
          mode:"no-cors",
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/x-www-form-urlencoded'
          },
          body:queryString.stringify(data)
        });

        const content = await rawResponse.json();
        if(content.message==="Category created Successfully")
  {
console.log("Cateogory created Successfully");
this.onClose();
const getAlert = (message) => (
  <SweetAlert show={true}
    success 
    title="Category created successfully" 
    
  >
    ${message}
  </SweetAlert>
);

this.props.form.setFieldsValue(
  {
    name:'',
  }
)
this.setState({
alert:getAlert("")
})
this.list_category();
this.list_brand();
  }
  else

  {
      console.log(content.err);
      const getAlert = (message) => (
        <SweetAlert show={true}
          success 
          title="Categoryname Already Exists" 
          
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
        rawResponse = await  fetch('/delete_category',
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
  title="Category deleted successfully" 
  
>
  ${message}
</SweetAlert>
);


this.list_category();
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
          if(this.props.form.getFieldValue('Name') && this.props.form.getFieldValue('Id') && this.props.form.getFieldValue('CatId'))
          {
          const name =this.props.form.getFieldValue('Name'); 
          const brand= this.props.form.getFieldValue('Id'); 
          const id= this.props.form.getFieldValue('CatId');
          console.log(name);
          // const id= this.state.selectedid;
          var rawResponse;
          rawResponse = await  fetch('/update_category',
          {
          method:'POST',
          mode:"no-cors",
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/x-www-form-urlencoded'
          },
          body:queryString.stringify({name:name,brand:brand,id:id})
        });

        const content = await rawResponse.json();
        if(content.message==="Successfully Updated")
  {
console.log("Category updated successfully");
this.onClose();
this.list_category();
const getAlert = (message) => (
  <SweetAlert show={true}
    success 
    title="Category Updated Successfully" 
    
  >
    ${message}
  </SweetAlert>
);

this.setState({
alert:getAlert("")
})

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
    this.list_category();
    this.list_brand();
  }
    

 render()
 {
    const { getFieldDecorator,getFieldValue } = this.props.form;


    return(<React.Fragment>
        <Row gutter={[16,16]} style={{margin:'10px'}} >
            <Col span={1}>
            </Col>
            <Col span={10}>
                <Card>
         <CategoryDetails title="Category Description" data={data1}/>
         </Card>
          </Col>
          
            <Col span={12} >
             <Card>
                <Button type="primary" onClick={this.showDrawer}>Create Category</Button>
      <Table loading={this.state.table_loading} pagination={{ defaultPageSize: 4, showSizeChanger: true, pageSizeOptions: ['4', '8', '12']}} dataSource={this.state.categorylist} style={{marginTop:'20px'}}>
      <Column title="S.N." dataIndex=
          "key" index="key">
              </Column>
          <Column title="CategoryName" dataIndex=
          "categoryName" index="categoryName">
              </Column>
              <Column title="BrandName" dataIndex=
          "brandName" index="brandName">
              </Column>
         
                  <Column title="Edit" dataIndex="edit" index="edit"></Column>
                  <Column title="Delete" dataIndex="delete" index="delete"></Column>
          
          </Table>
          {this.state.alert}

          <Drawer
          title="Create new category"
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
              <Form.Item label="Enter Category name">
                 {getFieldDecorator("name", {
                    rules: [{ required: true, message: "Please input the category name!" }]
                  })(
                  <Input name="name" onChange={this.handleOnChange}   placeholder="Category name" />)}
                </Form.Item>
              </Col>
              </Row>
              <Row gutter={24}>

              <Col span={2}></Col>
              <Col span={18}>
              <Form.Item label="Select Brand">
                 {getFieldDecorator("id", {
                    rules: [{ required: true, message: "Please input the brand name!" }]
                  })(
                  <Select showSearch name="id"   placeholder="Brand name" optionFilterProp="children" >
                    {this.state.brandlist.map((result,i)=>(
                      <Option value={result._id}>{result.name}</Option>
                    ))}
                  </Select>)}
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
          title="Edit Categoryname"
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
              <Form.Item label="Enter Category name">
                 {getFieldDecorator("Name", {
                    rules: [{ required: true, message: "Please input the category name!" }]
                  })(
                  <Input name="Name" onChange={this.handleOnChange}   placeholder="Category name" />)}
                </Form.Item>
              </Col>
              </Row>
              <Row gutter={24}>

              <Col span={2}></Col>
              <Col span={18}>
              <Form.Item label="Select Brand">
                 {getFieldDecorator("Id", {
                    rules: [{ required: true, message: "Please input the brand name!" }]
                  })(
                  <Select showSearch name="Id"   placeholder="Brand name" optionFilterProp="children" >
                    {this.state.brandlist.map((result,i)=>(
                      <Option key={result._id}>{result.name}</Option>
                    ))}
                  </Select>)}
                </Form.Item>
                <Form.Item >
                 {getFieldDecorator("CatId", {
                    rules: [{ required: true, message: "Please input the category name!" }]
                  })(
                  <Input name="CatId" style={{display:'none'}} onChange={this.handleOnChange}   placeholder="Category name" />)}
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

const WrappedBrandForm = Form.create({ name: 'normal_login' })(Category);

export default WrappedBrandForm;
