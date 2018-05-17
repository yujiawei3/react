import React from "react"
import RCPagination from"rc-pagination";
import "rc-pagination/dist/rc-pagination.min.css";

 class pagination extends React.Component{
 	constructor(props){
 		super(props)
 	}
 	render(){
 		return(
 			<RCPagination {...this.props} hideOnSinglePage showQuickJumper/>
 		)
 	}
 }
 export default pagination