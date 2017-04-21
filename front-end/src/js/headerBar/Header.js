import React,{Component} from 'react';
import { Row, Col,Icon } from 'antd';
import {Link,browserHistory} from 'react-router';
import Utils from '../Utils/Utils.js';
export default class HeaderBar extends Component {
	constructor(props){
		super(props);
		this.curDate = Utils.getFullDate();
		this.username = this.props.userState;
    this.state = {
			nowTime:"",
		}
	}

componentDidMount(){
	this.timer = setInterval(() =>this.clock(),1000);
}

clock(){
		let curDate = Utils.getFullDate("yyyy/mm/dd hh:mm:ss");
		this.setState({
			//nowTime:year+"/"+month+"/"+day + "  "+hours+":"+minutes+":"+seconds,
			 nowTime:curDate
		});
	}

	logOut(){
		browserHistory.replace("/");
}

componentWillUnmount() {
	clearInterval(this.timer)
} 



	render(){
		return(

			<div className="gutter-example">
					<Row type="flex" justify="start" className="gutter-box">
						<Col span={4}><p style={{fontSize:18}}>网点管理系统</p></Col>
						<Col span={4}>{this.username}   欢迎你！</Col>
						<Col span={4}>&nbsp;</Col>
						<Col span={4}>&nbsp;</Col>
						<Col span={7}>系统时间:  {this.state.nowTime}</Col>
						<Col span={1}><Icon style={{cursor:"pointer"}} type="poweroff" onClick={()=>this.logOut()}/></Col>
					</Row>
		   </div>
		)
	}
}
