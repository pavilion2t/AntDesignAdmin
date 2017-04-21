import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export default class AssignModal extends React.Component {
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
            devino:data.deviid
        })
        // this.showModal();
    }

    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
        this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleCancel() {
        this.setState({ visible: false });
    }

    render() {
        return (
        <div>
            <Modal
            visible={this.state.visible}
            title="故障任务指派"
            onOk={this.handleOk}
            onCancel={this.handleCancel.bind(this)}
            footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
                指派
                </Button>,
            ]}
            >
                <Form layout='horizontal'>

                    <FormItem
                        label="设备编号："
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input value={this.state.devino} disabled/>
                    </FormItem>

                    
                    <FormItem
                        label="故障描述"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input type="textarea" rows={4} />
                    </FormItem>

                    <FormItem
                        label="指派人员"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select defaultValue="---请选择---" style={{ width: 150 }} >
                            <Option value="">---请选择---</Option>
                            <Option value="待处理">待处理</Option>
                            <Option value="处理中">处理中</Option>
                            <Option value="完成">完成</Option>
                        </Select>
                    </FormItem>                  

                </Form>
            </Modal>
        </div>
        );
    }
}