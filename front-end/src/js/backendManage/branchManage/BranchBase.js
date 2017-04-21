import React,{Component} from 'react';
import {Link,browserHistory,router,IndexLink} from 'react-router';
import {  Row, Col,  Button, } from 'antd';
import BranchInfo from "./BranchInfo"
import BranchMember from "./BranchMember"
import BranchDevice from "./BranchDevice"
import BranchAround from "./BranchAround"
import BranchGuide from "./BranchGuide"
import BranchAway from "./BranchAway"

	export default class BranchBase extends Component {
			constructor(props){
				super(props);
        this.branch=this.props.location.state.branch;
        this.brchno=this.branch.key;
        this.bgColor=["#49a9ee","#108ee9","#108ee9","#108ee9","#108ee9","#108ee9"]
			  this.state = {
					 visible: false,
           tab:0
				 }
			}

     renderContent(){
      var tab = this.state.tab;
      let self=this;
      switch(tab){
        case 0:
          return <BranchInfo branch = {self.branch}/>;
          break;
        case 1:
          return <BranchMember brchno = {self.brchno}/>
          break;
        case 2:
          return <BranchDevice brchno = {self.brchno}/>
          break;
        case 3:
          return <BranchAround/>
          break;
        case 4:
          return <BranchGuide brchno = {self.brchno}/>
          break;
        case 5:
          return <BranchAway/>
          break;
        default:
          return null
          break;
      }
     }
     setTab(index){
      var self=this;
      for(var i=0;i<this.bgColor.length;i++){
        if(i==index){
          self.bgColor[i]="#49a9ee"
        }else{
          self.bgColor[i]="#108ee9"
        }
      }
      this.setState({tab:index})
     }


			render() {
        var Content=this.renderContent();
				return (

					<div >
				    <Row>
				      <Col span={3} style={{paddingLeft:20,marginTop:20}}>
							  <Button type="primary" size="large" style={{width:100,marginBottom:10,backgroundColor:this.bgColor[0],borderColor:this.bgColor[0]}}   onClick={()=>{this.setTab(0)}}>基本信息</Button>
								<Button type="primary" size="large" style={{width:100,marginBottom:10,backgroundColor:this.bgColor[1],borderColor:this.bgColor[1]}}   onClick={()=>{this.setTab(1)}}>人员配置</Button>
								<Button type="primary" size="large" style={{width:100,marginBottom:10,backgroundColor:this.bgColor[2],borderColor:this.bgColor[2]}}   onClick={()=>{this.setTab(2)}}>设备配置</Button>
								<Button type="primary" size="large" style={{width:100,marginBottom:10,backgroundColor:this.bgColor[3],borderColor:this.bgColor[3]}}   onClick={()=>{this.setTab(3)}}>周边环境</Button>
								<Button type="primary" size="large" style={{width:100,marginBottom:10,backgroundColor:this.bgColor[4],borderColor:this.bgColor[4]}}   onClick={()=>{this.setTab(4)}}>网点导览图</Button>
                <Button type="primary" size="large" style={{width:100,marginBottom:10,backgroundColor:this.bgColor[5],borderColor:this.bgColor[5]}}   onClick={()=>{this.setTab(5)}}>撤并记录</Button>
							</Col>

				      <Col span={18}>
               {Content}
							</Col>
				    </Row>
				  </div>


				);
			}
}
