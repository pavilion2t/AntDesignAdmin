import React,{Component} from 'react';
import { Table, Icon,Form, Input, Tooltip,Popconfirm,Modal,
	Pagination, Radio, Select, Row, Col, Checkbox, Button } from 'antd';
const wellStyles = {margin: '0 20px'};
import "../../css/table.css"
import HTTPService from '../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;

	export default class manageSurvey extends Component {
			constructor(props){
				super(props);
			  this.state = {
					 visible: false
				 }
			}
			showModal(){
				this.setState({
					visible: true,
				});
			}
			handleOk (e) {
				console.log(e);
				this.setState({
					visible: false,
				});
			}
			handleCancel (e){
				console.log(e);
				this.setState({
					visible: false,
				});
			}
			render() {
				return (
					<div>
						<Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>
						<Modal title="Basic Modal" visible={this.state.visible}
							onOk={this.handleOk} onCancel={this.handleCancel}
						>
							<p>some contents...</p>
							<p>some contents...</p>
							<p>some contents...</p>
						</Modal>
					</div>
				);
			}
}
