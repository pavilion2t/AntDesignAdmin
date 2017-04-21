import React,{Component} from 'react';
import {Link,browserHistory} from 'react-router';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,Popconfirm} from 'antd';
import HTTPService from "../../Utils/HTTPService"

const FormItem = Form.Item;
const Option = Select.Option;

const data = [];
const HTTP = new HTTPService();

export default class BranchMember extends Component {
	constructor(props){
		super(props);

        this.selectedId=[];
        this.state = {
            dataSource : [],
            pagination: {current:1,showTotal : total => `共有 ${total} 条`,showSizeChanger:true,showQuickJumper:true},
            loading: false,
            contributor:"",
        }

      this.columns = [{title: '行员编号 ',dataIndex: 'USERID',key: '0'}, 
                      {title: '姓名 ',dataIndex: 'USERNA',key: '1',render: text => <a href="#">{text}</a>},
                      {title: '所在网点',dataIndex: 'BRCHNA',key: '2'},
                      {title: '员工类型 ',dataIndex: 'ROLETP',key: '3'},
                      {title: '岗位名称 ',dataIndex: 'ROLENA',key: '6',render: text => <a href="#">{text}</a>},
                      {title: '性别',dataIndex: 'GENDER',key: '4',render(text){
                        switch(text){
                          case "0":
                            return "女";
                            break;
                          case "1":
                            return "男";
                            break;
                        }
                      }},
                      
                      {title: '操作',key: 'operation',render:(text, record,index)=>{
                         return(
                           <Button type="primary" icon="edit" onClick={this._todetail.bind(this,text)}> 
                              详情
                           </Button>
                         )
                      }}
                      ];
	}
//页面加载执行
  componentDidMount(){
    this._queryList();
  }

  _todetail(data){
    var userid = data.USERID;
   	browserHistory.push({pathname:"/home/CheckInfo",state:{title:"行员个人信息",person:{USERID:userid}}})
  }

  //查数据
  _queryList(){
 
    let tranCode = "queryUser/queryUser";
		let input={
      "BRCHNO":this.props.brchno
    }
		let self = this;
    this.setState({loading:true})
		HTTP.commHttp(tranCode,input,function(data){
  
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
      checkedId.push(selectedRows[i].userid)
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
                    <div style={{marginTop:20,marginBottom:20}}>
                     
                      <Button type="primary" icon="plus">添加</Button>  
                  
                   
                       <Popconfirm title="确定要删除吗？"  onConfirm={()=>this._handleBatch("1")} okText="确定" cancelText="取消">
                          <Button type="danger" style={{marginLeft:10}} icon="delete">删除</Button>  
                      </Popconfirm>
                    </div>
                    <Table 
                        rowKey={record => record.USERID}
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




