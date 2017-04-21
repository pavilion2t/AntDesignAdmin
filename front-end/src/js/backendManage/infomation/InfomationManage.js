import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table,Modal,Popconfirm} from 'antd';
import HTTPService from "../../Utils/HTTPService"

const FormItem = Form.Item;
const Option = Select.Option;

const data = [];
const HTTP = new HTTPService();

export default class CourseManage extends Component {
	constructor(props){
		super(props);
        this.totalItems = 0;
        this.selectedId=[];
        this.Ip=HTTP.getIp();
        this.state = {
            dataSource : [],
            pagination: {current:1,total:this.totalItems,showTotal : total => `共有 ${total} 条`,showSizeChanger:true,showQuickJumper:true}, 
        }

      this.columns = [{title: 'ID ',dataIndex: 'artcid',key: '0'},
                      {title: '标题 ',dataIndex: 'title',key: '1',width:250,render:(text)=>{
                        return <p style={styles.columns}>{text}</p>
                      }}, 
                      {title: '标签 ',dataIndex: 'tag',key: '2'},
                      {title: '封面图片 ',dataIndex: 'image',key: '3',render:(text)=>{
                        var url=this.Ip+text;
                        return(
                          <a href={url} target="_blank">
                            <img src={url} height="40px"/>
                          </a>
                        )
                      }},
                      {title: '发布时间 ',dataIndex: 'tranti',key: '4'},
                      {title: '浏览量',dataIndex: 'viewnm',key: '5'},
                      {title: '操作',key: 'operation',render:(text, record,index)=>{
                        var url = this.Ip+record.contet;
                        return(
                          <div>
                            <a href={url} target="_blank">
                              <Button type="primary">查看</Button>
                            </a>
                            <Popconfirm title="确定要删除吗？"  onConfirm={()=>this._delete(record)} okText="确定" cancelText="取消">
                              <Button type="danger" style={{marginLeft:10}}>删除</Button>
                            </Popconfirm>
                          </div>
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
 
    let tranCode = "wxManager/artartli";
		let input={}
		let self = this;
    this.setState({loading:true})
		HTTP.commHttp(tranCode,input,function(data){
      console.log(data)
      self.setState({
        dataSource:data.artcli,
        loading:false
      })
      
		},function(e){
       Modal.error({
					title: '查询失败',
					content:e,
          onOk:()=>{self.setState({loading:false})}
				});
		})
   
  }

  _delete(record){
    console.log(record);
    let tranCode = "wxManager/artdel";
    let index = record.contet.lastIndexOf("/");
    let filename = record.contet.substr(index+1,14);
		let input={
      "artcid":record.artcid,
      "filename":filename
    }

		let self = this;
		HTTP.commHttp(tranCode,input,function(data){
     self._queryList()
		},function(e){
      Modal.error({
					title: '删除失败',
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


	render(){
   
		return(

	   		<div style={{margin: '0 20px 0'}}>

               <Row>
                    <Form layout="inline">
                       
                        <Col className="gutter-row" span={8}>
                            <FormItem label="标题">
                              <Input value={this.state.title} onChange={(e)=>{this.setState({title:e.target.value})}}/>
                            </FormItem>
                        </Col>

                        <Col className="gutter-row" span={8}>
                            <FormItem label="标签">
                              <Input value={this.state.tag} onChange={(e)=>{this.setState({tag:e.target.value})}}/>
                            </FormItem>
                        </Col>
                       <Col className="gutter-row" span={8}>
                            <Button type="primary" icon="search" onClick={()=>this._queryList()}>查询</Button>
                        </Col>
                        
                    </Form>
               </Row>

               <Row>
                    
                  <Table 
                      rowKey={record => record.artcid}
                      columns={this.columns} 
                      dataSource={this.state.dataSource} 
                      bordered
                      style={{marginTop:20}}
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



