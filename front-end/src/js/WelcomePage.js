import React,{Component} from 'react';
import { Row, Col } from 'antd';


export default class WelcomePage extends Component {
	constructor(props){
		super(props);
	}
    
	componentDidMount(){
	}

	render(){

		return(

	   		<div>
               <img  className="welcome_box" src={require("./../img/welcome.png")}/>
			</div>


		)
	}





}

