1.Utils里面新增日期处理函数，支持“yyyymmdd hh:mm:ss” "yyyy-mm-dd hh:mm:ss" "yyyy/mm/dd hh:mm:ss" “yyyymmdd” “yyyy年mm月dd日”格式    

2.css引入的时候用import从js文件中引入不用从index.html引入    

3.新增common.js  修改框架默认样式的文件是公共样式     

4.如果在tab页内部需要新增tab页面  在main.js中设置路由  再在触发的事件中使用push方法跳转过去  详情请参考DeviceProcess.js 中的跳转
