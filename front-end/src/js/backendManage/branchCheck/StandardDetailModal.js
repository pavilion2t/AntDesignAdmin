import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,Checkbox,message} from 'antd';
import HTTPService from './../../Utils/HTTPService'
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
let httpService = new HTTPService();
const dictString = "STATUS:USER_STATUS|LEADER:LEADER_STATUS|MANAGE:MANAGE_STATUS|GENDER:GENDER"

export default class StandardDetailModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            visible: false,
            devino:""
        }
    }

    showModal(){
        this.setState({
            visible: true,
        });
    }

    openModal(data,callback){
        console.log(data)
        this.setState({
            visible: true,
            chckna:data.chckna
        })
        this.chcktp = data.chcktp;
        // this.showModal();
        this.getStandardList(data.chcktp);
    }

    closeModal(){
        this.setState({
            visible: false
        })
    }

    handleOk() {
        let self = this;
        this.setState({ loading: true });
        //let dictString = dictString;
        let tranCode = "bankCheckConfig/resetCheckItem";
        let input = {
            DICTMAP:dictString,
            chcktp:this.chcktp
        }

        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            console.log(obj);
            //console.log(listnm)
            self.setState({
                loading: false
            })
            let checkedList = self.state.checkedList;
            for(let i=0;i<checkedList.length;i++){
                self.updateChecked(checkedList[i]);
            }
            //self.processDate(obj.listnm);
            self.closeModal();
            message.success('启用成功');
        },function(obj){
            message.error(obj);
        },function(){

        })
    }

    updateChecked(itemtp){
        let self = this;
        this.setState({ loading: true });
        //let dictString = dictString;
        let tranCode = "bankCheckConfig/updateCheckSec";
        let input = {
            DICTMAP:dictString,
            chcktp:this.chcktp,
            itemtp:itemtp
        }

        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            console.log(obj);
            //console.log(listnm)
            self.setState({
                loading: false
            })
            //self.processDate(obj.listnm);
        },function(obj){
            message.error(obj);
        },function(){

        })
    }

    handleCancel() {
        this.setState({ visible: false });
    }

    onChange(checkedValue){
        console.log(checkedValue);
        this.setState(
            {
                checkedList:checkedValue,
            }
        )
    }
    

    getStandardList(chcktp){
        let self = this;
        let tranCode = "bankCheckConfig/getCheckOptionItem";

        let input = {};
        input.DICTMAP = dictString;
        input.chcktp =  chcktp;
        // var rows = $("#dataTable").datagrid('getRows');
        // var chcktp = rows[index].CHCKTP;

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
        let checkArr = [];
        let checkedList = [];
        for(let i=0;i<data.length;i++){
            let obj = {};
            obj.key = i;
            obj.label = data[i].ITEMNA;
            obj.value = data[i].ITEMTP;
            if(data[i].STATUS == '1'){

                checkedList.push(obj.value);
            }
            checkArr.push(obj);
        }
        console.log(checkedList);
        this.setState({
            options:checkArr,
            checkedList:checkedList,
        });
    }

    render() {

        return (
        <div>
            <Modal
            visible={this.state.visible}
            title="查看一类指标详情"
            onOk={this.handleOk}
            onCancel={this.handleCancel.bind(this)}
            footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
                    启用
                </Button>,
            ]}
            >
                <Form layout='horizontal'>

                    <FormItem
                        label="一类指标名称"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input value={this.state.chckna} disabled/>
                    </FormItem>

                    
                    <FormItem
                        label="二类指标名称"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <CheckboxGroup options={this.state.options} value={this.state.checkedList} onChange={this.onChange.bind(this)} />
                        <br />
                    </FormItem>

                </Form>
            </Modal>
        </div>
        );
    }
}