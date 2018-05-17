import React from "react";
import {Link} from "react-router-dom";
import PageTitle from "components/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx"
import Mutill from "util/mm.jsx";
import User from "service/usr-service.jsx"

const _mm = new Mutill()
const _user = new User()
class UserList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			pageNum:1,
			list:[],
			first:true
		}
	}
	componentDidMount(){
	       this.loadUserList();
	 }
	loadUserList(){
		_user.getUserList(this.state.pageNum).then(res=>{
			this.setState(res,()=>{
				this.setState({
					first:false
				})
			})
		}).catch(error=>{
			_mm.errorTips(error)
		})
	}

	onPageNum(pageNum){
		this.setState({
			pageNum
		},()=>{
			this.loadUserList()
		})
	}
	render(){
		let ListBody = this.state.list.map((val,index)=>{
			return(
				<tr key={index}>
					<td>{val.id}</td>
					<td>{val.user}</td>
					<td>{val.email}</td>
					<td>{val.phone}</td>
					<td>{new Date(val.createTime).toLocaleString()}</td>
				</tr>
			)
		})
		let listError = (
			<tr>
				<td colSpan="5">{this.state.first?" 正在加载......":"未找到结果"}</td>
			</tr>
		)
		let tableBody = this.state.list.length>0 ? ListBody : listError
		return(
			<div id="page">
				<PageTitle title={"用户列表"}/>
				<div className="home">
					<table className="table">
						<thead>
							<tr>
								<th>ID</th>
								<th>用户名</th>
								<th>邮箱</th>
								<th>电话</th>
								<th>注册时间</th>
							</tr>
						</thead>
						<tbody>
							{tableBody}
						</tbody>
					</table>
					<Pagination current={this.state.pageNum}
					total={this.state.total}
					onChange={(pageNum)=>this.onPageNum(pageNum)}/>
				</div>
			</div>
		)
	}
}
export default UserList 