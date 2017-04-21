import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Upload,Table,Modal,message,Popconfirm} from 'antd';
import Ueditor from './UEdit.js'
import HTTPService from "../../Utils/HTTPService"
import Utils from "../../Utils/Utils"
const FormItem = Form.Item;
const httpService = new HTTPService();


class AddInfomation extends Component {
	constructor(props){
		super(props);
		this.state = {
			content: "",
			previewVisible: false,
			previewImage: '',
			fileList: [],
			// {
			// 	uid: -1,
			// 	name: 'xxx.png',
			// 	status: 'done',
			// 	url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			// }
		}
	}

	 handlePreview (file){
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}

	onRemove(file){
		console.log(file)
	}

  	handleChange({ fileList }) {
		  console.log(fileList)
		//  if(!fileList[0].response){
		// 	message.error("上传出错")
		// 	return;
		//  }
		 this.setState({ fileList }) 
	} 

	//关闭预览模态框
	handleCancel(){
		this.setState({ previewVisible: false })
	}

	checkConfirm(rule, value, callback) {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
		form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	//提交编辑 
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
		if (!err) {
			console.log('Received values of form: ', values);
			if(this.state.fileList.length == 0){
				message.error('请上传封面图片');
				return;
			}
			if(!this.state.fileList[0].response){
				message.error('上传封面图片失败，请重新上传');
				return;
			}
			values.image = this.state.fileList[0].response.data.filename;
			values.contet = this.getFullHtml(values);
			console.log(values)
			let self = this;

			Modal.confirm({
				title: '新增资讯',
				content:"确定提交编辑的内容吗？",
				onOk:()=>{self.sendContent(values);},
				onCancel() {
					console.log('Cancel');
				},
			})
			//this.sendContent(values);
		}
		});
	}

	resetFields(){

		this.props.form.resetFields();

		this.ueditor.clearContent();
	}

	sendContent(input){
        let self = this;
        let tranCode="addwx/artadd"

        this.setState({
            loading:true
        })

        httpService.commHttp(tranCode,input,function(obj){
            //let listnm = obj.listnm;
            //console.log(listnm)
            // self.setState({
            //     dataSource:listnm
			Modal.success({
				title: '成功',
				content:"新增资讯成功",
			});
			self.resetFields()

        },function(obj){
            message.error(obj);
        },function(){
            //message.error('This is a message of error');
        })
    }

	beforeUpload(file) {
		const isJPG = file.type === 'image/jpeg' || 'image/png';
		if (!isJPG) {
			message.error('只能上传jpg和png类型的图片');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('图片大小不能超过2MB!');
		}
		return isJPG && isLt2M;
	}

	getFullHtml(obj){

		var date = Utils.getFullDate("yyyy-mm-dd");
		let textAlign;
		if(obj.title.length>18){
        	textAlign="left"
        }else{
        	textAlign="center"
        }
        let content = this.ueditor.getContent();	//获取输入html内容
		console.log(content)
		if(!content){
			message.error('请编辑资讯内容');
			return;
		}
        var str = `<html><head><meta charset='utf-8'><body><p style="font-size: 18px;color:#383f4a; font-weight: bold; text-align:${textAlign}">${obj.title}</p>
					<p><span style="font-size: 14px;"><span style="color:#999999;">${date}</span>
					<span style="color: #4285f4;">${obj.tag}</span></span></p>${content}</body></html>`
		return str;			
    }

	uploadImage(e){
		console.log(e)
		var file=e.file;
		//var path=e.target.value;
		let self=this;
		if(file==undefined || e==""){
		Modal.error({
						title: '上传失败',
						content:"请选择文件",
					});
			return false;
		}else{
			let tranCode = "/addwx/fileUpload"
			httpService.commUploadFile(tranCode,file,function(data){
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

	render(){
		const { getFieldDecorator } = this.props.form;
		const { previewVisible, previewImage, fileList } = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">上传</div>
			</div>
		);

		return (
			<div style={{margin: '0 20px 0'}}>

				<Form layout='horizontal'>

                    <FormItem
                        label="标题"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 5 }}
                    >
                        {/*<Input value={this.state.chckna}  />*/}
						    {getFieldDecorator('title', {
									rules: [{
									required: true, message: '请输入we讯标题',
									}, {
									validator: this.checkConfirm.bind(this),
									}],
								})(
									<Input type="text" />
							)}
                    </FormItem>

                    
                    <FormItem
                        label="标签"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 5 }}
                    >
                        {getFieldDecorator('tag', {
								rules: [{
								required: true, message: '请输入we讯标签',
								}, {
								validator: this.checkConfirm.bind(this),
								}],
							})(
								<Input type="text" />
						)}
                        <br />
                    </FormItem>

					<FormItem
                        label="封面图片"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 5 }}
                    >					
								<Upload
									name="file"
									action={httpService.getIp() + "/addwx/fileUpload"}
									fileList={fileList}
									listType="picture-card"
									headers={{"token":sessionStorage.getItem("token")}}
									onPreview={this.handlePreview.bind(this)}
									onRemove={this.onRemove.bind(this)}
									onChange={this.handleChange.bind(this)}
									beforeUpload={this.beforeUpload.bind(this)}
								>
								{fileList.length >= 1 ? null : uploadButton}
							</Upload>
			
							<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
								<img alt="example" style={{ width: '100%' }} src={previewImage} />
							</Modal>
                        <br />
                    </FormItem>

					<FormItem
                        label="内容"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Ueditor ref={(ref)=> this.ueditor = ref}  id="content" style={{height:500}} /> 
                        <br />
                    </FormItem>

					<FormItem
                        wrapperCol={{ offset:3,span: 20 }}
                    >
                        <div className="text_centet">                   

							<Button
								className="submit_btn"
								type="primary"
								size="large"
								onClick = {this.handleSubmit.bind(this)}
								disabled={false}>
									提交
							</Button>
							
						</div> 
                    </FormItem>

                </Form>


				
			</div>	
		)
	}

	submitCheck(){
		let htmlContent = this.ueditor.getContent();
		console.log(htmlContent);
	}

	componentWillUnmount() {
		console.log(13423)

		let tranCode = "addwx/tempdelete"
		let input = {};
        httpService.commHttp(tranCode,input,function(obj){
            //let listnm = obj.listnm;
            //console.log(listnm)
            // self.setState({
            //     dataSource:listnm
			console.log(obj);

        },function(obj){
            message.error(obj);
        },function(){
            //message.error('This is a message of error');
        })
	}
	


	
}

var AddInfomationForm = Form.create()(AddInfomation);

export default  AddInfomationForm;

