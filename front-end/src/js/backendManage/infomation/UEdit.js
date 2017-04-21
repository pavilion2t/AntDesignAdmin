import React, { Component, PropTypes } from 'react'
import wangEditor from "wangeditor"
import httpService from "../../Utils/HTTPService"
const HTTP = new httpService();
export default class Ueditor extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount () {
        var obj = this.refs.editor;
        var Ip = HTTP.getIp();
        var token = sessionStorage.getItem("token");
        this.editor = new wangEditor(obj);
        // console.log(this.props.id)
        // var id = this.props.id;
        // this.editor = new wangEditor(id);
        this.editor.config.uploadHeaders = {
            "token":token
        }
        wangEditor.config.printLog = false;//关闭打印log
        this.editor.config.uploadImgFileName="file"
        this.editor.config.uploadImgUrl = Ip+"/addwx/contentUpload";
        this.editor.create();
    }

    initEditor(){

        var id = this.props.id;
        this.editor = new wangEditor(id);
        this.editor.config.uploadImgUrl = '/upload';
        this.editor.create();

    }

    //获取编辑器的内容
    getContent(){
        var content = this.editor.$txt.html();
        return content;

    }

    clearContent(){
        this.editor.clear()
    }

    componentWillUnmount() {
        this.editor.destroy();
    }
    

    render(){
        return(
             <div id={this.props.id} ref="editor" style={this.props.style}>

             </div>
        )
       
    }
}
