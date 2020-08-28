import React from "react";
import 'antd/dist/antd.css';
import { Route, Switch,NavLink} from 'react-router-dom';
import {Layout,Avatar,Menu,Icon,Button,Dropdown} from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import SettingFilled from '@ant-design/icons/SettingFilled';
import UserOutlined from '@ant-design/icons/UserOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import BellFilled from '@ant-design/icons/BellFilled';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ContentLoader,{Facebook} from 'react-content-loader';
const {Header,Footer,Sider,Content}= Layout;


const TitleLoader = () =>
(
    <ContentLoader  style={{width:"140px",height:"40px"}}>
    {/* Only SVG shapes */}    
    <rect x="10" y="4" width="140" height="35" />
  </ContentLoader>
)

const UserLoader = () => (
    <ContentLoader style={{width:"130px",height:"40px"}}>
      {/* Only SVG shapes */}    
      <circle cx="20" cy="20" r="20" />
      <rect x="45" y="10" width="100" height="20" />
    </ContentLoader>
  )

const NotificationLoader = ()=>
(
    <ContentLoader style={{width:"60px",height:"40px"}}>
    
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
)
class  HeaderLoader extends React.Component
{
    render()
    {
        return(
<Layout>
    <Header style={{backgroundColor:"#eee"}}>         
    <div style={{float:'right',marginTop:'-10px',marginRight:'0px',padding:'12px'}}>
 <label style={{marginRight:"100px",color:'white'}}>
     
     <UserLoader/>
 </label>
            <NotificationLoader style={{marginRight:"12px"}}/>
        <NotificationLoader/>
        </div>
        

    <TitleLoader/>
    </Header>
    </Layout>)
    }
}

export default HeaderLoader;