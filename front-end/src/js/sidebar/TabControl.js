import React,{Component} from 'react';
import { Tabs,Modal } from 'antd';
import TestPage from './../TestPage.js'
import WelcomePage from './../WelcomePage.js'

const TabPane = Tabs.TabPane;
const panes = [
    { title: '首页', content: <WelcomePage/>, key: '0', closable: false },
];

export default class TabControl extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
   
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange(activeKey) {
    this.setState({ activeKey });
  }
  //props变化时触发
  componentWillReceiveProps(nextProps) {

      console.log(nextProps)
      let tabArr = this.state.panes;
      let title = nextProps.componentPage.props.location.state.title;
      let key,isRepeat;

      for(let i=0;i<tabArr.length;i++){
        if(tabArr[i].title == title){ //如果当前tab页里面存在则直接跳转到原来的页面  否则打开一个新的tab页
          key = tabArr[i].key;
          tabArr[i].content = nextProps.componentPage;
          isRepeat = true;
          this.setState({
            activeKey:key,
            //panes:tabArr
          })
          return;
        }
        
      }
      
      if(!this.props.componentPage){
        this.add(nextProps.componentPage)
        return;
      } 

      if(!isRepeat){
        this.add(nextProps.componentPage)
      }
      
  }

  
  componentDidUpdate (prevProps, prevState) {
      //console.log(this.props.componentPage)
  }
  

  onEdit(targetKey, action) {
    if(targetKey == "添加资讯"){   //判断是否为添加资讯页面  提示用户是否放弃当前的编辑
      this.leaveEdit(targetKey);
      return;
    }

    console.log(action)
    this[action](targetKey)
  }

  add(data){
    //if(data)
    let title;
    if(data.flag){
      title = data.title
    }else{

      title = data.props.location.state.title;
    }
    const panes = this.state.panes;
    const activeKey = title;
    panes.push({ title: title, content: data, key: activeKey });
    this.setState({ panes, activeKey });
  }

  //删除tab页
  remove(targetKey){

    let activeKey = this.state.activeKey;
    let lastIndex = activeKey.length - 1;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  leaveEdit(targetKey){
    Modal.confirm({
			title: '新增资讯',
			content:"是否放弃当前的编辑",
      onOk:() => this.remove(targetKey),
		})
  }

  componentWillUnmount() {
    var panes=this.state.panes;
    if(panes.length>1){
      panes.splice(1,panes.length-1);
    }
    this.state.panes=panes
  }

  render() {
    let tabPaneList;

    tabPaneList = this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
        {/*{
           React.cloneElement(pane.content, {
            addTab: this.add.bind(this),
          })
        }*/}
        {pane.content}
      </TabPane>)

    return (
      <Tabs
        hideAdd
        onChange={this.onChange.bind(this)}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit.bind(this)}
      >
          {tabPaneList}
      </Tabs>
    );
  }
}
