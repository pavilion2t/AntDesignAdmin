import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,Checkbox,message,Popconfirm} from 'antd';
import HTTPService from './../../Utils/HTTPService'
import AddStandardModal from './AddStandardModal.js'
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
let httpService = new HTTPService();
const dictString = "STATUS:USER_STATUS|LEADER:LEADER_STATUS|MANAGE:MANAGE_STATUS|GENDER:GENDER"

export default class SecondStandardModal extends Component {
    constructor(props){
        super(props);

        this.columns = [
            {
                title: '二类检查指标',
                dataIndex: 'ITEMNA',
                key: 'ITEMNA'
            },{
                title: '操作',
                key: 'operation',
                render: (text, record, index) => (
                    <span>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={this.deleteOne.bind(this, record)}
                            disabled={false}>
                            删除
                        </Button>
                    </span>
                )
            }
        ];

        this.state = {
            selectedRowKeys:[],
            loading: false,
            visible: false,
            chckna:"",
            percet:""
        }
    }


    openModal(record,callback){

        this.getList(record.chcktp);
        this.record = record;
        this.setState({
            visible:true
        })

        if(callback){

            this.callback = callback;
        }
    }

    handleCancel(){
        this.setState({
            visible:false,
            selectedRowKeys:[]
        })
    }

    // 删除单条数据
    deleteOne(record){
        this.deleteOption(record,1,1);
    }

    getList(chcktp){
        this.setState({
            loading:true
        })
        let self = this;
        let tranCode = "bankCheckConfig/getCheckOptionItem";

        let input = {};
        input.DICTMAP = dictString;
        input.chcktp =  chcktp;
        // var rows = $("#dataTable").datagrid('getRows');
        // var chcktp = rows[index].CHCKTP;
        console.log(input)

        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            console.log(obj);
            //console.log(listnm)
            // self.setState({
            //     dataSource:listnm
            // })
            self.processDate(obj.listnm);
        },function(obj){
            message.error(obj);
        },function(){

        })
    }

    processDate(data){

        for(let i=0;i<data.length;i++){
            data[i].key = i;
        }
        this.setState({
            // options:checkArr,
            // checkedList:checkedList,
            dataSource:data,
            loading:false
        });
    }


    onSelectChange(selectedRowKeys,selectedRows){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    addStandard(){
        let record = this.record;
        this.addStandardModal.openModal(this.getList.bind(this),record);
    }

    // 批量删除事件
    _handleBatch(){
        let self = this;
        let checkedList = this.state.selectedRowKeys;//
        let dataSource = this.state.dataSource;
        if(checkedList.length == 0){
            message.error("请选择删除项");
            return;
        }


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

        let tranCode = "bankTargetFirst/delCheckSec";
        let input = {
            DICTMAP:dictString,
            chcktp:item.CHCKTP,
            itemtp:item.ITEMTP,
        }

        httpService.commHttp(tranCode,input,function(obj){
            console.log(obj);
            
            if(count == arrLen){
                self.getList(item.CHCKTP);
                self.setState({ loading: false,selectedRowKeys:[] });
                message.success("删除成功")
            }
        },function(obj){
            message.error(obj);
        },function(){

        })
    }
 
    render() {

        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };

        return (
        <div>
            <Modal
            visible={this.state.visible}
            title={this.props.title}
            onOk={this.handleOk}
            width = {600}
            onCancel={this.handleCancel.bind(this)}
            footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>关闭</Button>,
            ]}
            >
 
                <div style={{marginBottom:20}}>
                    
                    <Button type="primary" size="small" onClick={this.addStandard.bind(this)} icon="file-add">添加</Button>  
                    
                
                    <Popconfirm title="确定要删除吗？"  onConfirm={()=>this._handleBatch("1")} okText="确定" cancelText="取消">
                        <Button type="danger" size="small"  style={{marginLeft:10}} icon="delete">删除</Button>  
                    </Popconfirm>
                </div>
                 
                <Table 
                    rowSelection={rowSelection}
                    columns={this.columns} 
                    size="small"    
                    dataSource={this.state.dataSource} 
                    pagination = {false}
                    loading={this.state.loading}
                    rowKey={record => record.key}
                    bordered={true}
                    />
                 
                <AddStandardModal addType="2" title = "添加二类指标" ref={(ref) => this.addStandardModal = ref} />   

            </Modal>
        </div>
        );
    }
}