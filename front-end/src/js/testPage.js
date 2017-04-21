import React,{Component} from 'react';

const wellStyles = {margin: '30px 20px'};
import "../css/table.css"
export default class addPerson extends Component {
	constructor(props){
		super(props);
		this.key = "1001";
		this.state={
			value:"2321312321"
		}

	}


	render(){

		return(
	       <div style={wellStyles}>
          <div header={this.panelTitle}>
			  <div>{this.state.value}</div>
						<table className="left-table">
							<button >打开模态框23232</button>
						</table>
					</div>
			  </div>
		)
	}
}
