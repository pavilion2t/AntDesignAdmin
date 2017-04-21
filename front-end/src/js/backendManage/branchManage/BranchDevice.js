import React,{Component} from 'react';
import {Link,browserHistory} from 'react-router';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,Popconfirm} from 'antd';
import HTTPService from "../../Utils/HTTPService"

const FormItem = Form.Item;
const Option = Select.Option;

const data = [];
const HTTP = new HTTPService();

export default class BranchDevice extends Component {
	constructor(props){
		super(props);

        this.selectedId=[];
        this.state = {
            dataSource : [],
            pagination: {current:1,showTotal : total => `共有 ${total} 条`,showSizeChanger:true,showQuickJumper:true},
            loading: false,
        }

      this.columns = [{title: '设备编号 ',dataIndex: 'DEVINO',key: '0'}, 
                      {title: '设备类型 ',dataIndex: 'DEVITP',key: '1',render: text => <p>{text}</p>},
                      {title: '所属网点',dataIndex: 'BRCHNA',key: '2'},
                      {title: '状态 ',dataIndex: 'STATUS',key: '3',render: text => <a href="#">正常</a>},
                      {title: '设备地址 ',dataIndex: 'ADDRES',key: '6',width:200,render:(text)=>{
                        return <p style={styles.columns}>{text}</p>
                      }}, 
                      {title: '责任人',dataIndex: 'ROLENA',key: '4',render: text => <p>张小龙</p>}, 
                    ];
	}
//页面加载执行
  componentDidMount(){
    this._queryList();
  }


  //查数据
  _queryList(){
 
    let tranCode = "queryBranch/getDeviceInfo";
		let input={
      "brchno":this.props.brchno
    }
		let self = this;
    this.setState({loading:true})
		HTTP.commHttp(tranCode,input,function(data){
      //console.log(data)
      if(data.listnm){
       self.setState({
         dataSource:data.listnm,
         loading:false
       });
      }
		},function(e){
       Modal.error({
					title: '查询失败',
					content:e,
          onOk:()=>{self.setState({loading:false})}
				});
		})
   
  }

//分页
  handleTableChange(pagination, filters, sorter) {
    let pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
        pagination: pager,
    });
  }
//选择框
  onSelectChange(keys,selectedRows){
    var checkedId=[];
    for(var i=0;i<selectedRows.length;i++){
      checkedId.push(selectedRows[i].DEVINO)
    }
   
      this.selectedId=checkedId
  }


	render(){
 
    var rowSelection= {
      onChange: this.onSelectChange.bind(this),
    }
		return(

	   		<div style={{margin: '0 20px 0'}}>

               <Row>
                   
                    <Table 
                        rowKey={record => record.DEVINO}
                        columns={this.columns} 
                        dataSource={this.state.dataSource} 
                        bordered
                        rowSelection={rowSelection}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange.bind(this)}
                        />
               </Row>   
              
			</div>

		)
	}
}

const styles={
  columns:{
    textOverflow: "ellipsis",
    whiteSpace:"nowrap",
    overflow:"hidden",
    width:250,
  }
}




