import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,message,Popconfirm} from 'antd';
import CourseModal from './CourseModal.js'
import CourseImport from './CourseImport'
import HTTPService from "../../Utils/HTTPService"

const FormItem = Form.Item;
const Option = Select.Option;

const data = [];
const HTTP = new HTTPService();

export default class CourseManage extends Component {
	constructor(props){
		super(props);

        this.selectedId=[];
        this.state = {
            dataSource : [],
            pagination: {current:1,showTotal : total => `共有 ${total} 条`,showSizeChanger:true,showQuickJumper:true},
            courseType:[],
            courseStage:[],
            loading: false,
            contributor:"",
            status:"",
            stage:"",
            type:""
        }

      this.columns = [{title: '题目 ',dataIndex: 'CONTENT',key: '0',width:250,render:(text)=>{
                        return <p style={styles.columns}>{text}</p>
                      }}, 
                      {title: '课程类型 ',dataIndex: 'QUESTP',key: '1'},
                      {title: '贡献者 ',dataIndex: 'USERNA',key: '2'},
                      {title: '贡献时间 ',dataIndex: 'TRANTI',key: '3',render: text =>
                         <a href="#">{text.substr(0,4)+"/"+text.substr(4,2)+"/"+text.substr(6,2)+text.substr(8)}</a>
                      },
                      {title: '状态',dataIndex: 'USEDTG',key: '4',render(text){
                        switch(text){
                          case "0":
                            return "未上线";
                            break;
                          case "1":
                            return "已上线";
                            break;
                          case "2":
                            return "已删除";
                            break; 
                        }
                      }},
                      {title: '上线时间 ',dataIndex: 'USEDTI',key: '5',render: text => <a href="#">{text}</a>},
                      {title: '关卡 ',dataIndex: 'PORDER',key: '6',render: text => <a href="#">{text}</a>},
                      {title: '操作',key: 'operation',render:(text, record,index)=>{
                         return(
                           <Button type="primary" icon="edit" onClick={this._edit.bind(this,text)}> 
                              编辑
                           </Button>
                         )
                      }}
                      ];
	}
//页面加载执行
  componentDidMount(){
   
    
    this._queryList();
  }

  //查数据
  _queryList(){
 
    let tranCode = "courseManager/queryQuestion";
		let input={
      "groupid":this.state.type,
      "userid":this.state.contributor,
      "status":this.state.status,
      "order":this.state.stage
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
       self.queryStage();
       self.queryGroup();
      }
		},function(e){
       Modal.error({
					title: '查询失败',
					content:e,
          onOk:()=>{self.setState({loading:false})}
			});
		})
   
  }
//查课程类型
  queryGroup(){
    let tranCode = "courseManager/queryGroup";
		let input={}
		let self = this;
		HTTP.commHttp(tranCode,input,function(data){
      if(data.listnm){
        self.setState({
          courseType:data.listnm
        })
      }
		},function(e){
       Modal.error({
					title: '查询失败',
					content:e,
				});
		})
  }
//查关卡
  queryStage(){
    let tranCode = "courseManager/getOrder";
		let input={}
		let self = this;
		HTTP.commHttp(tranCode,input,function(data){

      if(data.listnm){
        self.setState({
          courseStage:data.listnm
        })
      }
		},function(e){
       Modal.error({
					title: '查询失败',
					content:e,
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
      checkedId.push(selectedRows[i].MASTID)
    }
   
      this.selectedId = checkedId.toString()
  }
//上传和删除
  _handleBatch(type){
    let tranCode = "courseManager/useQuestion";
		let input={
      "trantype":type,
      "tartids":this.selectedId
    }
		let self = this;
		HTTP.commHttp(tranCode,input,function(data){
      if(data.trantype=="0"){
        Modal.success({
          title: '提示',
					content:"上线成功！",
          onOk:()=>{self._queryList()}
        });
      }else{
        Modal.success({
          title: '提示',
					content:"删除成功！",
          onOk:()=>{self._queryList()}
        });
      }
		},function(e){
       Modal.error({
					title: '操作失败',
					content:e,
				});
		})
  }
//编辑
  _edit(data){
   data.courseType=this.state.courseType;
   this.CourseModal.open(data,this._callback.bind(this))
  }
  _callback(data){
    let tranCode = "courseManager/modifyQuestion";
		let input=data
		let self = this;
		HTTP.commHttp(tranCode,input,function(data){
      console.log(data)
      self.CourseModal._setModalVisible(false)
      Modal.success({
        	title: '提示',
					content:"编辑成功！",
          onOk:()=>{self._queryList()}
      });
     
		},function(e){
       Modal.error({
					title: '编辑失败',
					content:e,
				});
		})
  }
  _importCourse(){
    this.CourseImport._setModalVisible(true)
  }

	render(){
    var courseTypeList=this.state.courseType.map((value,index)=>{
      return (
         <Option key={index} value={value.GRUPID}>{value.GRUPNA}</Option>
      )
    });
    var courseStageList=this.state.courseStage.map((value,index)=>{
      return(
         <Option key={index} value={value.KEY.toString()}>{value.VALUE}</Option>
      )
    })
    var rowSelection= {
      onChange: this.onSelectChange.bind(this),
      getCheckboxProps: record => ({
        disabled: record.USEDTG != '0', 
      }),
    }
		return(

	   		<div style={{margin: '0 20px 0'}}>

               <Row>
                    <Form layout="inline">
                        <Col className="gutter-row" span={5}>
                            <FormItem label="课程类型">
                                <Select value={this.state.type} onChange={(e)=>{this.setState({type:e})}} style={{ width: 120 }} >
                                    <Option value="">全部</Option>
                                    {courseTypeList}
                                </Select>

                            
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <FormItem label="贡献者">
                              <Input value={this.state.contributor} style={{width:120}} onChange={(e)=>{this.setState({contributor:e.target.value})}}/>
                            </FormItem>
                        </Col>

                        <Col className="gutter-row" span={5}>
                            <FormItem label="状态：">

                                <Select value={this.state.status} onChange={(e)=>{this.setState({status:e})}} style={{ width: 120 }} >
                                    <Option value="">全部</Option>
                                    <Option value="0">上线</Option>
                                    <Option value="1">未上线</Option>
                                    <Option value="2">已删除</Option>
                                </Select>
                            </FormItem>
                        </Col>

                         <Col className="gutter-row" span={5}>
                            <FormItem label="关卡：">

                                <Select value={this.state.stage} onChange={(e)=>{this.setState({stage:e})}} style={{ width: 120 }} >
                                    <Option value="">全部</Option>
                                    {courseStageList}
                                </Select>
                            </FormItem>
                        </Col>
                       <Col className="gutter-row" span={4}>
                            <Button type="primary" icon="search" onClick={()=>this._queryList()}>查询</Button>
                            <Button type="primary" style={{marginLeft:10}} icon="file-add" onClick={()=>this._importCourse()}> 
                                导入
                            </Button>
                        </Col>
                        
                    </Form>
               </Row>

               <Row>
                    <div style={{marginTop:20,marginBottom:20}}>
                      <Popconfirm title="确定要上线吗？" onConfirm={()=>this._handleBatch("0")} okText="确定" cancelText="取消">
                          <Button type="primary" icon="cloud-upload-o">上线</Button>  
                      </Popconfirm>
                   
                       <Popconfirm title="确定要删除吗？"  onConfirm={()=>this._handleBatch("1")} okText="确定" cancelText="取消">
                          <Button type="danger" style={{marginLeft:10}} icon="delete">删除</Button>  
                      </Popconfirm>
                    </div>
                    <Table 
                        rowKey={record => record.MASTID}
                        columns={this.columns} 
                        dataSource={this.state.dataSource} 
                        bordered
                        rowSelection={rowSelection}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange.bind(this)}
                        />
               </Row>   

               <CourseModal ref={(ref) => this.CourseModal = ref} /> 
               <CourseImport ref={(ref) => this.CourseImport = ref} /> 
                 
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



