import React from "react";
import TopNav from "components/top-nav/index.jsx";
import SideNav from "components/side-nav/index.jsx";
import "./index.css";
class Layout extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div> 
				<TopNav/>
				<SideNav/>
				{this.props.children}
			</div>
		)
	}
}
export default Layout