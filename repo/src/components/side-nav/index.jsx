import React from "react";
import {Link,NavLink} from "react-router-dom"

class SideNav extends React.Component{
	render(){
		return (
			<div className="navbar-side">
				<ul>
					<li>
						<NavLink to="/" exact activeClassName="active">
							<i className="fa fa-bar-chart-o"></i>
							<span>首页</span>
						</NavLink>
					</li>
					<li>
						<Link to="/product" >
							<i className="fa fa-list"></i>
	                               		<span>商品</span>
						</Link>
						
	                                <ul>
		                                	<li>
		                                		<NavLink to="/product" activeClassName="active">商品管理</NavLink>
		                                	</li>
		                                	<li>
		                                		<NavLink to="/product-category" activeClassName="active">品类管理</NavLink>
		                                	</li>
	                                </ul>
					</li>
					<li>
						<Link to="/order">
							<i className="fa fa-check-square-o"></i>
	                                		<span>订单</span>
						</Link>
	                                <ul>
	                                		<li>
	                                			<NavLink to="/order" activeClassName="active">订单管理</NavLink>
	                                		</li>
	                                </ul>
					</li>
					<li>
						<Link to="/user" >
							<i className="fa fa-user-o"></i>
	                                		<span>用户</span>
						</Link>
	                                <ul>
	                                		<li>
	                                			<NavLink to='/user' activeClassName="active">用户管理</NavLink>
	                                		</li>
	                                </ul>
					</li>
				</ul>
			</div>
		)
	}
}
export default SideNav