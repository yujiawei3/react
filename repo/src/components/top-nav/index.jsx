import React from "react";
import { Link } from "react-router-dom";
import User from "service/usr-service.jsx";
import MUtil  from 'util/mm.jsx'

const _mm   = new MUtil();
const _user = new User();
class TopNav extends React.Component{
	constructor(props){
	       super(props);
	       this.state = {
	            username: _mm.getStorage('userInfo').username || ''
	       }
	 }
	onLogOut(){
		_user.logout().then(res => {
	            _mm.removeStorage('userInfo');
	            window.location.href = '/login';
	        }, errMsg => {
	            _mm.errorTips(errMsg);
	        });
	}
	render(){
		return (
			<div className="navbar">
				<Link to="/" className="nav-left">
					<b>HAPPY</b>
					MMALL
				</Link>
				<div className="nav-right">
					<ul>
						<li className="come">
							<i className="fa fa-user fa-fw"></i>
							 {
			                                this.state.username
			                                ? <span>欢迎，{this.state.username}</span>
			                                : <span>欢迎您</span>
			                           }
							<i className="fa fa-caret-down"></i>
							<ul>
								<li className="user">
									<a onClick={()=>this.onLogOut()}>
				                                    <i className="fa fa-sign-out fa-fw"></i>
				                                    <span>退出登录</span>
				                                </a>
								</li>
							</ul>
						</li>
					</ul>
					
				</div>
			</div>
		)
	}
}
export default TopNav