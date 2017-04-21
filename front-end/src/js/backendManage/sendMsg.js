import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,message} from 'antd';
import { Router,Route,hashHistory,Link,browserHistory} from 'react-router';
import HTTPService from './../Utils/HTTPService'
const FormItem = Form.Item;
const Option = Select.Option;
let httpService = new HTTPService();

class SendMsg extends Component{
	constructor(props){
		super(props);
		this.testData=[ 
                        {"xuehao":"1101","userna":"黄","yuwen":"78","shuxue":"88","english":"99","total":"245"},
						{"xuehao":"1102","userna":"邓","yuwen":"78","shuxue":"88","english":"99","total":"245"},
						{"xuehao":"1103","userna":"贺","yuwen":"78","shuxue":"88","english":"99","total":"245"},
						{"xuehao":"1104","userna":"谭","yuwen":"78","shuxue":"88","english":"99","total":"245"}
                      ];
		this.state={
			showtarge:false,
		};
		this.panelTitle="管理用户";
	}
    
    componentDidMount() {
        this.getBranchOpts();
    }
    

    selectRange(val){
        if(val == "1"){
            this.setState({
                range:val,
                showtart:true
            })
        } else {
            this.setState({
                range:val,
                showtart:false
            })
        }
    } 

    getBranchOpts(){
        let tranCode = "sendMessage/brchQuery"
		let input = {};
        let self = this;
        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            console.log(listnm)
            // self.setState({
            //     dataSource:listnm
            // let tempArr = listnm.map((value,index) => <Option key={value.key}>{value.value}</Option>)
            // return tempArr;
            self.setState({
                brchlist:listnm
            })

        },function(obj){
            message.error(obj);
        },function(){
            //message.error('This is a message of error');
        })
    }

    checkConfirm(rule, value, callback){
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {
    	//var listItems=this.showData();
        const { getFieldDecorator } = this.props.form;
        let showtart = this.state.showtart;
        let tartids = null;
        //let branchList = this.tempArr();
        if(showtart){
            let brchlist = this.state.brchlist;
            let tempArr = brchlist.map((value,index) => <Option key={value.key} value={value.key}>{value.value}</Option>)
            tartids = (
                    <FormItem
                        label="发送对象"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >   
                       {getFieldDecorator('tartid', {
									rules: [{
									required: true, message: '请选择发送对象',
									}, {
									validator: this.checkConfirm.bind(this),
									}],
								})(
                            <Select style={{ width: 150 }} >
                                {tempArr}
                            </Select>
                        )}
                    </FormItem>);
        } else {
            tartids = null
        }


	    return (
	       <div style={{marginTop:30}}>

                <Form layout='horizontal'>

                    <FormItem
                        label="发送范围："
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                     {getFieldDecorator('sendtp', {
                                    initialValue: '0' ,
									rules: [{
									required: true, message: '请选择发送范围',
									}, {
									validator: this.checkConfirm.bind(this),
									}],
								})(
                                <Select style={{ width: 150 }} onChange={this.selectRange.bind(this)} >
                                    <Option value="0">全体</Option>
                                    <Option value="1">按网点</Option>
                                </Select>
                        )}
                    </FormItem>

                    {tartids}

                    <FormItem
                        label="是否保存到信息中心"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                                {getFieldDecorator('savetg', {
                                    initialValue: '1',
									rules: [{
									required: true, message: '请选择发送范围',
									}, {
									validator: this.checkConfirm.bind(this),
									}],
								})(
                                <Select style={{ width: 150 }} >
                                    <Option value="1">保存</Option>
                                    <Option value="0">不保存</Option>
                                </Select>
                        )}
                    </FormItem>

                    {/*<FormItem
                        label="消息类型"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select style={{ width: 150 }} >
                            <Option value="保存">保存</Option>
                            <Option value="不保存">不保存</Option>
                        </Select>
                    </FormItem>*/}

					<FormItem
                        label="消息标题"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    	>
                        {getFieldDecorator('title', {
                            initialValue: "消息通知",
                            rules: [{
                            required: true, message: '请选择发送范围',
                            }, {
                            validator: this.checkConfirm.bind(this),
                            }],
                        })(
                       <Input type="text"/>
                        )}
                    </FormItem>

                    <FormItem
                        label="消息内容"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                         {getFieldDecorator('remark', {                       
                            rules: [{
                            required: true, message: '请填写发送内容消息内容',
                            }, {
                            validator: this.checkConfirm.bind(this),
                            }],
                        })(
						<Input type="textarea" rows={4} onChange={(contet)=>this.setState({contet})}/>
                        )}
                    </FormItem>

				 	<FormItem
                      wrapperCol={{ offset: 5,span: 14 }}
					 >
                        <Button onClick={this.sendMessage.bind(this)} type="primary">确定</Button>
                    </FormItem>

                </Form>
			</div>
	    );
    }

    resetForm(){
        this.props.form.resetFields();
    }

    sendMessage(e){

        e.preventDefault();
        let self = this;
		this.props.form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
			    console.log('Received values of form: ', values);
                values.mesgtp = "46";

                let tranCode = "sendMessage/SendMsg"
                httpService.commHttp(tranCode,values,function(obj){
                    Modal.success({
                        title: '消息发送成功',
                    })
                    self.resetForm();

                },function(obj){
                    message.error(obj);
                },function(){
                    //message.error('This is a message of error');
                })
		    }
		});

    }
}



var styles={
	box:{
		textAlign:"center",
	}

}

var SendMsgForm = Form.create()(SendMsg);

export default  SendMsgForm;
