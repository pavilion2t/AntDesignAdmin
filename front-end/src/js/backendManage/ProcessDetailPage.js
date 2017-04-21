import React,{Component} from 'react';
import { Row, Col ,Form,Input,Button,Icon,Select,Table} from 'antd';
import {Link,browserHistory,router} from 'react-router';
import WelcomePage from './../WelcomePage.js'
import HTTPService from './../Utils/HTTPService'
import AssignModal from './AssignModal.js'
const FormItem = Form.Item;
const Option = Select.Option;
let httpService = new HTTPService();
const data = [];


export default class ProcessDetailPage extends Component {
	constructor(props){
		super(props);
		this.propsData=this.props.location.state;
        console.log("构造方法========>"+this.propsData.brokid)
        this.state = {
            dataSource : [],
        }

	}

    checkInfo(){
        browserHistory.push({pathname:"/home/processDetail",state:{title:"测试页面"}});
    }


    handleTableChange(pagination, filters, sorter) {
        console.log(12324);
        const pager = this.state.pagination;
        pager.current = pagination.current;
        console.log(pager)
        this.setState({
            pagination: pager,
        });
        // this.fetch({
        //     results: pagination.pageSize,
        //     page: pagination.current,
        //     sortField: sorter.field,
        //     sortOrder: sorter.order,
        //     ...filters,
        // });
    }

	componentDidMount(){
        let brokid = this.propsData.brokid;
        this.getDetail(brokid);
	}

    componentDidUpdate(prevProps, prevState) {
        // console.log("changed==============")
    }
    

    handleSubmit(e){

    }

    getDetail(brokid){
        //console.log("========>"+ brokid)
        let self = this;
        let tranCode="deviFailDeal/getBorkDetail"
        var input={
            brokid:brokid
        }

        httpService.commHttp(tranCode,input,function(obj){
            let listnm = obj.listnm;
            console.log(obj)
            //console.log(listnm)
            // self.setState({
            //     dataSource:listnm
            // })
            self.processData(obj);
        },function(obj){

        },function(){

        })
    }

    processData(data){
        let imageArr,listnm;
        if(data.images){
            //data.images = httpService.getIp() + data.images;
            let tempArr = data.images.split(",");
            imageArr = tempArr.map((value,index) => {
                value =  httpService.getIp() + value;
                return value;
            })
        } else {
            imageArr = false;
        }

        if(data.listnm){
            listnm = data.listnm.map((value,index) => {
                //value.CONTET = httpService.getIp() + value.CONTET; 
                if(value.MESGTP=="03"){
                    value.CONTET = httpService.getIp() + value.CONTET; 
                }
                value.IMGPATH =  httpService.getIp() + value.IMGPATH;
                return value;
            })
        }

        if(data.status=="2"){
            data.status = "已解决";
        } else if(data.status=="0"){
            data.status = "未处理";
        } else if(data.status=="1"){
            data.status = "进行中";                
        } else if(data.status=="3"){
            data.status = "已删除";
        }

        if(data.devitp=="01"){ 
            data.devitp = "ATM";
        } else if(data.devitp == "02"){
            data.devitp = "VTM";
        } else if(data.devitp == "03"){
            data.devitp = "取号机";
        } else if(data.devitp == "04"){
            data.devitp = "预填单机";
        } else if(data.devitp == "05"){
            data.devitp = "柜面";
        } else {
            data.devitp = "移动网点管理";
        }

        this.setState({
            brchna:data.brchna,
            userna:data.userna,
            trandt:data.trandt,
            devitp:data.devitp,
            contet:data.contet,
            status:data.status, 
            devitp:data.devitp,
            images:data.images, 
            deviid:data.deviid,
            images:imageArr,
            listnm:listnm
        })

        console.log(this.state)
    }

    componentWillReceiveProps(nextProps){
        console.log("============"+ nextProps.location.state.brokid)
        this.getDetail(nextProps.location.state.brokid);
    }

    assignTask(){
        // let dataSource = [...this.state.dataSource];
        // console.log(dataSource[index]);

        this.assignModal.openModal(this.state);
    }

	render(){

        let imageRow,images,handleList,handleInfo;
        if(this.state.images){

            images = this.state.images.map((value,index)=>{
                return  (<img key={index} src={value} />);                   
            })

            imageRow = (
                    <tr  style={{height:30}}>
                        <td>图片:</td>
                        <td name="images" className="imagesCell">
                            {images}
                        </td>
                    </tr>
            )

        } else {
            imageRow = null;
        }

        if(this.state.listnm){
            handleList = this.state.listnm.map((value,index)=>{
                if(value.MESGTP == "00"){
                    handleInfo = value.CONTET;
                } else if(value.MESGTP == "02"){
                    handleInfo = value.CONTET;
                } else if(value.MESGTP == "03"){
                    handleInfo = (
                        <audio  className="relcontet" controls="controls">
                            <source  src={value.CONTET} type="audio/mpeg"/>
                        </audio>
                    );
                }
                value = (<tr key={index}>
                            <td colSpan="2">
                                <div className="cla">
                                    <div className="cla2">
                                        <img className="report_img" src="http://vcs.dev.sunline.cn:8180/dgrcbmobile/picture/554a7299cbf1487f8a854f4aef0eca42.jpg"/>
                                    </div>
                                    <div className="handerName">
                                        <span>步晓芳</span>
                                        <span className="claspan">20170214 17:47:42</span>
                                    </div><br/>
                                    <div className="InfoType">
                                        {handleInfo}
                                    </div>
                                </div>
                            </td>
                        </tr>)
                return value;            
            })
        }

		return(

	   		<div style={{margin: '0 20px 0'}}>

               <table cellSpacing="0" className="toptable">
                    <thead>
                        <tr>
                            <th  colSpan="2" style={{height:45}}>
                                <div className="detail_title">
                                    <span name="userna">{this.state.userna}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上报于&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span name="trandt">{this.state.trandt}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span name="dealstatus">{this.state.status}</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td>设备编号:</td>
                            <td>
                                <span name="deviid">{this.state.deviid}</span>
                            </td>
                        </tr>
                        <tr style={{width:150 ,height:30}}>
                            <td>设备类型:</td>
                            <td>
                                <span name="devitp">{this.state.devitp}</span>
                            </td>
                        </tr>
                        <tr style={{width:150 ,height:30}}>
                            <td>所属网点:</td>
                            <td>
                                <span name="brchna">{this.state.brchna}</span>
                            </td>
                        </tr>
                        <tr style={{width:150 ,height:30}}>
                            <td style={{margin: 0}}>
                                <div>
                                    故障描述:
                                    <div>
                                    </div>
                            </div>
                            </td>
                            <td >
                                <span name="contet">{this.state.contet}</span>
                            </td>

                        </tr>

                        {imageRow}

                        <tr name="deal" style={{width:150 ,height:30}}>
                            <td colSpan="2">处理记录:</td>
                            
                        </tr>
                        {/*<tr>
                            <td colSpan="2">
                                <div className="cla">
                                    <div className="cla2">
                                        <img className="report_img" src="http://vcs.dev.sunline.cn:8180/dgrcbmobile/picture/554a7299cbf1487f8a854f4aef0eca42.jpg"/>
                                    </div>
                                    <div className="handerName">
                                        <span>步晓芳</span>
                                        <span className="claspan">20170214 17:47:42</span>
                                    </div><br/>
                                    <div className="InfoType">
                                        <audio className="relcontet" controls="controls">
                                            <source src="http://vcs.dev.sunline.cn:8180/dgrcbmobile/sound/ac7172264efb48f8871e4ec1911e4b15.m4a" type="audio/mpeg"/>
                                        </audio>
                                    </div>
                                </div>
                            </td>
                        </tr>*/}
                        {handleList}
                        <tr>
                            <td className="assign_btn" colSpan="2">
                                <Button type="primary" onClick={this.assignTask.bind(this)} id="atper">
                                    
                                    <span className="l-btn-text">指派</span>
                                        
                                </Button>
                            </td>
                        </tr>

                    </tbody>
                </table>
                 <AssignModal ref={(ref) => this.assignModal = ref} />   
			</div>


		)
	}





}

