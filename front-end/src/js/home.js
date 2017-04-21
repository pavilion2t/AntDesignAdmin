import React,{Component} from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router';
import HeaderBar from "./headerBar/Header.js"
import SiderBar from './sidebar/SiderBar.js'
import TabControl from './sidebar/TabControl.js'

export default class home extends Component {
	constructor(props){
		super(props);
		this.propsData=this.props.location.state.name;
        //console.log(this.propsData.username)
	}
	componentDidMount(){
		//console.log(this.propsData)
	}
	render(){

		return(

	   		<div style={{paddingLeft:230,}}>

		    	
				    <Row className="show-grid">
				        <Col>

							<SiderBar/>

				        </Col>
				        <Col style={{paddingTop:0}}>
				        	<div style={{left:0,top:0,marginBottom:10}}>
				        		<HeaderBar userState = {this.propsData}/>
				        	</div>
							
							<TabControl componentPage = {this.props.children}/>
				      		
						</Col>
				    </Row>
				

			</div>


		)
	}





}
