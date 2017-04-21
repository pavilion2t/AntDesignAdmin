import React,{Component} from 'react';
import {Link,browserHistory} from 'react-router';
import { Table, Icon,Form, Input, Tooltip,Popconfirm,Modal,
	Pagination, Radio, Select, Row, Col, Checkbox, Button } from 'antd';
const wellStyles = {margin: '0 20px'};
import "../../../css/table.css"
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;
import InfoModal from './InfoModal';
const Option = Select.Option;
let children = [];
let children2 = [];

export default class ManagePerson extends Component {
	constructor(props){
		super(props);
		this.pgnum=1;
		this.userid=[];

		this.BranchKey=[];
		this.BranchValue=[];

		this.RoleKey=[];
		this.RoleValue=[];
		this.columns = [
			{title: '行员编号',  dataIndex: 'BRCHNO',key: 'BRCHNO',},
			{title: '姓名', dataIndex: 'USERNA',key: 'USERNA',},
		  {title: '所在网点',dataIndex: 'BRCHNA',key: 'BRCHNA',},
			{title: '员工类型',dataIndex: 'ROLETP',key: 'ROLETP',},
			{title: '岗位名称',dataIndex: 'ROLENA',key: 'ROLENA',},
			{title: '性别',dataIndex: 'GENDER',key: 'GENDER',},
			{title: '电话',dataIndex: 'MOBILE',key: 'MOBILE',},
			{title: '操作',dataIndex: 'operation',render: (text, record, index) => {
					 return (
						<span>
						 <Button  onClick={() => this.CheckInfo(record)}>
							 查看
						 </Button>
					   <span className="ant-divider" />
						 <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(index)}>
               删除
						 </Popconfirm>
						</span>
						 );},}
		];
		this.state={
			value:"",
			dataSource:[],
			total:0,
			visible:false,
			website:"",
			job:"",
			name:"",
		}

	}

	 componentDidMount(){
			  this.query();
				this.queryBranch();
				this.queryRole();
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

		onDelete(index){
			const dataSource = [...this.state.dataSource];
	    dataSource.splice(index, 1);
	    this.setState({ dataSource });

			let tranCode="queryUser/deleteUser"
			var input={
			"USERID":this.userid[index],
		  }
			HTTP.commHttp(tranCode,input,function(obj){
					},function(obj){
					},function(){
					})
		}

		CheckInfo(record){
			browserHistory.push({pathname:"/home/CheckInfo",state:{title:"行员个人信息",person:record}})
		}

    addPerson(){
			this.InfoModal.showModal();
		}

		query(){
					let self = this;
				  let tranCode="queryUser/queryUser"
				  var input={
					"USERID":"",
					"USERNA":this.state.name,
					"DEPTNO":"",
					"BRCHNO":this.state.website,
					"ROLETP":"",
					"ROLEID":this.state.job,
					"PAGESIZE":"10",
					"PAGENUM":this.pgnum.toString(),
				}
				HTTP.commHttp(tranCode,input,function(obj){
					let listnm = obj.listnm;
					for(let i=0;i<listnm.length;i++){
						self.userid.push(listnm[i].USERID);
						if(listnm[i].GENDER=="0"){
							listnm[i].GENDER="女"
						}else if(listnm[i].GENDER=="1"){
							listnm[i].GENDER="男"
						}
					}
           self.setState({
						 dataSource:listnm,
						 total:parseInt(obj.TOTAL),
					 })

				},function(obj){

				},function(){

				})
		}

		changePage(key){
			this.pgnum=key;
      this.query();
		}

	render(){
		const columns = this.columns;

		return(
	       <div style={wellStyles} >
					 	<table>
							<tbody>
							<tr >
							<td className="leftPadding">用户姓名：</td>
							<td><Input  placeholder="请输入用户姓名" onChange={(e)=>{this.setState({name:e.target.value})}}/></td>
							<td className="leftPadding">所在网点：</td>
							<td>
										<Select
										 value={this.state.website}
										 onChange={(e)=>{this.setState({website:e})}}
										 style={{ width: 150 }}>
										 <Option value="">全部</Option>
										  {children}
					         </Select>
			        </td>
							<td className="leftPadding">
							   <Button icon="plus-circle-o" type="primary" onClick={()=>this.addPerson()}>新增</Button></td>
							</tr>

							<tr>
							<td className="leftPadding">员工类型：</td>
							<td>
										<Select defaultValue="全部" style={{ width: 150 }}>
	                    <Option value="">全部</Option>
					         </Select>
			        </td>
							<td className="leftPadding">岗位名称：</td>
							<td>
										<Select
										defaultValue="全部" style={{ width: 150 }}
										value={this.state.job}
										onChange={(e)=>{this.setState({job:e})}}>
										  <Option value="">全部</Option>
								      {children2}
					         </Select>
			        </td>
							<td className="leftPadding">
							<Button type="primary" icon="search" onClick={()=>this.query()}>查询</Button></td>
							</tr>
							</tbody>
						</table>

            <div style={{height:10}}></div>
            <Table
						columns={columns}
						dataSource={this.state.dataSource}
						pagination={false}
						/>

						<div style={{padding:10,float:"right"}}>
						<Pagination total={this.state.total} onChange={(key)=>this.changePage(key)}/>
            </div>

						<InfoModal ref={(ref)=> this.InfoModal = ref}/>
			  </div>
		)
	}
}
