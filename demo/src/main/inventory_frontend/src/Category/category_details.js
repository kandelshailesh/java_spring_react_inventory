import React from "react";
import 'antd/dist/antd.css';
import {Table,Select} from 'antd';
import Title from 'antd/lib/typography/Title';
const { Column } = Table;
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
          <Column title="CategoryName" dataIndex=
          "categoryName" index="cateogoryName">
              </Column>
                  <Column title="#ofGroup" dataIndex="group" index="group"></Column>
                  <Column title="#ofItem" dataIndex="item" index="item"></Column>

          
          </Table>
       
              </React.Fragment>
          )
      }
  }