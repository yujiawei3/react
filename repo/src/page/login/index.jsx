import React from "react";
import Mutil from "util/mm.jsx";
import User from "service/usr-service.jsx";
const _mm = new Mutil()
const _user = new User() 
class Login extends React.Component{
	constructor(props){
		super(props)
		this.state={
			username:' ',
			password:' ',
			redirect: _mm.getUrlParam('redirect') || '/'
		}
	}
	componentWillMount(){
		document.title = '登录 - MMALL ADMIN';
	}
	onInputChange(e){
		let val =  e.target.value;
		let uname = e.target.name
		this.setState({
			[uname]:val
		})
	}
	login(){
		let loginInfo = {
                username : this.state.username,
                password : this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo);
		if(checkResult.status){
			_user.login( loginInfo).then(res=>{
				_mm.setStorage("userInfo",res)
				console.log(this.state.redirect)
				this.props.history.push(this.state.redirect);
			}).catch(error=>{
				_mm.errorTips(error)
			})
		}else{
			_mm.errorTips(checkResult.msg);
		}
		
	}
	render(){
		return(
			<div className="login">
				<div>
					<span>欢迎登录 - MMALL管理系统</span>
					<input
					 name="username"
					 type="text" 
					 placeholder="请输入用户名"
					 onChange={(e)=>this.onInputChange(e)}/>

					<input
					 name="password"
					 type="password"
					 placeholder="请输入密码"
					 onChange={(e)=>this.onInputChange(e)}/>

					<button className="btn" onClick={()=>this.login()}>登录</button>
				</div> 
			</div>
		)
	}
}
export default Login