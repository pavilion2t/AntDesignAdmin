import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,Checkbox,message} from 'antd';
import HTTPService from './../../Utils/HTTPService'
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
let httpService = new HTTPService();
const dictString = "STATUS:USER_STATUS|LEADER:LEADER_STATUS|MANAGE:MANAGE_STATUS|GENDER:GENDER"

export default class AddStandardModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            visible: false,
            chckna:"",
            percet:""
        }
    }

    showModal(){
        this.setState({
            visible: true,

        });
    }

    openModal(callback,data){
        this.setState({
            visible: true,
            chckna: "",
            percet: "",
            validate:"",
            help:""
        })
        if(callback){

            this.callback = callback;
        }
        if(data){
            this.record = data;
        }

    }

    closeModal(){
        this.setState({
            visible: false
        })
    }

    addFirstOption() {
        let self = this;
        let chckna = this.state.chckna.trim();
        let percet = this.state.percet;

        if(!chckna){
            this.setState({
                validate:"error",
                help:"请输入指标名"
            })
            return;
        }
        this.setState({ loading: true });
        //let dictString = dictString;
        let tranCode = "bankTargetFirst/addCheckOption";
        let input = {
            DICTMAP:dictString,
            chckna:chckna,
            percent:percet,
            tarttp:'01',
        }

        httpService.commHttp(tranCode,input,function(obj){
            console.log(obj);
            //console.log(listnm)
            self.setState({
                loading: false
            })
            //self.processDate(obj.listnm);
            self.closeModal();
            message.success('新增成功');
            self.callback();
        },function(obj){
            console.log(obj)
            message.error(obj);
            self.setState({
                loading: false
            })
        },function(){

        })
    }

    addSecondOption() {
        let self = this;
        let chckna = this.state.chckna.trim();
        let chcktp = this.record.chcktp;

        if(!chckna){
            this.setState({
                validate:"error",
                help:"请输入指标名"
            })
            return;
        }
        this.setState({ loading: true });
        //let dictString = dictString;
        let tranCode = "bankTargetFirst/addCheckOptionItem";
        let input = {
            DICTMAP:dictString,
            chcktp:chcktp,
            itemna:chckna,
        }

        httpService.commHttp(tranCode,input,function(obj){
            console.log(obj);
            //console.log(listnm)
            self.setState({
                loading: false
            })
            //self.processDate(obj.listnm);
            self.closeModal();
            message.success('新增成功');
            self.callback(chcktp);
        },function(obj){
            console.log(obj)
            message.error(obj);
            self.setState({
                loading: false
            })
        },function(){

        })
    }

    handleCancel() {
        this.setState({ 
            chckna: "",
            percet: "",
            visible: false 
        });
    }

    onChange(checkedValue){
        console.log(checkedValue);
        this.setState(
            {
                checkedList:checkedValue,
            }
        )
    }

    confirm(){
        if(this.props.addType == "1"){

            this.addFirstOption();
        } else {
            this.addSecondOption();
        }
    }
    
    validateForm(value){
        this.setState({
            chckna:value
        })
        if(value){
            this.setState({
                help:"",
                validate:"success"
            })
        }
    }

    render() {
        let percent;
        let title;
        if(this.props.addType == "1"){
            title = "一类指标名称";
            percent =  
                    (<FormItem
                        label="得分占比"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        >
                        <Input value={this.state.percet} onChange={(e)=>this.setState({percet:e.target.value})} />
                    </FormItem> )  
        } else {
            title = "二类指标名称";
            percent = null;
        }

        return (
        <div>
            <Modal
            visible={this.state.visible}
            title={this.props.title}
            onOk={this.handleOk}
            onCancel={this.handleCancel.bind(this)}
            footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.confirm.bind(this)}>
                    确定
                </Button>
            ]}
            >
                <Form layout='horizontal'>

                    <FormItem
                        label={title}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        required={true}
                        validateStatus = {this.state.validate}
                        help = {this.state.help}
                    >
                        <Input value={this.state.chckna} onChange={(e)=>this.validateForm(e.target.value)} />
                    </FormItem>       

                    {percent}
          

                </Form>
            </Modal>
        </div>
        );
    }
}