import React,{Component} from 'react';
import { Table, Icon,Form, Input, Select, Row, Col, Button,Modal } from 'antd';
const wellStyles = {margin: '0 20px'};
import {browserHistory} from 'react-router';
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;
const Option = Select.Option

export default class BranchManage extends Component {
	constructor(props){
		super(props);
		this.state={
			value:"",
			dataSource:[],
			loading:false,
			provinceArr:[],
			cityArr:[],
			provin:"",
			city:"",
			brchna:"",
			pagination: {current:1,showTotal : total => `共有 ${total} 条`,showSizeChanger:true,showQuickJumper:true},
		}
		this.columns = [
										{title: '网点编号',  dataIndex: 'key',key: 'key',},
										{title: '网点名称', dataIndex: 'value',key: 'value',render: text => <a href="#">{text}</a>,},
										{title: '所在城市',dataIndex: 'CITYNA',key: 'CITYNA',},
										{title: '网点地址',dataIndex: 'ADDRES',key: 'ADDRES',},
										{title: '状态',dataIndex: 'STATUS',key: 'STATUS',render:(text)=>(
											<p>正常</p>
										)},
										{ title: '操作',  key: 'action',render: (text, record) => (
											<div>
                           <Button type="primary" onClick={this._edit.bind(this,text)}> 
                              查看
                           </Button>
											</div>
										)}
];

	}
	componentDidMount() {
		this.query();
	}
//查询网点
		query(){
			let self = this;
			let tranCode="queryBranch/brchQuery"
			var input={
				"BRCHNA":this.state.brchna,
				"cityno":this.state.city
			}
			this.setState({loading:true})
			HTTP.commHttp(tranCode,input,function(data){
				let listnm = data.listnm;
				//console.log(data)
					self.setState({
						dataSource:listnm,
						loading:false
					});
					self.queryProv()
			},function(e){
				 Modal.error({
					title: '查询失败',
					content:e,
					onOk:()=>{self.setState({loading:false})}
			});
			})
		}
//查城市
	queryProv(){
			let self = this;
			let tranCode="queryUser/provinceQuery"
			var input={}
			HTTP.commHttp(tranCode,input,function(data){
		
				self.setState({
					provinceArr:data.listnm
				})
			},function(e){
				 Modal.error({
					title: '查询失败',
					content:e,
				});
			})
	}
	queryCity(e){
		let self = this;
		let tranCode="queryUser/cityQuery"
		var input={"PRVCCD":e}
		HTTP.commHttp(tranCode,input,function(data){
			
			self.setState({
				provin:e,
				cityArr:data.listnm,
				city:data.listnm[0].key
			})
			
		},function(e){
				 Modal.error({
					title: '查询失败',
					content:e,
				});
		})
	}

	_edit(text){
		browserHistory.push({pathname:"/home/BranchBase",state:{title:"网点信息",branch:text}})
	}

	render(){
		var Provinces=this.state.provinceArr.map((value,index)=>{
      return (
         <Option key={index} value={value.key}>{value.value}</Option>
      )
    });
		var Citys = this.state.cityArr.map((value,index)=>{
      return (
         <Option key={index} value={value.key}>{value.value}</Option>
      )
    });
		return(
	       <div style={wellStyles} >
               <Row>
                    <Form layout="inline">
                        <Col className="gutter-row" span={10}>
                            <FormItem label="城市"> 
																<Select value={this.state.provin}  onChange={(e)=>{this.queryCity(e)}} style={{ width: 100 }}>
																		{Provinces}
																</Select>
																<Select value={this.state.city}  onChange={(e)=>{this.setState({city:e})}} style={{ width: 100,marginLeft:5 }}>
																		{Citys}
																</Select>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <FormItem label="网点名称">
                              <Input value={this.state.brchna} onChange={(e)=>{this.setState({brchna:e.target.value})}}  placeholder="请输入网点名称" />
                            </FormItem>
                        </Col>
                       <Col className="gutter-row" span={4}>
                            <Button type="primary" icon="search" onClick={()=>this.query()}>查询</Button>
                       </Col>
                        
                    </Form>
               </Row>

            <div style={{height:20}}></div>
            <Table 
							columns={this.columns} 
							loading={this.state.loading} 
							bordered
							pagination={this.state.pagination}
							dataSource={this.state.dataSource} />
			  </div>
		)
	}
}
