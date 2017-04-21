import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Modal,Upload,Icon} from 'antd';
const FormItem = Form.Item;
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService()
export default class CourseImport extends Component {
    constructor(props){
        super(props);
        this.Ip=HTTP.getIp();
        this.filePath={}
        this.state = {   
            visible: false,
            filePath:"",
            filename:""
        }
    }

   _setModalVisible(Visible){
     this.setState({
       visible:Visible,
       filename:"",
       filePath:""
     })
   }

   upload(e){
   
    var file=this.refs.fileUpload.files[0];
    var path=e.target.value;
    let self=this;
    if(file==undefined || e==""){
       Modal.error({
					title: '上传失败',
					content:"请选择文件",
				});
        return false;
    }else{
      let tranCode = "/researchList/fileUpload";
      HTTP.commUploadFile(tranCode,file,function(data){
        //console.log(data)
        Modal.success({
					title: '上传成功',
					content:"文件上传成功！",
          onOk:()=>{self.setState({filePath:data.loadpath,filename:data.filename});}
				});
      },function(e){
        Modal.error({
					title: '上传失败',
					content:e
				});
      })
    }
   }

  handleOk() {
    	let self = this;
			let tranCode="researchList/importQuestion"
			var input={
        "filePath":this.state.filePath,
        "tranSeq":"user"
			}
      if(this.state.filePath!=""){
        HTTP.commHttp(tranCode,input,function(data){
          console.log(data)
        },function(e){
          Modal.error({
            title: '导入失败',
            content:e,
          });
        })
      }else{
         Modal.info({
            title: '导入提示',
            content:"请先上传文件！",
          });
      } 
  }

  render() {
  
      
      return (
       
          <Modal
          visible={this.state.visible}
          title="导入课程"
          onCancel={this._setModalVisible.bind(this,false)}
          footer={[
              <Button key="back"  onClick={this._setModalVisible.bind(this,false)}>取消</Button>,
              <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
              导入
              </Button>,
          ]}
          >
            <div>
              
              <Row>    
                <Button type="default" style={{marginTop:20}} icon="upload" onClick={()=>{this.refs.fileUpload.click()}}>上传</Button>
                <input type="file" ref="fileUpload" onChange={(e)=>this.upload(e)} className="ant-btn" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style={{display:"none"}}/>  
                 <a href="#" style={{fontSize:16,marginLeft:20}}>{this.state.filename}</a>
              </Row>
             
              <div style={{marginTop:40}}>
               
                <a href="#"> <Icon type="link" />点击下载题目模板</a>
              </div>
               
             </div> 
          </Modal>

      );
    }
}