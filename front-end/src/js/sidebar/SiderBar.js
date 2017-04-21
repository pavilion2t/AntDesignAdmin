import React,{Component} from 'react';
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
import {Link,browserHistory,router} from 'react-router';
import "./../../css/sidebar.css";

export default class Sider extends Component {

    constructor(params){
        super(params)
        this.state = {
            theme: 'dark',
            current: '1',
        }

        this.tree = [
            {
              id:100,
              iconh1: "fa fa-random",
              text: "后台管理",
              icon:"appstore-o",
              nodes: [
                {
                  id:1001,
                  iconh2: "fa fa-calendar",
                  text: "行员信息管理",
                  href: "/home/ManagePerson"
                }, {
                  id:1002,
                  iconh2: "fa fa-expand",
                  text: "网点信息管理",
                  href: "/home/BranchManage"
                }, {
                  id:1003,
                  iconh2: "fa fa-laptop",
                  text: "设备信息管理",
                  href: "/home/manageDevice"
                },
                {
                  id:1004,
                  iconh2: "fa fa-laptop",
                  text: "调查问券管理",
                  href: "/home/manageSurvey"
                },{
                  id:1005,
                  iconh2: "fa fa-laptop",
                  text: "设备故障处理",
                  href: "/home/deviceProcess"
                },{
                  id:1006,
                  iconh2: "fa fa-laptop",
                  text: "发送信息",
                  href: "/home/sendmsg"
                },
                {
                  id:1007,
                  iconh2: "fa fa-user",
                  text: "网点检查管理",
                  icon:"safety",
                  nodes:[
                    {
                      id:1101,
                      iconh3: "fa fa-calendar",
                      text: "网点检查指标",
                      href: "/home/checkStandard"
                    }, {
                      id:1102,
                      iconh3: "fa fa-calendar",
                      text: "网点参数指标",
                      href: "/home/standardManage"
                    }
                  ]
                },{
                  id:1008,
                  iconh2: "fa fa-user",
                  text: "网点资讯管理",
                  icon:"copy",
                  nodes:[
                    {
                      id:1201,
                      iconh3: "fa fa-calendar",
                      text: "添加资讯",
                      href: "/home/addInformation"
                    }, {
                      id:1202,
                      iconh3: "fa fa-calendar",
                      text: "资讯管理",
                      href: "/home/InfomationManage"
                    }
                  ]
                },{
                  id:1009,
                  iconh2: "fa fa-user",
                  text: "金融学堂管理",
                  href: "/home/CourseManage"
                }
              ]
            }, {
              id:2000,
              flag: "fa fa-bar-chart-o",
              text: "数据分析",
              icon:"line-chart",
              nodes: [
                {
                  id:2101,
                  iconh2: "fa fa-calendar",
                  text: "网点人员结构分析",
                  href: "/home/personStrcAnalysis"
                }, {
                  id:2102,
                  iconh2: "fa fa-expand",
                  text: "业务系统",
                  href: "/home/businessSystem"
                }, {
                  id:2103,
                  iconh2: "fa fa-laptop",
                  text: "自动化编译部署",
                  href: "/home/AutoDeploy"
                }, {
                  id:2104,
                  iconh2: "fa fa-user",
                  text: "新增用户",
                  href: "/home/addPerson"
                }
              ]
            }, {
              id:3000,
              iconh1: "fa fa-list-alt",
              text: "运营报表",
              icon:"database",
              nodes: [
                {
                  id:3101,
                  iconh2: "fa fa-tags",
                  text: "向导",
                  href: "/home/wizard"
                }
              ]
            }
          ]
    }

  changeTheme(value){
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  handleClick(e){
    console.log('click', e);
    //browserHistory.push(e.href);

    this.setState({
      current: e.key,
    });
  }

  //生成主菜单和二级菜单
  generateMenu(data){
    let menu;
    let menuArr = data;
    if(menuArr == undefined || menuArr.length<1){
			return null;
		}else{
      menu = menuArr.map((value,index)=>{
            let subMenu;
            if(value.nodes){
              // subMenu = value.nodes.map((val,idx) => {

              //     let temp;
              //     if(val.nodes){ //判断是否为结点
              //       temp =  this.renderSubMenu(val);  //获取子级菜单

              //     } else {

              //       temp = (<Menu.Item key={val.id}><Link to={{pathname: val.href, state: { title: val.text }}}>{val.text}</Link></Menu.Item>)

              //     }
              //     //console.log(temp);
              //     return temp;
              // })
              subMenu = this.generateMenu(value.nodes);
              value = (<SubMenu key={value.id}  title={<span><Icon type={value.icon}/><span>{value.text}</span></span>}>
                      {subMenu}
                    </SubMenu>)

            } else {
              value = (<Menu.Item key={value.id}><Link to={{pathname: value.href, state: { title: value.text }}}>{value.text}</Link></Menu.Item>)
            }

/*
            value = (
              <SubMenu key={value.id}  title={<span><Icon type="folder" /><span>{value.text}</span></span>}>
                 {subMenu}
              </SubMenu>
            )*/

            return value;

      })

    }
    return menu;
  }


  render() {
    let menuArr = this.tree;
    let menu  = this.generateMenu(menuArr);

    return (
      <div>
        <Menu
          theme={'dark'}
          onClick={(e)=>this.handleClick(e)}
          style={{ width: 230 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
          className = "sidebar"
        >
            {menu}
        </Menu>
      </div>
    );
  }


}
