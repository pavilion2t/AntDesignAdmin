
class Util {
    constructor(props){
        this.params = {};
        this._ISINTYPEPAGE=false;
        //当前Page
        this.curPage = null;
        //页面堆栈
        this.pageStack = [];
        //登陆堆栈的route
        this.loginRoute=null;
        this.navigator = null;
        this.loginPage = null;
    }


    log(data){
        console.log(data);
    }


    isTab(){
      return this._ISINTYPEPAGE;
    }

    isJsonStr(str){
        if(typeof str !== 'string')return false;
        if(str.length == 0)
            return false;
        else{
            if(str.slice(0,1) == '{' && str.slice(-1) == '}' ||
                str.slice(0,1) == '[' && str.slice(-1) == ']')
                return true;
        }
        return false;
    }

    stringify(value){
        let result = '';
        if(typeof value === 'object')
            result = JSON.stringify(value);
        else if(typeof value === 'undefined')
            result = undefined;
        else
            result = value.toString();

        return result;
    }

    parse(value){
        if(value === null)
            return null;
        if(value === undefined)
            return undefined;
        if(typeof value === 'string'){
            if(this.isJsonStr(value)){
                return JSON.parse(value);
            }else{
                if('undefined' == value)
                    return undefined;
                if('false' == value)
                    return false;
                if('true' == value)
                    return true;
            }
        }

        return value;
    }



    /**
     * 保存键值对到内存中
     */
    setValue(key,value){

      this.params[key] = value;

    }

    /**
     * 从内存中读取值
     */
    getValue(key){
        return this.params[key];
    }


    //获得日期
    getFullDate(type){
        var date = new Date();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();  
        var str;
        // if(type == "yyyymmdd hh:mm:ss"){
        //     str = date.getFullYear().toString() + (month<10?"0"+month:month).toString() + 
        //     (day<10?"0"+day:day).toString()+" "+(hours<10?"0"+hours:hours).toString()+":"+
        //     (minutes<10?"0"+minutes:minutes).toString()+":"+(seconds<10?"0"+seconds:seconds).toString();
        //  } else {

        //     str = date.getFullYear().toString() + (month<10?"0"+month:month).toString() + (day<10?"0"+day:day).toString();
        // }
        function formatTime(rules){
            let str;
            if(rules != "zh"){
                str = date.getFullYear().toString() + rules + (month<10?"0"+month:month).toString() + rules +
                (day<10?"0"+day:day).toString()+" "+(hours<10?"0"+hours:hours).toString()+":"+
                (minutes<10?"0"+minutes:minutes).toString()+":"+(seconds<10?"0"+seconds:seconds).toString();
            } else {
                str = date.getFullYear().toString() + "年" + (month<10?"0"+month:month).toString() + "月" +
                (day<10?"0"+day:day).toString()+ "日"+" "+(hours<10?"0"+hours:hours).toString()+":"+
                (minutes<10?"0"+minutes:minutes).toString()+":"+(seconds<10?"0"+seconds:seconds).toString();
            }

            return str;
        }


        switch (type) {
            case "yyyy-mm-dd hh:mm:ss":
                str = formatTime("-");
                break;
            case "yyyy/mm/dd hh:mm:ss":
                str = formatTime("/");
                break;     
            case "yyyymmdd hh:mm:ss":
                str = formatTime("");
                break;
            case "zh":
                str = formatTime("zh");
                break;       
            case "yyyymmdd":
                str = date.getFullYear().toString() + (month<10?"0"+month:month).toString() + (day<10?"0"+day:day).toString();
                break;  
            case "yyyy-mm-dd":
                str = date.getFullYear().toString() +"-"+ (month<10?"0"+month:month).toString() +"-"+ (day<10?"0"+day:day).toString();
                break;      
            default:
                str = date.getFullYear().toString() + (month<10?"0"+month:month).toString() + (day<10?"0"+day:day).toString();
                break;
        }

        return str;
    }
    //获得日期
    getFullDate2(){
        var date = new Date();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var str = date.getFullYear().toString()+"."+ (month<10?"0"+month:month).toString() +"."+ (day<10?"0"+day:day).toString();
        return str;
    }
    getCurYear(){
      let date = new Date();
      let curYear = date.getFullYear().toString();
      return curYear
    }

    toThousands(num) {
        var num = num.toFixed(2);
        var temp="";
        var result = num.split(".");
        var smaller=result[1];
        result=result[0];
        while (result.length > 3) {
            temp = ',' + result.slice(-3) + temp;
            result = result.slice(0, result.length - 3);
        }
        if (result) { result = result+temp +"."+smaller; }
        return result;
    }


    //自动保留两位小数
	 formatNum2(val){
        var s = val.toString();
        var rs = s.indexOf('.');
        if(rs < 0){
          rs = s.length;
          s += ".";
        }

        while(s.length <= rs + 2){
          s += '0';
        }
        return s;
    }

    accMul(arg1,arg2){
      var m=0,s1=arg1.toString(),s2=arg2.toString();
      try{m+=s1.split(".")[1].length}catch(e){}
      try{m+=s2.split(".")[1].length}catch(e){}
      return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    }

    //限制数字格式输入
    checkNum(v){
      var str = "";
      str = v.toString().replace(/[^\d.]/g, "")
      //以0开头的只能输入一位
      .replace(/^0{2,}/,"0")
      .replace(/^0(\d+)/,"0")
      //不能以.开头
      .replace(/^\./g, "")
      //只允许一个小数点
      .replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "")
      .replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      return str;
    }

    //检测邮箱
    checkEmail(str){
        var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var result=reg.test(str);
        return result;
    }

    clone(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            var i = 0;
            for (var len = obj.length; i < len; ++i) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

  
    //保留两位小数
    formatNum2(val){
      var s = val.toString();
      var rs = s.indexOf('.');
      if(rs < 0){
        rs = s.length;
        s += ".";
      }

      while(s.length <= rs + 2){
        s += '0';
      }

      return s;
    }

    limitChar(val){
      var str = val.replace(/^[\u4E00-\u9FA5]+/g,'');
      return str;
    }

    isEmail(email){
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

}

const Utils = new Util();
export default Utils;
