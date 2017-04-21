import React,{Component} from 'react';
import {Link,browserHistory,router} from 'react-router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,Radio,DatePicker } from 'antd';
import PersonbasicInfo from "./PersonbasicInfo"
import PersonFundamentalData from "./PersonFundamentalData"
import PersonalExperience from "./PersonalExperience"
const wellStyles = {margin: '0 20px'};
import "../../../css/table.css"
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;
const Option = Select.Option;

	export default class CheckInfo extends Component {
			constructor(props){
				super(props);
				this.userid=this.props.location.state.person.USERID;

			  this.state = {
					 visible: false,
					 data:[],
           tab:0,
				 }
			}

      renderContent(){
       var tab = this.state.tab;
       let self=this;
       switch(tab){
         case 0:
           return <PersonbasicInfo userid = {self.userid}/>;
           break;
         case 1:
           return <PersonFundamentalData userid = {self.userid}/>;
           break;
         case 2:
           return <PersonalExperience userid = {self.userid}/>;
           break;
         case 3:
           return null
           break;
         case 4:
           return null
           break;
         case 5:
           return null
           break;
         default:
           return null
           break;
       }
      }



		render() {
      var Content=this.renderContent();

        return (
					<div>
				    <Row>
				      <Col span={3}>
              <Button type="primary" size="large" className="leftMenu" onClick={()=>{this.setState({tab:0})}}>基本信息</Button>
              <Button type="primary" size="large" className="leftMenu" onClick={()=>{this.setState({tab:1})}}>基础信息</Button>
              <Button type="primary" size="large" className="leftMenu" onClick={()=>{this.setState({tab:2})}}>个人经历</Button>
              <Button type="primary" size="large" className="leftMenu" onClick={()=>{this.setState({tab:3})}}>获得荣耀</Button>
              <Button type="primary" size="large" className="leftMenu" onClick={()=>{this.setState({tab:4})}}>评价信息</Button>
              <Button type="primary" size="large" className="leftMenu" onClick={()=>{this.setState({tab:5})}}>业绩信息</Button>

							</Col>

				      <Col span={21}>
                {Content}
							</Col>
				    </Row>
				  </div>


				);
			}
}
