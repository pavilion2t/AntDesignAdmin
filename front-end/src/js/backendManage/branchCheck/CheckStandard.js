import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,InputNumber,message} from 'antd';
import {Link,browserHistory,router} from 'react-router';
import WelcomePage from './../../WelcomePage.js'
import AssignModal from './../AssignModal.js'
import HTTPService from './../../Utils/HTTPService'
import StandardDetailModal from "./StandardDetailModal"

const FormItem = Form.Item;
const Option = Select.Option;
let httpService = new HTTPService();

const data = [];
const dictString = "STATUS:USER_STATUS|LEADER:LEADER_STATUS|MANAGE:MANAGE_STATUS|GENDER:GENDER";

export default class CheckStandard extends Component {
	constructor(props){
		super(props);
		this.propsData=this.props.location.state;
        //console.log(this.propsData.username)
        this.state = {
            data: [],
            dataSource : [],
            selectedRowKeys: [], 
            isEdit:false,
            loading: false,
        }

        this.columns = [
            {
                title: '一类检查指标',
                dataIndex: 'chckna',
                key: 'chckna',
                width: "20%"
            }, {
                title: '得分占比',
                dataIndex: 'percet',
                key: 'percet',
                render: (text, record, index) => (<InputNumber formatter={value => `${value.replace('%', '')}%`} className="w50" onChange={(value)=>this.inputPercet(value,record)} defaultValue={record.percet} disabled={!this.state.isEdit}/>)
            }, {
                title: '操作',
                key: 'operation',
                render: (text, record, index) => (
                    <span>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={this.checkInfo.bind(this, index)}
                            disabled={false}>
                                查看
                        </Button>
                    </span>
                )
            }
        ];        
	}

    onSelectChange(selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    checkInfo(index){
        let dataSource = [...this.state.dataSource];
        console.log(dataSource[index]);

        this.standardDetailModal.openModal(dataSource[index]);
    }

    inputPercet(val,record){
        record.percet = val;
        console.log(record);
    }

    onCellChange(){

    }

	componentDidMount(){
		//console.log(this.propsData)
        var input={
            pgsize:10
        }
        this.getList(input);
	}

    getList(){
        let self = this;
        let tranCode="bankCheckConfig/getCheckOption"
        let dictString = dictString;
        let data = {};
        data.DICTMAP = dictString;
        data.tarttp = '01'; //网点的


        httpService.commHttp(tranCode,data,function(obj){
            let listnm = obj.listnm;
            console.log(obj);
            //console.log(listnm)
            // self.setState({
            //     dataSource:listnm
            // })
            self.processDate(obj);
        },function(obj){

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
            selectedRowKeys:selectArr
        })
    }

    //编辑网点检查指标
    editStandard(){
        this.setState({
            isEdit:true
        })
    }
    // 取消编辑
    cancelEdit(){
        this.setState({
            isEdit:false
        })
    }

    onSelectChange(selectedRowKeys,selectedRows){
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    // 设置初始checkBox
    setCheckbox(record){
        
        //console.log('record : ', record);
        return {
            disabled:!this.state.isEdit
        }
    }

    // 保存修改
    saveEdit(){
        let self = this;
        let checkedList = this.state.selectedRowKeys;//
        let dataSource = this.state.dataSource;
        let tempArr = [];
        let totalPercet = 0;
        for(let i=0;i<checkedList.length;i++){
            let index = checkedList[i];
            totalPercet += dataSource[index].percet;
            tempArr.push(dataSource[index]);
        }

        if(totalPercet != 100){
            message.error("得分占比之和不等于100");
            return false;
        }

        let input = {};
        input.DICTMAP = dictString;
        input.tarttp = '01'; //网点的
        let tranCode="bankCheckConfig/updateAllStatus";

        httpService.commHttp(tranCode,input,function(obj){
            //let listnm = obj.listnm;
            console.log(obj);
            //console.log(listnm)
            // self.setState({
            //     dataSource:listnm
            // })
            for(let i=0;i<tempArr.length;i++){

                self.updateStatus(tempArr[i]);
            }

            self.setState({
                isEdit:false
            })

            message.success("保存成功");
        },function(obj){
            message.error(obj);
        },function(){

        })

    }

    //更新单个选项状态
    updateStatus(item){
        let self = this;
        this.setState({ loading: true });

        let tranCode = "bankCheckConfig/updateStatus";
        let input = {
            DICTMAP:dictString,
            chcktp:item.chcktp,
            percet:item.percet,
        }

        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            console.log(obj);
            //console.log(listnm)
            // self.setState({
            //     loading: false
            // })
            //self.processDate(obj.listnm);
            //message.error(obj);
        },function(obj){
            message.error(obj);
        },function(){

        })
    }

    

	render(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selections:false,
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
            getCheckboxProps:this.setCheckbox.bind(this),

        };

        let editBox;
        if(this.state.isEdit){
            editBox = (
                <Col>
                    <Button
                        type="primary"
                        onClick={this.cancelEdit.bind(this)}
                        disabled={false}>
                            取消
                    </Button>
                    <Button
                        className="btn_right"
                        type="primary"
                        onClick={this.saveEdit.bind(this)}
                        disabled={false}>
                            确定
                    </Button>
                </Col>
            )
        } else {
            editBox = (
                <Col>
                    <Button
                        type="primary"
                        onClick={this.editStandard.bind(this)}
                        disabled={false}>
                            <Icon type="edit" />编辑
                    </Button>
                </Col>
            )
        }

		return(

	   		<div style={{margin: '10px 20px 0'}}>

               <Row>
                    <Col>
                        <Table 
                            rowSelection={rowSelection}
                            columns={this.columns} 
                            dataSource={this.state.dataSource} 
                            className="w80"
                            pagination = {false}
                            rowKey={record => record.key}
                            bordered={true}
                        />
                   </Col> 
               </Row>   

               <div className="w80 text_centet">
                    
                    <span className="bottom_btn">
                        {editBox}
                    </span> 
                    
                </div> 

               <StandardDetailModal ref={(ref) => this.standardDetailModal = ref} />   


			</div>


		)
	}

}




