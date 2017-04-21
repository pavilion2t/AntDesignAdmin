import React,{Component} from 'react';
import { Table, Icon,Form, Input, Tooltip,Popconfirm,Modal,
	Pagination, Radio, Select, Row, Col, Checkbox, Button,DatePicker } from 'antd';
const wellStyles = {margin: '0 20px'};
import "../../../css/table.css"
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;
const Option = Select.Option;
let children = [];
let children2 = [];
let children3 = [];
export default class PersonbasicInfo extends Component {
	constructor() {
		super();
		this.BranchKey=[];
		this.BranchValue=[];
		this.DepartmentKey=[];
		this.DepartmentValue=[];
		this.state = {
			disable:true,
			formLayout: 'horizontal',
			id:"",
			department:"",
			gender:"",
			idcard:"",
			marriage:"",
			name:"",
			web:"",
			age:"",
			birth:"",
			health:"",
		};
	}

	componentDidMount(){
		 this.userid = this.props.userid;
		 this.query();
		 this.queryDepartment();
		 this.queryBranch();
	 }

	query(){
				let self = this;
				let tranCode="queryUser/queryUser"
				var input={
				"USERID":self.userid,
			}
			HTTP.commHttp(tranCode,input,function(obj){
				let listnm = obj.listnm[0];

					if(listnm.GENDER=="0"){
						listnm.GENDER="女"
					}else if(listnm.GENDER=="1"){
						listnm.GENDER="男"
					}

				 if(listnm.MARRIAGE=="1"){
						listnm.MARRIAGE="已婚"
					}else if(listnm.MARRIAGE!="1"){
						listnm.MARRIAGE="未婚"
					}

				self.setState({
					name:listnm.USERNA,
					userid:listnm.USERID,
					department:listnm.DEPTNA,
					web:listnm.BRCHNA,
					gender:listnm.GENDER,
					age:listnm.DEPTNO,
					idcard:listnm.IDTFNO,
					marriage:listnm.MARRIAGE,
					nation:listnm.NATION,
					health:listnm.HEALTH,
				})

			},function(obj){

			},function(){

			})
	}

	queryDepartment(){
	 //初始化页面时查询部门，获得所有部门名称
			 let self = this;
			 let tranCode="queryUser/deptQuery"
			 var input={
			 "DEPTID":"",
			 "DEPTNA":"",
		 }
		 HTTP.commHttp(tranCode,input,function(data){
			 let list = data.listnm;
			 for(let i=0;i<list.length;i++){
				 self.DepartmentKey.push(list[i].key);
				 self.DepartmentValue.push(list[i].value);
		 //将所有role传入选择器组件
				 children3.push(<Option key={self.DepartmentKey[i]}>{self.DepartmentValue[i]}</Option>);
			 }
		 },function(obj){

		 },function(){

		 })
	}

	queryBranch(){
	 //初始化页面时查询网点，获得所有网点名称
			let self = this;
			let tranCode="queryBranch/brchQuery"
			var input={
			"BRCHNO":"",
			"BRCHNA":"",
		}
		HTTP.commHttp(tranCode,input,function(obj){
			let listnm = obj.listnm;
			for(let i=0;i<listnm.length;i++){
				self.BranchKey.push(listnm[i].key);
				self.BranchValue.push(listnm[i].value);
		//将所有网点名称一一传入选择器组件
				children.push(<Option key={self.BranchKey[i]}>{self.BranchValue[i]}</Option>);
			}
		},function(obj){

		},function(){

		})
 }

	handleChange(){

	}

	confir(){

	}


	render() {

		const { formLayout } = this.state;
		{/*labelCol是左边标签，wrapperCol是右边内容*/}
		const formItemLayout = {labelCol: { span: 4 },wrapperCol: { span: 14 },};
		const buttonItemLayout = {wrapperCol: { span: 14, offset: 4 },};

		var Buttons;
		if(this.state.disable){
			Buttons= <FormItem {...buttonItemLayout}>
								<Button type="primary" onClick={()=>{this.setState({disable:false})}}>编辑</Button>
							</FormItem>
		}else{
			 Buttons= <FormItem {...buttonItemLayout}>
								<Button type="primary" onClick={()=>this.confir()}>确定</Button>
								<Button style={{marginLeft:10}} onClick={()=>{this.setState({disable:true})}}>取消</Button>
							</FormItem>
		}

		return (
			<div>
			<Row>
				<Col span={10}>
						<Form layout={formLayout}>

							<FormItem  label="行员编号" {...formItemLayout}>
								<Input disabled={this.state.disable} value={this.state.userid} />
							</FormItem>


							<FormItem {...formItemLayout}	label="所属部门">
							<Select
							disabled={this.state.disable}
							style={{ width: 285 }}
							value={this.state.department}
							onChange={(e)=>{this.setState({department:e})}}>
								{children3}
						 </Select>
							</FormItem>

							<FormItem  label="性别" {...formItemLayout}>
								<Select value={this.state.gender} disabled={this.state.disable} onChange={(e)=>{this.setState({gender:e})}}>
									<Option value="one">男</Option>
									<Option value="two">女</Option>
								</Select>
							</FormItem>

							<FormItem label="民族" {...formItemLayout}>
								<Input disabled={this.state.disable} value={this.state.nation} />
							</FormItem>

							<FormItem  label="身份证号" {...formItemLayout}>
								<Input disabled={this.state.disable} value={this.state.idcard} />
							</FormItem>

							<FormItem label="婚姻状况" {...formItemLayout}>
								<Select disabled={this.state.disable} value={this.state.marriage} onChange={(e)=>{this.setState({marriage:e})}}>
									<Option value="one">已婚</Option>
									<Option value="two">未婚</Option>
								</Select>
							</FormItem>

						</Form>
				</Col>

				<Col span={10}>
				<Form layout={formLayout}>

					<FormItem  label="姓名" {...formItemLayout}>
						<Input disabled={this.state.disable} value={this.state.name} />
					</FormItem>

					<FormItem {...formItemLayout}	label="所在网点">
					<Select
					disabled={this.state.disable}
					style={{ width: 285 }}
					value={this.state.web}
					onChange={(e)=>{this.setState({web:e})}}>
						{children}
				 </Select>
					</FormItem>

					<FormItem  label="年龄" {...formItemLayout}>
						<Input disabled={this.state.disable} value={27} />
					</FormItem>

					<FormItem label="出生日期" {...formItemLayout}>
						<DatePicker/>
					</FormItem>

					<FormItem label="健康状况" {...formItemLayout}>
						<Input disabled={this.state.disable} value={this.state.health} />
					</FormItem>
				</Form>
				</Col>
			</Row>

			<Row>
				<Col>
					<FormItem {...buttonItemLayout}>
						{Buttons}
					</FormItem>
				</Col>
			</Row>

			</div>
		);
	}
}
