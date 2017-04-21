import React,{Component} from 'react';
import { Table, Icon,Form, Input, Tooltip, Radio, Select, Row, Col, Checkbox, Button } from 'antd';
const wellStyles = {margin: '0 20px'};
import "../../css/table.css"
import HTTPService from '../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;

const columns = [
	{title: '设备编号',  dataIndex: 'DEVINO',key: 'DEVINO',},
	{title: '设备类型', dataIndex: 'DEVITP',key: 'DEVITP',},
  {title: '所属网点',dataIndex: 'BRCHNA',key: 'BRCHNA',},
	{title: '状态',dataIndex: 'STATUS',key: 'STATUS',},
	{title: '设备地址',dataIndex: 'ADDRES',key: 'ADDRES',},
	{title: '责任人',dataIndex: 'MANAGER',key: 'MANAGER',},
	{ title: '操作',  key: 'action',render: (text, record) => (
     <span>
       <a href="#">修改</a>
       <span className="ant-divider" />
       <a href="#">删除</a>
     </span>
   ),}
];


export default class manageDevice extends Component {
	constructor(props){
		super(props);
		this.state={
			value:"",
			dataSource:[],
			brchesArr:[],
			brchno:"",
			pagination: {current:1,showTotal : total => `共有 ${total} 条`,showSizeChanger:true,showQuickJumper:true,},
		}

	}

	componentDidMount() {
		this.queryBrch();
	}

	//查询网点
	queryBrch(){
		let self = this;
		let tranCode="queryBranch/brchQuery"
		var input={
			"BRCHNA":"",
			"cityno":""
		}
		this.setState({loading:true});
		HTTP.commHttp(tranCode,input,function(data){
			let listnm = data.listnm;
			//console.log(data)
			self.setState({
				brchesArr:listnm,
				loading:false
			});
		},function(e){
			Modal.error({
				title: '查询网点失败',
				content:e,
				onOk:()=>{self.setState({loading:false})}
			});
		})
	}

	changePage(key){
		this.pgnum=key;
		this.query();
	}
	query(){
		let self = this;
		let tranCode="queryVTM/getDeviceInfo"
		var input={
			"devino":"",
			"devitp":"",
			"brchno":this.state.brchno,
			"cityno":"",
		}
		this.setState({loading:true});
		HTTP.commHttp(tranCode,input,function(data){
			let listnm = data.listnm;
			for(let i=0;i<listnm.length;i++){
				if(listnm[i].STATUS=="1"){
					listnm[i].STATUS="正常"
				}
			}
      self.setState({
				dataSource:listnm,
				loading:false
			})
		},function(e){
			Modal.error({
				title: '查询失败',
				content:e,
				onOk:()=>{self.setState({loading:false})}
			});
		})
	}

	render(){
		var Brches=this.state.brchesArr.map((value,index)=>{
      return (
         <Option key={index} value={value.key}>{value.value}</Option>
      )
    });
		return(
	       <div style={wellStyles} >
					 <table>
						<tbody>
							<tr >
							<td className="leftPadding">设备类型：</td>
							<td>
										<Select defaultValue="全部" style={{ width: 150 }}>
											<Option value="">全部</Option>
								      <Option value="1">ATM</Option>
								      <Option value="2">VTM</Option>
					         </Select>
			        </td>
							<td className="leftPadding">所属网点：</td>
							<td>
									<Select value={this.state.brchno} onChange={(e)=>{this.setState({brchno:e})}} style={{ width: 150 }}>
										<Option value="">全部</Option>
										{Brches}
									</Select>
			        </td>
							<td className="leftPadding">设备状态：</td>
							<td>
										<Select defaultValue="全部" onChange={(e)=>{this.setState({website:e})}} style={{ width: 150 }}>
											<Option value="">全部</Option>
								      <Option value="1">正常</Option>
					         </Select>
			        </td>
							<td className="leftPadding"><Button type="primary" onClick={()=>this.query()}>查询</Button></td>

							</tr>
            </tbody>

						</table>

            <div style={{height:10}}></div>
            <Table
							columns={columns}
							loading={this.state.loading}
							pagination={this.state.pagination}
							dataSource={this.state.dataSource}/>
			  </div>
		)
	}
}
