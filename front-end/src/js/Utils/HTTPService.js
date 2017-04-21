import Utils from './Utils'
import {browserHistory} from 'react-router';
import {Modal} from 'antd';
class HTTPService {
    constructor() {
      this._APP_PROD_MODE = false;
      this.preMode = this._APP_PROD_MODE;
    }

    getIp(){
        //开发
       /* 朱婷*/
        var serverIp = "http://10.18.89.10:8080";

        /*舒涛*/
         //serverIp = "http://10.18.22.45:8080";

        /*黄永鹏*/

        //var serverIp = "http://10.18.22.36:8080";

       /*贺前*/
        //  serverIp = "http://10.18.22.53:8080";
        //serverIp = "http://10.18.22.28:8080";
        //serverIp = "https://10.18.22.51:8443";

      if(this.isProdMode()){
          //生产环境
          serverIp = "http://vcs.dev.sunline.cn:8182";
      }
      return serverIp;
    }


  isProdMode(){
      return this._APP_PROD_MODE;
  }

  switch2Visitor(){
    Utils.setSession('visitorModel',true);
    this._APP_PROD_MODE = false;
  }

  resetMode(){
    this._APP_PROD_MODE = this.preMode;
    Utils.setSession('visitorModel',false);
  }

  commHttp(tranCode,tranData,sucFun,failFun) {
    this.tranCode = tranCode;
    var serverIp = this.getIp();
    serverIp += "/";

    var url = serverIp + tranCode;
    var getToken=sessionStorage.getItem("token")
    var  options = options ? options : {};
      options.method = 'POST';
      options.body = tranData;
      options.sucFun = sucFun;
      options.failFun = failFun;
      options.header = {
        'Accept': 'application/json',
        'Content-Type': 'text/plain;charset=utf-8',
        'token':getToken
      };
      return this.fetchData(url, options);
  }

  fetchData(path, options) {
      let self = this;
      console.log("++++++++++++");
      console.log(path);
      fetch(path,{
        method: options.method,
        mode:"cors",
        headers: options.header,
        body: JSON.stringify(options.body)
      })
      .then((response) => response.json())
      .then((dataStr) => {
        //console.log(dataStr)
          if(dataStr.code==401){
            Modal.error({
              title:"请求失败",
              content:dataStr.message,
              onOk:()=>{browserHistory.replace({pathname:"/login"})},
              okText:"确定"
            })
          }else if(dataStr.code==200){
             options.sucFun(dataStr.data);
           }else{
              options.failFun(dataStr.message);
           }
      },(e)=>{

          console.log("网络异常"+e);
          options.failFun("网络异常");

      }).catch((error) => {
          options.failFun(error);
          console.log("代码问题："+error);
      })
  }


  commUploadFile(tranCode,filePath, sucFun, failFun){
    let serverIp = this.getIp();
    let urlPath = serverIp + tranCode;
    //var fileName = filePath.substr(filePath.lastIndexOf("/") + 1);
    const formData = new FormData();
    formData.append('file',filePath);
    // formData.append('file',filePath);
    // formData.append('name',fileName);
    // formData.append('type','image/jpeg');
    var getToken=sessionStorage.getItem("token")

    let options = {
      method:'POST',
      mode: "FormData",
      body: formData,
      headers:{'token':getToken}
    };

    fetch(urlPath,options)
    .then((response) => response.json())
    .then((dataStr) => {
      //console.log(dataStr)
      var obj = dataStr;
      if(obj.code == 200){
        sucFun(obj.data);
      }else{
        failFun(obj.message)
      }
    }).catch((data) => {
        failFun("上传文件失败：" + data);
    })
  }

}
module.exports = HTTPService;
