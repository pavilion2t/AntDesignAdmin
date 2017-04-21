import React,{Component} from 'react';
import { Table, Icon,Form, Input, Tooltip,Popconfirm,Modal,
	Pagination, Radio, Select, Row, Col, Checkbox, Button,DatePicker } from 'antd';
const wellStyles = {margin: '0 20px'};
import "../../../css/table.css"
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;
const Option = Select.Option;

export default class PersonFundamentalData extends Component {
	constructor() {
		super();
		this.state = {
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
		 this.userid=this.props.userid;
		 this.query();
	 }

	query(){
				let self = this;
				let tranCode="queryUser/getUserBasic"
				var input={
				"userid":self.userid,
			}
			HTTP.commHttp(tranCode,input,function(obj){
				let listnm = obj.listnm[0];
				self.setState({
					userid:listnm.USERID,
					roleid:listnm.ROLEID,
					leveltp:listnm.LEVELTP,
					name:listnm.COUPLENAME,
					joindt:listnm.JOINDT,
					email_company:listnm.EMAIL_COMPANY,
					email_personal:listnm.EMAIL_PERSONAL,
					qq:listnm.QQ_ID,
					wechat:listnm.WECHAT,
					address:listnm.ADDRESS,
					tel:listnm.TELEPHONE,
					cp:listnm.COUPLENAME,
					idtfno:listnm.IDTFNO,
					sibling:listnm.CHILDSTATUS,
					hasrelative:listnm.HASRELATIVE,
					social:listnm.CARDNO1,
				})

			},function(obj){
        console.log(obj);
			},function(){

			})
	}

	handleChange(){

	}


	render() {
		const { formLayout } = this.state;
		{/*labelCol是左边标签，wrapperCol是右边内容*/}
		const formItemLayout = {labelCol: { span: 4 },wrapperCol: { span: 14 },};
		const buttonItemLayout = {wrapperCol: { span: 14, offset: 4 },};

		return (
			<div>
			<Row>
				<Col span={10}>
						<Form layout={formLayout}>

							<FormItem  label="人事编码" {...formItemLayout}>
								<Input placeholder={this.state.userid} />
							</FormItem>

							<FormItem label=" 行政级别" {...formItemLayout}>
								<Select onChange={this.handleChange}>
									<Option value="one">IIAG产品一部</Option>
									<Option value="two">IIAG产品二部</Option>
								</Select>
							</FormItem>

							<FormItem  label="在职状态" {...formItemLayout}>
								<Select onChange={this.handleChange}>
									<Option value="one">男</Option>
									<Option value="two">女</Option>
								</Select>
							</FormItem>

							<FormItem label="公司邮箱" {...formItemLayout}>
								<Input placeholder={this.state.email_company} />
							</FormItem>

							<FormItem  label="常用QQ" {...formItemLayout}>
								<Input placeholder={this.state.qq} />
							</FormItem>

							<FormItem label="家庭住址" {...formItemLayout}>
								<Input placeholder={this.state.address} />
							</FormItem>

							<FormItem  label="配偶姓名" {...formItemLayout}>
								<Input placeholder={this.state.cp} />
							</FormItem>

							<FormItem  label="子女情况" {...formItemLayout}>
								<Input placeholder={this.state.sibling} />
							</FormItem>

							<FormItem  label="工资卡号" {...formItemLayout}>
								<Input placeholder={this.state.idcard} />
							</FormItem>

							<FormItem  label="工龄" {...formItemLayout}>
								<Input placeholder={this.state.idcard} />
							</FormItem>

						</Form>
				</Col>

				<Col span={10}>
				<Form layout={formLayout}>

					<FormItem  label="岗位类型" {...formItemLayout}>
						<Input placeholder={this.state.name} />
					</FormItem>

					<FormItem label="专业级别" {...formItemLayout}>
						<Input placeholder={this.state.leveltp} />
					</FormItem>

					<FormItem  label="入职日期" {...formItemLayout}>
						<Input placeholder="20121202" />
					</FormItem>

					<FormItem label="个人常用邮箱" {...formItemLayout}>
						<Input placeholder={this.state.email_personal} />
					</FormItem>

					<FormItem label="常用微信" {...formItemLayout}>
						<Input placeholder="13429878" />
					</FormItem>

					<FormItem label="家庭联系电话" {...formItemLayout}>
						<Input placeholder="18688666688" />
					</FormItem>

					<FormItem label="配偶身份证" {...formItemLayout}>
						<Input placeholder="421321188909092231" />
					</FormItem>

					<FormItem label="是否有亲属在本行" {...formItemLayout}>
						<Select onChange={this.handleChange}>
							<Option value="one">没有</Option>
							<Option value="two">有</Option>
						</Select>
					</FormItem>

					<FormItem label="社保卡号" {...formItemLayout}>
						<Input placeholder="32321123" />
					</FormItem>
				</Form>
				</Col>
			</Row>

			<Row>
				<Col>
					<FormItem {...buttonItemLayout}>
						<Button type="primary" size="large">编辑</Button>
					</FormItem>
				</Col>
			</Row>

			</div>
		);
	}
}
