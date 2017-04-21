import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,Popconfirm,message} from 'antd';
import {Link,browserHistory,router} from 'react-router';
import AddStandardModal from './AddStandardModal.js'
import HTTPService from './../../Utils/HTTPService'
import SecondStandardModal from './SecondStandardModal.js'
const FormItem = Form.Item;
let httpService = new HTTPService();
const dictString = "STATUS:USER_STATUS|LEADER:LEADER_STATUS|MANAGE:MANAGE_STATUS|GENDER:GENDER";
const data = [];


export default class StandardManage extends Component {
	constructor(props){
		super(props);
		this.propsData=this.props.location.state;
        //console.log(this.propsData.username)
        this.state = {
            data: [],
            dataSource : [],
            selectedRowKeys: [], 
            loading: false,
        }

        this.columns = [
            {
                title: '一类检查指标',
                dataIndex: 'chckna',
                key: 'chckna'
            },{
                title: '得分占比',
                dataIndex: 'percet',
                key: 'percet',
                render: (text, record, index) => (<span>{record.percet}%</span>)
            },{
                title: '操作',
                key: 'operation',
                width: "30%",
                render: (text, record, index) => (
                    <span>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={this.checkInfo.bind(this, record)}
                            disabled={false}>
                            管理二类指标
                        </Button>
                    </span>
                )
            }
        ];
	}

    checkInfo(record){
        this.secondStandardModal.openModal(record,this.getList.bind(this));
    }

    inputPercet(val,record){
        record.percet = val;
    }

	componentDidMount(){
		//console.log(this.propsData)
        // var input={
        //     pgsize:10
        // }
        this.getList();
	}

    getList(){
        this.setState({
            loading:true
        })
        let self = this;
        let tranCode="bankCheckConfig/getCheckOption"
        let dictString = dictString;
        let input = {};
        input.DICTMAP = dictString;
        input.tarttp = '01'; //网点的


        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            console.log(obj);
            //console.log(listnm)
            // self.setState({
            //     dataSource:listnm
            // })
            self.setState({
                loading:false
            })
            self.processDate(obj);
        },function(obj){
            self.setState({
                loading:false
            })
        },function(){

        })
    }

    processDate(data){
        let listnm = data.listnm.slice(0);//[...data.listnm];
        console.log(listnm);

        let tempArr,
        selectArr = [];
        tempArr = listnm.map((value,index)=>{
            value.key = index;
            value.chckna = value.CHCKNA;
            value.chcktp = value.CHCKTP;
            value.percet = value.PERCET;
            value.status = value.STATUS;
            if(value.status == "1"){
                selectArr.push(index);
            }

            return value;
        })
        
        console.log(selectArr);

        this.setState({
            dataSource:tempArr,
            //selectedRowKeys:selectArr
        })
    }


    onSelectChange(selectedRowKeys,selectedRows){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    addStandard(){
        this.addStandardModal.openModal(this.getList.bind(this));
    }


    _handleDelete(){
        let self = this;
        let checkedList = this.state.selectedRowKeys;
        if(checkedList.length == 0){
            message.error("请选择删除项");
            return;
        }
        Modal.confirm({
            title:"确定删除选中项吗？",
            onOk() {
                //console.log('OK');
                self._handleBatch(); //删除
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }

    _handleBatch(){
        let self = this;
        let checkedList = this.state.selectedRowKeys;
        let dataSource = this.state.dataSource;

        let count = 0;
        let arrLen = checkedList.length;
        for(let i=0;i<checkedList.length;i++){
            let index = checkedList[i];
            count++;
            //tempArr.push(dataSource[index]);
            this.deleteOption(dataSource[index],count,arrLen);
        }
   
    }

    deleteOption(item,count,arrLen){
        let self = this;
        this.setState({ loading: true });

        let tranCode = "bankTargetFirst/delCheckOption";
        let input = {
            DICTMAP:dictString,
            chcktp:item.chcktp,
        }

        httpService.commHttp(tranCode,input,function(obj){
            console.log(obj);
            
            if(count == arrLen){ //全部删除后 执行刷新
                self.getList();
                self.setState({ loading: false,selectedRowKeys:[] });
                message.success("删除成功")
            }
        },function(obj){
            message.error(obj);
        },function(){

        })
    }
 
	render(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };

		return(

	   		<div style={{margin: '0 20px 0'}}>

                <div style={{marginBottom:20}}>
                    
                    <Button type="primary" onClick={this.addStandard.bind(this)} icon="file-add">添加</Button>  
                                        
                    <Button type="danger" style={{marginLeft:10}} onClick={()=>this._handleDelete()} icon="delete">删除</Button>  
                    
                </div>
  

                <Row>
                    <Table 
                        rowSelection={rowSelection}
                        columns={this.columns} 
                        dataSource={this.state.dataSource} 
                        className="w80"
                        pagination = {false}
                        loading={this.state.loading}
                        rowKey={record => record.key}
                        bordered={true}
                        />
                </Row>   

               <AddStandardModal addType="1" title = "添加一类指标" ref={(ref) => this.addStandardModal = ref} />   

               <SecondStandardModal ref={(ref) => this.secondStandardModal = ref}/>

			</div>


		)
	}

}






