import React, { Component } from 'react'
import { Form, Input, Select, Row, Col, Button,Modal } from 'antd';
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService();
const FormItem = Form.Item;
const Option = Select.Option;
export default class BranchInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      disable:true,
      provinceArr:[],
      cityArr:[]
    };
  }
  componentDidMount() {
    var branch=this.props.branch;
    this.setState({
      brchno:branch.key,
      brchna:branch.value,
      prvccd:branch.PRVCCD,
      cityno:branch.CITYNO,
      status:branch.STATUS,
      manager:branch.MANAGER,
      telenm:branch.TELENM,
      address:branch.ADDRES,
      openti:branch.OPENTI,
    })
  }
  
  componentWillMount () {
    this.queryProv()
  }

  queryProv(){
    let self = this;
    let tranCode="queryUser/provinceQuery"
    var input={}
    HTTP.commHttp(tranCode,input,function(data){
  
      self.setState({
        provinceArr:data.listnm
      });
      self.cityList(self.props.branch.PRVCCD)
    },function(e){
        Modal.error({
					title: '查询失败',
					content:e,
				});
    })
	}

  cityList(e){
    let self = this;
		let tranCode="queryUser/cityQuery"
		var input={"PRVCCD":e}
		HTTP.commHttp(tranCode,input,function(data){
			
			self.setState({
				cityArr:data.listnm,
			})
			
		},function(e){
			 Modal.error({
					title: '查询失败',
					content:e,
				});
		})
  }

  queryCity(e){
    let self = this;
		let tranCode="queryUser/cityQuery"
		var input={"PRVCCD":e}
		HTTP.commHttp(tranCode,input,function(data){
			
			self.setState({
				cityArr:data.listnm,
        prvccd:e,
        cityno:data.listnm[0].key
			})
			
		},function(e){
			 Modal.error({
					title: '查询失败',
					content:e,
				});
		})
  }

  confir(){
    let self = this;
		let tranCode="queryBranch/modifyBrch"
		var input={
      "BRCHNO":this.state.brchno,
      "BRCHNA":this.state.brchna,
      "CITYNO":this.state.cityno,
      "TELENM":this.state.telenm,
      "ADDRES":this.state.address,
      "OPENTI":this.state.openti
    }
		HTTP.commHttp(tranCode,input,function(data){
       Modal.success({
					title: '提示',
					content:"编辑成功",
          onOk:()=>{self.setState({disable:true})}
				});
		
		},function(e){
			 Modal.error({
					title: '编辑失败',
					content:e,
				});
		})
    
  }
  
  render () {
    var formItemLayout = {labelCol: { span: 6 },wrapperCol: { span: 18},};
    var formItemLayout1 = {labelCol: { span: 3 },wrapperCol: { span: 21},};
    var buttonItemLayout = {wrapperCol: { span: 16, offset: 8 },};
    var Provinces=this.state.provinceArr.map((value,index)=>{
      return (
         <Option key={index} value={value.key}>{value.value}</Option>
      )
    });
		var Citys = this.state.cityArr.map((value,index)=>{
      return (
         <Option key={index} value={value.key}>{value.value}</Option>
      )
    });
    var Buttons;
    if(this.state.disable){
      Buttons= <FormItem {...buttonItemLayout}>
                <Button type="primary" onClick={()=>{this.setState({disable:false})}}>编辑</Button>
              </FormItem>
    }else{
       Buttons= <FormItem  wrapperCol={{span: 16, offset: 7 }} style={{paddingRight:30}}>
                <Button type="primary" onClick={()=>this.confir()}>确定</Button>
                <Button style={{marginLeft:10}} onClick={()=>{this.setState({disable:true})}}>取消</Button>
              </FormItem>
    }
    return (

        <div style={{marginTop:20}}>
          <Row>
            <Col span={10}>
                <Form layout="horizontal">

                  <FormItem  label="网点编号" {...formItemLayout}>
                    <Input  disabled={true} value={this.state.brchno} />
                  </FormItem>

                  <FormItem label="所在城市" {...formItemLayout}>
                    <Row gutter={10}>
                      <Col span={12}>
                        <Select value={this.state.prvccd} disabled={this.state.disable} onChange={(e)=>{this.queryCity(e)}}>
                          {Provinces}
                        </Select>
                      </Col>
                      <Col span={12}>
                        <Select value={this.state.cityno} disabled={this.state.disable} onChange={(e)=>{this.setState({cityno:e})}}>
                         {Citys}
                        </Select>
                      </Col>
                  </Row>
                  </FormItem>

                  <FormItem  label="网点负责人"  {...formItemLayout}>
                    <Input disabled={this.state.disable} value={this.state.manager} onChange={(e)=>{this.setState({manager:e.target.value})}} />
                  </FormItem>

                </Form>
            </Col>

            <Col span={10}>
              <Form layout="horizontal">

                <FormItem  label="网点名称" {...formItemLayout}>
                  <Input  disabled={this.state.disable} value={this.state.brchna} onChange={(e)=>{this.setState({brchna:e.target.value})}}/>
                </FormItem>

                <FormItem label="状态" {...formItemLayout}>
                  <Select disabled={this.state.disable} value={this.state.status}>
                     <Option value="1">正常</Option>
                  </Select>
                </FormItem>

                <FormItem  label="网点电话" {...formItemLayout}>
                  <Input disabled={this.state.disable} value={this.state.telenm} onChange={(e)=>{this.setState({telenm:e.target.value})}} />
                </FormItem>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col span={20}>
              <Form layout="horizontal">
                <FormItem label="网点地址" {...formItemLayout1}>
                  <Input disabled={this.state.disable} value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} />
                </FormItem>
                <FormItem label="营业时间" {...formItemLayout1}>
                  <Input disabled={this.state.disable} value={this.state.openti} onChange={(e)=>{this.setState({openti:e.target.value})}} />
                </FormItem>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col>
              {Buttons}
            </Col>
          </Row>

          </div>
 
    )
  }
}
