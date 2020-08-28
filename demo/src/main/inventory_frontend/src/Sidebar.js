import React from "react";
import { Route, Switch,NavLink} from 'react-router-dom';
import {Layout} from 'antd';
const {Header,Footer,Sider,Content}= Layout;
class Sidebar extends React.Component
{
  render()
  {
 return (<React.Fragment>
  <Layout>
    <Header>Header</Header>
    <Layout>
    <Sider>Sider</Sider>
    </Layout>
    <Content>Content</Content>
    <Footer>Footer</Footer>
    </Layout>
  </React.Fragment>)
  }
}

export default Sidebar;