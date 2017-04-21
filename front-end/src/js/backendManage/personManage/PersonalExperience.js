import React,{Component} from 'react';
import { Table, Icon,Form, Input, Tooltip,Popconfirm,Modal,
	Pagination, Radio, Select, Row, Col, Checkbox, Button,DatePicker } from 'antd';
const wellStyles = {margin: '0 20px'};
import "../../../css/table.css"
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;
const Option = Select.Option;

class EditableCell extends Component {
		constructor(props) {
			super(props);
	    this.state = {
	    value: this.props.value,
	    editable: this.props.editable || false,
	  }
	}


		componentWillReceiveProps(nextProps) {
			if (nextProps.editable !== this.state.editable) {
				this.setState({ editable: nextProps.editable });
				if (nextProps.editable) {
					this.cacheValue = this.state.value;
				}
			}
			if (nextProps.status && nextProps.status !== this.props.status) {
				if (nextProps.status === 'save') {
					this.props.onChange(this.state.value);
				} else if (nextProps.status === 'cancel') {
					this.setState({ value: this.cacheValue });
					this.props.onChange(this.cacheValue);
				}
			}
		}

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div>
            :
            <div style={{padding:5}}>
              {value.toString() || ' '}
            </div>
        }
      </div>
    );
  }
}

export default class PersonalExperience extends Component {
	constructor() {
		super();
		this.columns = [
			{title: '序号',
			dataIndex: 'mainid.value',
			width:'15%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'mainid', text),

		},
			{title: '时间',
			dataIndex: 'trandt.value',
			width:'15%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'trandt', text),
		},

			{title: '单位名称',
			dataIndex: 'bankna.value',
			width:'15%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'bankna', text),
		},
			{title: '城市',
			dataIndex: 'cityna.value',
			width:'15%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'cityna', text),
		},
			{title: '部门／专业',
			dataIndex: 'projna.value',
			width:'15%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'projna', text),
		},
			{title: '岗位',
			dataIndex: 'rolena.value',
			width:'15%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'rolena', text),
		},
			{title: '操作',
			dataIndex: 'operation',
			width:'15%',
			render: (text, record, index) => {
				const { editable } = this.state.data[index].cityna;

				return (
					<div>
						{
							editable ?
								<span>
									<a onClick={() => this.editDone(index, 'save')}>保存</a>
									<a style={{marginLeft:8}} onClick={() => this.editDone(index, 'cancel')}>取消</a>
								</span>
								:
								<span>
									<a onClick={() => this.edit(index)}>编辑</a>
								</span>
						}
					</div>
				);
			},
		 }
		];
		this.state = {
			data:[
				{
				 bankna: '',
				 cityna:'',
				mainid:'',
				projna:'',
				rolena:'',
				trandt:'',
}
			],
		};
	}

	componentDidMount(){
		this.userid=this.props.userid;
		 this.query();
	 }

	 renderColumns(data, index, key, text) {
		 const { editable, status } = data[index][key];
		 if (typeof editable === 'undefined') {
			 return text;
		 }
		 return (<EditableCell
			 editable={editable}
			 value={text}
			 onChange={value => this.handleChange(key, index, value)}
			 status={status}
		 />);
 }
	 handleChange(key, index, value) {
		 const { data } = this.state;
		 data[index][key].value = value;
		 this.setState({ data });
	 }

	 edit(index) {
	 const { data } = this.state;
	 Object.keys(data[index]).forEach((item) => {
		 if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
			 data[index][item].editable = true;
		 }
	 });
	 this.setState({ data });
 }

 editDone(index, type) {
	 const { data } = this.state;
	 Object.keys(data[index]).forEach((item) => {
		 if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
			 data[index][item].editable = false;
			 data[index][item].status = type;
		 }
	 });
	 this.setState({ data }, () => {
		 Object.keys(data[index]).forEach((item) => {
			 if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
				 delete data[index][item].status;
			 }
		 });
	 });
 }

	query(){
				let self = this;
				let tranCode="queryUser/getUserPro"
				var input={
				"userid":self.userid,
			}
			HTTP.commHttp(tranCode,input,function(obj){
				let listnm = obj.listnm;
				for(var i=0;i<listnm.length;i++){
					let sequence=listnm[i].mainid;
					let time=listnm[i].trandt;
					let cityna=listnm[i].cityna;
						let projna=listnm[i].projna;
						let rolena=listnm[i].rolena;
	        let bankna=listnm[i].bankna;

	  		  listnm[i].mainid={editable:false,value:sequence};
				  listnm[i].trandt={editable:false,value:time};
				  listnm[i].cityna={editable:false,value:cityna};
					listnm[i].projna={editable:false,value:projna};
				 listnm[i].rolena={editable:false,value:rolena};
				  listnm[i].bankna={editable:false,value:bankna};
				}
				self.setState({
					data:listnm,
				})
			},function(obj){
			},function(){
			})
	}

	addExperience(){

	}

	deleteExperience(){

	}

	render() {
			const columns = this.columns;

		return (

			<div style={{marginLeft:20}}>
			   <div style={{marginBottom:10}}>
				 <Button icon="file-add" type="primary" onClick={()=>this.addExperience()} style={{marginRight:15}}>添加</Button>
         <Button icon="delete" type="primary" onClick={()=>this.deleteExperience()}>删除</Button>
				 </div>

					<Table
					columns={columns}
					dataSource={this.state.data}
					pagination={false}
					/>

					<div style={{padding:10,float:"right"}}>
					<Pagination total={this.state.total} onChange={(key)=>this.changePage(key)}/>
					</div>

			</div>
		);
	}
}
