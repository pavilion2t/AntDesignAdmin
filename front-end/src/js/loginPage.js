import React,{Component} from 'react';
import { Input,Icon,Button,Form,message,Modal,Spin} from 'antd';
import {Link,browserHistory,router} from 'react-router';
import md5 from 'md5'
import HTTPService from './Utils/HTTPService'
const FormItem = Form.Item;
const HTTP=new HTTPService();

export default class LoginPage extends Component {
	constructor(props){
		super(props);
		this.httpService = new HTTPService();
		this.state = {
			userid:"",
			password:"",
			loading:false
		}

	}
	login(){

		//let tranCode = "login";
		//let input={
     		//"userid":this.state.userid,
		 //	"resPasswd":md5(this.state.password)
    	//}
	//	let self = this;
	//	console.log(input)
	//	this.setState({loading:true})
	//	window.currentIp = HTTP.getIp();
	//	HTTP.commHttp(tranCode,input,function(data){
	//		console.log(data)
	//		sessionStorage.setItem("token",data.token)
			
      	//self.setState({loading:false})
	//	 	browserHistory.push({ pathname: '/home', state:{ name:data.userna } });
		browserHistory.push({ pathname: '/home',state:{name:"1001"} });
	//	},function(e){
	//		self.setState({loading:false})
       	//	Modal.error({
	//			title: '登录失败',
	//			content:e,
	//			onOk:()=>{self.setState({loading:false})}
	//		});
	//	});
	}
	componentDidMount () {
		sessionStorage.clear();
		window.currentIp=HTTP.getIp();
	}
	

	render() {
		return(
			<div className="blue-bg">

						<div className="medium">
								<p className="word">
									网点管理系统后台
								</p>

									<div className="img-bg">
										
											<Form className="login-form">
												<FormItem>
														<Input
															placeholder="Enter your userName"
															prefix={<Icon type="user" />}
															onChange={(e)=>{this.setState({userid:e.target.value})}}
															value={this.state.userid}/>
													</FormItem>

												<FormItem>
													<Input
														type="password"
														placeholder="Enter your password"
														prefix={<Icon type="lock" />}
														onChange={(e)=>{this.setState({password:e.target.value})}}
														value={this.state.password}/>
												</FormItem>
													<Button type="primary" htmlType="submit" loading={this.state.loading} icon="login"  style={{width:300,height:40,fontSize:14}} onClick={()=>this.login()}> 登录</Button>
											</Form>
										
									</div>
						
						</div>
					</div>
			
	
	
		)
	}
}
