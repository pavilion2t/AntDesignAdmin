import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Select,Table,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export default class CourseModal extends Component {
    constructor(props){
        super(props);
        this.courseType=[]
        this.state = {   
            visible: false,
            mastid:"",
            content:"",
            optionA:"",
            optionB:"",
            optionC:"",
            optionD:"",
            courseType:""
        }
    }

   _setModalVisible(Visible){
     this.setState({
       visible:Visible
     })
   }

    open(data,callback){
      this.courseType=data.courseType;
      this.setState({
        mastid:data.MASTID,
        content:data.CONTENT,
        answer:data.ANSWER,
        courseType:data.GRUPID,
        optionA:data.OPTIONS.split("^")[0],
        optionB:data.OPTIONS.split("^")[1],
        optionC:data.OPTIONS.split("^")[2],
        optionD:data.OPTIONS.split("^")[3],
        visible:true
      })
      this.callback = callback;
    }

    handleOk() {
      var data={};
      data.mastid = this.state.mastid;
      data.groupid = this.state.courseType;
      data.content = this.state.content;
      data.options = this.state.optionA
                    +"^"+this.state.optionB
                    +"^"+this.state.optionC
                    +"^"+this.state.optionD
    data.answer = this.state.answer;
    this.callback(data)
    }
    render() {
        var courseTypeList=this.courseType.map((value,index)=>{
            return (
                <Option key={index} value={value.GRUPID}>{value.GRUPNA}</Option>
            )
        });
        return (
            <div>
                <Modal
                visible={this.state.visible}
                title="编辑题目"
                onCancel={this._setModalVisible.bind(this,false)}
                footer={[
                    <Button key="back"  onClick={this._setModalVisible.bind(this,false)}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
                    确定
                    </Button>,
                ]}
                >
                    <Form layout='horizontal'>

                        <FormItem
                            label="题目"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <Input type="textarea" rows={4} value={this.state.content} onChange={(e)=>{this.setState({content:e.target.value})}}/>
                        </FormItem>

                        <FormItem
                            label="选项"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <div style={{marginBottom:5}}>
                            <Input type="text"   addonBefore="A:"  value={this.state.optionA} onChange={()=>{this.setState({optionA:e.target.value})}}/>
                            </div>
                            <div style={{marginBottom:5}}>
                            <Input type="text" addonBefore="B:"  value={this.state.optionB} onChange={()=>{this.setState({optionB:e.target.value})}}/>
                            </div>
                            <div style={{marginBottom:5}}>
                            <Input type="text" addonBefore="C:"  value={this.state.optionC} onChange={()=>{this.setState({optionC:e.target.value})}}/>
                            </div>
                            <div style={{marginBottom:5}}>
                            <Input type="text" addonBefore="D:"  value={this.state.optionD} onChange={()=>{this.setState({optionD:e.target.value})}}/>
                            </div>
                        </FormItem>

                        <FormItem
                            label="答案"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <Select value={this.state.answer} onChange={(e)=>{this.setState({answer:e})}} style={{ width: 150 }} >
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                                <Option value="D">D</Option>
                            </Select>
                        </FormItem>

                        <FormItem
                            label="课程类型"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <Select value={this.state.courseType} onChange={(e)=>{this.setState({courseType:e})}} style={{ width: 150 }} >
                                {courseTypeList}
                            </Select>
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        );
    }
}