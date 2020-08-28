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
const { Column, ColumnGroup } = Table;

const {Option} = Select;
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

  export default class BrandDetails extends React.Component
  {
      render()
      {
          return(
          <React.Fragment>
                   
                                  <Title level={4} style={{textAlign:"center",color:'red'}}>{this.props.title}</Title>
          <Table dataSource={this.props.data} style={{marginTop:'20px'}}>
      <Column title="S.N." dataIndex=
          "key" index="key">
              </Column>
          <Column title="BrandName" dataIndex=
          "brandName" index="brandName">
              </Column>
         
                  <Column title="#ofCategory" dataIndex="category" index="category"></Column>
                  <Column title="#ofGroup" dataIndex="group" index="group"></Column>
                  <Column title="#ofItem" dataIndex="item" index="item"></Column>

          
          </Table>
       
              </React.Fragment>
          )
      }
  }