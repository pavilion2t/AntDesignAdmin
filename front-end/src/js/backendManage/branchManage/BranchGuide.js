import React, { Component } from 'react'
import {Table,Button,Modal} from 'antd'
import HTTPService from '../../Utils/HTTPService'
const HTTP = new HTTPService()
export default class BranchGuide extends Component {
  constructor(props){
    super(props);
    this.Ip=HTTP.getIp();
    this.state = {
      guideImg:""
    };
  }

  upImage(){
    var file=this.refs.imageUpload.files[0];
    let self=this;
    if(file==undefined){
       Modal.error({
					title: '上传失败',
					content:"请选择文件",
				});
        return false;
    }else{
      let tranCode = "/queryBranch/uploadBrchImage";
      HTTP.commUploadFile(tranCode,file,function(data){
       
        self.updateGuide(data)
      },function(e){
        Modal.error({
					title: '上传失败',
					content:e
				});
      })
    }
  }

  updateGuide(data){
    let self = this;
    let tranCode="queryBranch/updateBrchImage"
    var input={
      "brchno":this.props.brchno,
      "filename":data.filename,
    }
    HTTP.commHttp(tranCode,input,function(data){
     
      Modal.success({
        title: '提示',
        content:"更新成功",
				onOk:()=>{self.queryImg()}
      });
     
    },function(e){
      Modal.error({
        title: '更新失败',
        content:e,
      });
    })
  }

  queryImg(){
    let self = this;
    let tranCode="queryBranch/getBranchImage"
    var input={
      "brchno":this.props.brchno,
    }
    HTTP.commHttp(tranCode,input,function(data){
      self.setState({
        guideImg:self.Ip+"/"+data.images
      })
    },function(e){
      Modal.error({
        title: '更新失败',
        content:e,
      });
    })
  }

  componentDidMount() {
    this.queryImg()
  }
  render () {
    var imgView;
    if(this.state.guideImg==""){
      imgView =  <div style={{paddingTop:200,paddingBottom:200}}>
                    <i className="anticon anticon-frown-o"></i><span>暂无导览图</span>
                  </div>
    }else{
       imgView =  <div style={{padding:10}}>
                    <img src={this.state.guideImg} width="100%"/>
                  </div>
    }
                 
    return (
      <div style={styles.box}>
        <div style={{fontSize:18,width:800,color:'rgba(0,0,0,0.8)',paddingBottom:10,borderBottom:"1px solid #e9e9e9"}}>网点导览图</div>
        {imgView}
        <div style={{paddingTop:10,width:800,textAlign:"center",borderTop:"1px solid #e9e9e9"}}>
          <input type="file" ref="imageUpload" onChange={()=>this.upImage()} style={{display:'none'}}  accept="image/jpeg,image/jpg,image/png"/>
          <Button size="large" onClick={()=>this.refs.imageUpload.click()}>更新导览图</Button>
        </div>    
      </div>
    )
  }
}
const styles={
  box:{
    width:800,
    textAlign:"center",
    border:"1px solid #e9e9e9",
    paddingTop:10,
    paddingBottom:10
  }
}
