import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,message} from 'antd';
import {Link,browserHistory,router} from 'react-router';
import WelcomePage from './../WelcomePage.js'
import AssignModal from './AssignModal.js'
import HTTPService from './../Utils/HTTPService'

const FormItem = Form.Item;
const Option = Select.Option;
let httpService = new HTTPService();

const data = [];


export default class DeviceProcessPage extends Component {
	constructor(props){
		super(props);
		this.propsData=this.props.location.state;
        //console.log(this.propsData.username)
        this.state = {
            dataSource : [],
            data: [],
            pagination: {
                showQuickJumper:true,
                size:"default",
                current:1,
                total:200,
                showTotal : total => `共有 ${total} 条`
            },
            loading: false,
        }

        this.columns = [{
                        title: '序号 ',
                        dataIndex: 'BROKID',
                        key: 'BROKID',
                        render: text => <a href="#">{text}</a>,
                        }, {
                        title: '设备编号 ',
                        dataIndex: 'DEVIID',
                        key: 'DEVIID',
                        }, {
                        title: '设备类型',
                        dataIndex: 'DEVITP',
                        key: 'DEVITP',
                        }, {
                        title: '所属网点',
                        dataIndex: 'BRCHNA',
                        key: 'BRCHNA',
                        }, {
                        title: '故障级别',
                        dataIndex: 'BROKLV',
                        key: 'BROKLV',
                        }, {
                        title: '故障描述',
                        dataIndex: 'CONTET',
                        key: 'CONTET',
                        width:"30%"
                        }, {
                        title: '状态',
                        dataIndex: 'STATUS',
                        key: 'STATUS',
                        }, {
                        title: '操作',
                        key: 'operation',
                        render: (text, record,index) => {
                            if(record.STATUS == "未处理"){
                                return(
                                        <span>     
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                onClick = {this.checkInfo.bind(this,index)}
                                                disabled={false}> 
                                                查看
                                            </Button>
                                            <Button
                                                style={{marginLeft:10}}
                                                type="primary"
                                                htmlType="submit"
                                                onClick={this.assignTask.bind(this,index)}
                                                disabled={false}> 
                                                
                                                指派
                                            </Button>
                                        </span>
                                        /*<EditableCell
                                            value={text}
                                            onChange={this.onCellChange(index, 'name')}
                                            />*/
                                    )
                            }
                            return(
                            <span>     
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick = {this.checkInfo.bind(this,index)}
                                    disabled={false}> 
                                    查看
                                </Button>

                            </span>
                            /*<EditableCell
                                value={text}
                                onChange={this.onCellChange(index, 'name')}
                                />*/
                        )},
                    }];
	}

    checkInfo(index){
        
        const dataSource = [...this.state.dataSource];
        let brokid = dataSource[index].BROKID;
        console.log("=============>brokid:"+brokid);
        //dataSource[index][]

        browserHistory.push({pathname:"/home/processDetail",state:{title:"设备故障详情",brokid:brokid}});
    }

    assignTask(index){
        let dataSource = [...this.state.dataSource];

        this.assignModal.openModal(dataSource[index]);
    }

    onCellChange(){

    }


    handleTableChange(pagination, filters, sorter) {
        console.log(12324);
        const pager = this.state.pagination;
        pager.current = pagination.current;
        console.log(pager)
        this.setState({
            pagination: pager,
        });
        // this.fetch({
        //     results: pagination.pageSize,
        //     page: pagination.current,
        //     sortField: sorter.field,
        //     sortOrder: sorter.order,
        //     ...filters,
        // });
    }

	componentDidMount(){
		//console.log(this.propsData)
        var input={
            pgsize:10
        }
        this.getDevList(input);
	}

    getDevList(input){
        let self = this;
        let tranCode="deviFailDeal/getDeviceList"

        this.setState({
            loading:true
        })

        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            //console.log(listnm)
            // self.setState({
            //     dataSource:listnm
            // })
            self.processDate(obj);
        },function(obj){
            message.error(obj);
        },function(){
            //message.error('This is a message of error');
        })
    }

    processDate(data){
        let listnm = data.listnm;
        //console.log(listnm)
        let tempArr = listnm.map((value,index)=>{
            if(value.DEVITP=="01"){ 
                value.DEVITP = "ATM";
            } else if(value.DEVITP == "02"){
                value.DEVITP = "VTM";
            } else if(value.DEVITP == "03"){
                value.DEVITP = "取号机";
            } else if(value.DEVITP == "04"){
                value.DEVITP = "预填单机";
            } else if(value.DEVITP == "05"){
                value.DEVITP = "柜面";
            } else {
                value.DEVITP = "移动网点管理";
            }
        
            if(value.STATUS=="2"){
                value.STATUS = "已解决";
            } else if(value.STATUS=="0"){
                value.STATUS = "未处理";
            } else if(value.STATUS=="1"){
                value.STATUS = "进行中";                
            } else if(value.STATUS=="3"){
                value.STATUS = "已删除";
            }

            if(value.BROKLV=="01"){
                value.BROKLV = "轻微";
            } else if(value.BROKLV=="02"){
                value.BROKLV = "一般";
            } else if(value.BROKLV=="03"){
                value.BROKLV = "严重";                
            } 
            
            value.deviid = value.DEVIID;

            return value;
        })
        console.log(tempArr);
        this.setState({
            loading:false,
            dataSource:tempArr
        })
    }

    handleSubmit(e){

    }

    queryList(){
        let devitp = this.state.devitp;
        let borklv = this.state.borklv;
        let status = this.state.status;
        let input = {
            devitp:devitp,
            borklv:borklv,
            status:status
        }
        console.log(input);
        this.getDevList(input);
    }

	render(){

		return(

	   		<div style={{margin: '0 20px 0'}}>

               <Row>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Col className="gutter-row" span={6}>
                            <FormItem label="设备类型：">
                                <Select defaultValue="全部" style={{ width: 150 }} onChange={(val)=> this.setState({devitp:val})}>
                                    <Option value="">全部</Option>
                                    <Option value="01">ATM</Option>
                                    <Option value="02">VTM</Option>
                                    <Option value="03">取号机</Option>
                                    <Option value="04">预填单</Option>
                                    <Option value="05">柜面</Option>
                                    <Option value="06">移动网点管理</Option>
                                </Select>

                            
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem label="故障级别：">

                                <Select defaultValue="全部" style={{ width: 150 }} onChange={(val)=> this.setState({borklv:val})}>
                                    <Option value="">全部</Option>
                    
                                    <Option value="01">轻微</Option>
                                    <Option value="02">一般</Option>
                                    <Option value="03">严重</Option>
                                </Select>
                        
                            </FormItem>
                        </Col>

                        <Col className="gutter-row" span={6}>
                            <FormItem label="状态：" onSubmit={this.handleSubmit.bind(this)} onChange={(val)=> this.setState({status:val})}>

                                <Select defaultValue="全部" style={{ width: 150 }} >
                                    <Option value="全部">全部</Option>
                                    <Option value="0">待处理</Option>
                                    <Option value="1">处理中</Option>
                                    <Option value="2">完成</Option>
                                </Select>
                            
    
                        
                            </FormItem>
                        </Col>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="button"
                                onClick={this.queryList.bind(this)}
                                disabled={false}> 
                               <Icon type="search" /> 查询
                            </Button>
                        </FormItem>
                        
                    </Form>
               </Row>

               <Row>
                    <Table 
                        columns={this.columns} 
                        dataSource={this.state.dataSource} 
                        style={{margin:'20px 0'}}
                        size="middle"
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange.bind(this)}
                        rowKey={record => record.BROKID}
                        bordered={true}
                        />
               </Row>   

               <AssignModal ref={(ref) => this.assignModal = ref} />   


			</div>


		)
	}

}




