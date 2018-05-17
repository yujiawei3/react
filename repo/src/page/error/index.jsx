import React from "react";
import PageTitle from "components/page-title/index.jsx";
import {Link} from "react-router-dom";


class ErrorPage extends React.Component{
	render(){
		return(
			<div id="page">
				<PageTitle title={"出错啦!"}/>
				<div className="home">
					<div>
						<span>找不到该路径，</span>
                        			<Link to="/">点我返回首页</Link>
					</div>
				</div>
				
			</div>
		)
	}
}
export default ErrorPage