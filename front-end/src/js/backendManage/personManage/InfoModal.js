import React,{Component} from 'react';
import { Table, Icon,Form, Input, Tooltip,Popconfirm,Modal,message,
	Pagination, Radio, Select, Row, Col, Checkbox, Button } from 'antd';
const wellStyles = {margin: '0 20px'};
import "../../../css/table.css"
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;
const Option = Select.Option;
let children = [];
let children2 = [];
let children3 = [];

  class RegistrationForm extends Component{
		  constructor(props){
				super(props);
				this.BranchKey=[];
				this.BranchValue=[];
				this.RoleKey=[];
				this.RoleValue=[];
				this.DepartmentKey=[];
				this.DepartmentValue=[];
				this.state={
					website:"",
          job:"",
					department:"",
				}
			}

			componentDidMount(){
					 this.queryBranch();
					 this.queryRole();
					 this.queryDepartment();
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

		 queryRole(){
			 //queryRole
					let self = this;
					let tranCode="queryUser/roleQuery"
					var input={
					"ROLEID":"",
					"ROLENA":"",
				}
				HTTP.commHttp(tranCode,input,function(data){
					let list = data.listnm;
					for(let i=0;i<list.length;i++){
						self.RoleKey.push(list[i].key);
						self.RoleValue.push(list[i].value);
				//将所有role传入选择器组件
						children2.push(<Option key={self.RoleKey[i]}>{self.RoleValue[i]}</Option>);
					}
				},function(obj){

				},function(){

				})
		 }

		 queryDepartment(){
			 //queryDepartment
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

			render(){
				const { getFieldDecorator } = this.props.form;
				const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

				return(
					<Form>
					  <FormItem {...formItemLayout}	label="用户姓名" hasFeedback>
								{getFieldDecorator('name', {
		            rules: [{ required: true, message: '请输入正确格式的姓名', whitespace:false,pattern:/[\u4E00-\u9FA5]/, }]
		          })(
		            <Input />
		          )}
						</FormItem>

						<FormItem {...formItemLayout}	label="手机号码" hasFeedback>
								{getFieldDecorator('tel', {
								rules: [{ required: true, message: '请输入正确格式的手机号码', whitespace:false,pattern:/^1(3|4|5|7|8)\d{9}$/, }]
							})(
								<Input />
							)}
						</FormItem>

						<FormItem {...formItemLayout}	label="电子邮件" hasFeedback>
						{getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: '请输入正确格式的E-mail',
            }],
          })(
            <Input />
          )}
						</FormItem>

						<FormItem {...formItemLayout}
							label={(
						             <span>
						               生日&nbsp;
						               <Tooltip title="格式：YYYYMMDD，例如:19930901">
						                 <Icon type="question-circle-o" />
						               </Tooltip>
						             </span>
						           )}
						   >
							 {getFieldDecorator('birth', {
							 rules: [{ required: true, message: '请输入生日', whitespace:false,}]
						 })(
							 <Input />
						 )}
						</FormItem>

						<FormItem {...formItemLayout}	label="性别">
						  <Select initialValue="female">
								<Option value="male">男</Option>
								<Option value="female">女</Option>
							</Select>
						</FormItem>

						<FormItem {...formItemLayout}
							label={(
						             <span>
						               所在城市&nbsp;
						               <Tooltip title="例如:广东-深圳">
						                 <Icon type="question-circle-o" />
						               </Tooltip>
						             </span>
						           )}
						   >
							 {getFieldDecorator('city', {
							 rules: [{ required: true, message: '请输入城市', whitespace:false,}]
						 })(
							 <Input />
						 )}
						</FormItem>

						<FormItem {...formItemLayout}	label="所属部门">
						{getFieldDecorator('dept', {
						rules: [{ required: true, message: '请选择所属部门', whitespace:false,}]
					})(
						<Select
					  style={{ width: 285 }}
						setFieldsValue={this.state.department}>
							{children3}
					 </Select>
					)}
						</FormItem>

						<FormItem {...formItemLayout}	label="所在网点">
						{getFieldDecorator('web', {
						rules: [{ required: true, message: '请选择所在网点', whitespace:false,}]
					})(
						<Select
						 setFieldsValue={this.state.website}
						 style={{ width: 285 }}>
							{children}
					 </Select>
					)}
						</FormItem>

						<FormItem {...formItemLayout}	label="员工类型">
						{getFieldDecorator('type', {
						rules: [{}]
					})(
						<Select initialValue="正式" style={{ width: 285 }}>
						 <Option value="">正式</Option>
					   </Select>
					)}
						</FormItem>

						<FormItem {...formItemLayout}	label="岗位名称">
						{getFieldDecorator('occupation', {
						rules: [{ required: true, message: '请选择岗位名称', whitespace:false,}]
					})(
						<Select
						initialValue="全部" style={{ width: 285 }}
						setFieldsValue={this.state.job}>
							{children2}
					 </Select>
					)}
						</FormItem>
					</Form>
				)
			}
	}

	const WrappedRegistrationForm = Form.create()(RegistrationForm);

	export default class InfoModal extends Component {
			constructor(props){
				super(props);
				this.data=[];
			  this.state = {
					 visible: false,
				 }
			}
			showModal(){
				this.setState({
					visible: true,
				});
			}

			handleOk (e) {
				this.data = this.obj.getFieldsValue();
				console.log(this.data);	
        let self =this;
				let tranCode="queryUser/saveBankUser"
				var input={
				"userna":this.data.name,
				"mobile":this.data.tel,
				"e_mail":this.data.email,
				"borndt":this.data.birth,
				"gender":"",
				"cityno":this.data.city,
				"deptno":this.data.dept,
				"brchno":this.data.web,
				"usstyle":"",
				"usrole":this.data.occupation,
				"pingyna":"",

			}
			HTTP.commHttp(tranCode,input,function(data){

				self.setState({
					visible: false,
					website:"",
					job:"",
					department:"",
				});
        message.success("添加成功！");
			},function(obj){
        message.error(obj);
			},function(){

			})

			}
			handleCancel (e){
				console.log(e);
				this.setState({
					visible: false,
				});
			}
			render() {

				return (
					<div>
						<Modal title="新增用户" visible={this.state.visible}
							onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()}>
                <WrappedRegistrationForm ref={(ref)=>this.obj = ref}/>
						</Modal>
					</div>
				);
			}
}
