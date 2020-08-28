import React from "react";
import 'antd/dist/antd.css';
import { Route, Switch,NavLink, Redirect,Link} from 'react-router-dom';
import {Layout,Avatar,Menu,Button,Dropdown} from 'antd';
import Icon from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import SettingFilled from '@ant-design/icons/SettingFilled';
import UserOutlined from '@ant-design/icons/UserOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import BellFilled from '@ant-design/icons/BellFilled';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ContentLoader,{Facebook} from 'react-content-loader';
import HeaderLoader from './header_loader';
import Brand from './Brand/brand';
import Category from './Category/category';
import store from 'store';
import User from "./User/user";
import Branch from "./Branch/branch";
import Currency from "./Currency/currency";
import Inventory from './Inventory/inventory_add';
import Rate from './Rate/rate';

const {Header,Footer,Sider,Content}= Layout;

class Sidebar extends React.Component
{

  componentDidMount()
  {
  

  }

  changeroute = (routename) =>
  {
    this.props.history.push(routename);
  }
  
  handleLogout= () =>
  {
    store.set("isloggedin",false);
    store.remove("token");
    this.props.history.push('/login')
  }
  render()
  { 
  if(!store.get('isloggedin'))
  {
    return(<Redirect to="/login"></Redirect>);
  } 
    const settingdropdown = (
      <Menu style={{width:"100px",textAlign:'left'}}>
        <Menu.Item style={{padding:'10px' }}>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          View Profile
          </a>
        </Menu.Item>
        <Menu.Item style={{padding:'10px'}}> 
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
           History
          </a>
        </Menu.Item >
        <Menu.Item style={{padding:'10px'}} onClick={this.handleLogout}>
       Logout
        </Menu.Item>
      </Menu>
    );
  
 return (<React.Fragment>
  <Layout>
     <Header style={{backgroundColor:'blue',opacity:'0.7'}}>         
    <div style={{float:'right',marginTop:'-10px',marginRight:'0px',padding:'12px'}}>
           
 <label style={{marginRight:"100px",color:'white'}}>
     <UserOutlined style={{fontSize:"30px",marginLeft:"10px",color:'white'}}/> Username 
 </label>
        <Button type="ghost" shape="circle" style={{marginRight:"12px"}} size={"large"}>
        <BellFilled style={{fontSize:"22px",color:'white'}}/>
        </Button>
        <Dropdown overlay={settingdropdown}>
        <Button type="ghost" shape="circle" size={"large"}>
        <SettingFilled style={{fontSize:"22px",color:'white'}}/>
        </Button>

        </Dropdown>

        </div>
        

    <Title style={{color:'white',padding:'14px'}} level={3}>ANSU CRM</Title>
    </Header>
    
    <Layout>
    <Sider style={{backgroundColor:'white',height:'90vh'}}>
        <Menu defaultSelectedKeys={['Dashboard']} mode="inline">
            <Menu.Item key="Dashboard">
            <Icon type="heart"></Icon> DASHBOARD
            </Menu.Item>
            <SubMenu title={<span><Icon type="mail"></Icon><span>PRODUCTS</span></span>}> 
                    <Menu.Item><a href="/brand"><Icon type="mail"></Icon>BRAND </a></Menu.Item>
                    <Menu.Item><a href="/category"><Icon/>CATEGORY</a></Menu.Item>
                    <Menu.Item><a href="/group"><Icon/>GROUP</a></Menu.Item>
                    <Menu.Item><a href="/item"><Icon/>ITEM</a></Menu.Item>
            </SubMenu>
            <Menu.Item onClick={(e) => this.changeroute('/inventory')}>
             <Icon type="heart"></Icon>INVENTORY            
            </Menu.Item>
            {/* <SubMenu title={<span><Icon type="mail"></Icon><span>INVENTORY</span></span>}> 
                    <Menu.Item onClick={(e) => this.changeroute('/inventory/add')}><Icon type="mail"></Icon>ADD</Menu.Item>
                    <Menu.Item onClick={(e) => this.changeroute('/inventory/view')}><Icon/>VIEW</Menu.Item>
                
            </SubMenu> */}
            <Menu.Item onClick={(e) => this.changeroute('/user')}>
             <Icon type="heart"></Icon>USERS
            
            </Menu.Item>

            <Menu.Item onClick={(e) => this.changeroute('/branch')}>
             <Icon type="heart"></Icon>BRANCH
            </Menu.Item>
            
            <Menu.Item onClick={(e) => this.changeroute('/currency')}>
             <Icon type="heart"></Icon>CURRENCY
            </Menu.Item>

            <Menu.Item onClick={(e) => this.changeroute('/rate')}>
             <Icon type="heart"></Icon>SET RATE
            </Menu.Item>
            <SubMenu title={<span><Icon type="mail"></Icon><span>USERS</span></span>}> 
                <Menu.Item><Icon type="mail"></Icon>ADMIN</Menu.Item>
                <Menu.Item><Icon type="mail"></Icon>DEALER</Menu.Item>
                <Menu.Item><Icon/>SCHOOLS</Menu.Item>
                <Menu.Item><Icon/>GOVERNMENT</Menu.Item>
            </SubMenu>
            
        </Menu>
    </Sider>
    <Layout style={{overflowY:"hidden"}}>
    <Content style={{backgroundColor:'white',border:'2px solid #eee'}}>  
    <Switch>
        <Route path="/brand" exact strict component={Brand}></Route>
        <Route path="/category" exact strict component={Category}></Route>
        <Route path="/user" exact strict component={User}></Route>
        <Route path="/branch" exact strict component={Branch}></Route>
        <Route path="/currency" exact strict component={Currency}></Route>
        <Route path="/inventory" exact strict component={Inventory}></Route>
        <Route path="/rate" exact strict component={Rate}></Route>

        {/* <Route path="/inventory/view" exact strict component={Inventory}></Route> */}
        </Switch>  
    </Content>
    <Footer style={{backgroundColor:'blue',height:'40px',opacity:'0.7',color:'white'}}>
        <p style={{marginTop:'-10px' ,textAlign:'center'}}> &copy; ANSU TECH PVT LTD</p>
    </Footer>
    </Layout>
    </Layout></Layout>
  </React.Fragment>)
  }
}

export default Sidebar;