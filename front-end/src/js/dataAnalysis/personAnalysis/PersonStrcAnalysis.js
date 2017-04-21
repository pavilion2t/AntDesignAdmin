import React, { Component, PropTypes } from 'react'
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,message} from 'antd';
import HTTPService from './../../Utils/HTTPService'
import {LineChart, Line, XAxis, YAxis, CartesianGrid,Scatter, Tooltip, Legend,BarChart,Bar} from 'recharts';
const FormItem = Form.Item;
const Option = Select.Option;
let HTTP = new HTTPService();

class PersonStrcAnalysis extends Component {
    constructor(props){
        super(props);
        this.data = [
                {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
                {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
                {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
                {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
                {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
                {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
        ];
		this.state={
			brchnoList:[],
			brchno:""
		}
    }
	componentDidMount () {
		this.queryBrch()
	}
	queryBrch(){
		let self = this;
		let tranCode="queryUser/brchQuery";
		var input={};
		HTTP.commHttp(tranCode,input,function(obj){
			console.log(obj)
			let listnm = obj.listnm;
			let newList=[]
			for(var i=0;i<listnm.length;i++){
				var newObj={};
				newObj.key=listnm[i].key;
				newObj.value=listnm[i].value;
				newList.push(newObj)
			}
			self.setState({
				brchnoList:newList,
				brchno:newList[0].key
			})
		},function(e){
			Modal.error({
				title: '查询失败',
				content:e,
	
			});
		})
	}

	_queryList(){

	}


    render () {
		var brchList=this.state.brchnoList.map((value,index)=>{
			return(
				<Option key={index} value={value.key}>{value.value}</Option>
			)
		})
        return (
			<div style={{margin:"0 20px"}}>
				
				<Row style={{margin:"10px 0 20px 0"}}>
					<Form layout="inline">
						
						<Col className="gutter-row" span={18}>
							<FormItem label="选择网点">
								<Select value={this.state.brchno} onChange={(e)=>{this.setState({brchno:e})}} style={{ width: 180 }} >
									{brchList}
                                </Select>
							</FormItem>
						</Col>

						<Col className="gutter-row" span={6}>
							<Button type="primary" icon="search" onClick={()=>this._queryList()}>查询</Button>
						</Col>
						
					</Form>
               	</Row>
				<Row>
					<Col span={12}>   
								
						<LineChart height={250} width={400} data={this.data}
							margin={{top: 5, right: 10, left: 10, bottom: 5}}>
							<XAxis dataKey="name"/>
							<YAxis/>
							<CartesianGrid strokeDasharray="3 3"/>
							<Tooltip/>
							<Legend />
							<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
							<Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{r: 8}}/>
						</LineChart>
					</Col>
					<Col span={12}>
						<BarChart height={250} width={400} 
							margin={{top: 5, right: 10, left: 10, bottom: 5}}
							data={this.data}>
							<XAxis dataKey="name" />
							<YAxis />
							<Scatter isAnimationActive={true} />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Legend />
							<Bar dataKey="pv" fill="#8884d8" />
							<Bar dataKey="uv" fill="#82ca9d" />
						</BarChart>
					</Col>   
				</Row>

				<Row>
					<Col span={12}>   
								
						<LineChart height={250} width={400} data={this.data}
							margin={{top: 5, right: 10, left: 10, bottom: 5}}>
							<XAxis dataKey="name"/>
							<YAxis/>
							<CartesianGrid strokeDasharray="3 3"/>
							<Tooltip/>
							<Legend />
							<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
							<Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{r: 8}}/>
						</LineChart>
					</Col>
					<Col span={12}>
						<BarChart height={250} width={400} 
							margin={{top: 5, right: 10, left: 10, bottom: 5}}
							data={this.data}>
							<XAxis dataKey="name" />
							<YAxis />
							<Scatter isAnimationActive={true} />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Legend />
							<Bar dataKey="pv" fill="#8884d8" />
							<Bar dataKey="uv" fill="#82ca9d" />
						</BarChart>
					</Col>   
				</Row>
			</div>
        )
    }
}


export default PersonStrcAnalysis