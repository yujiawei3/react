import React from "react";
import {Link} from "react-router-dom";
import PageTitle from "components/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx"
import Mutill from "util/mm.jsx";
import User from "service/usr-service.jsx";
import TableList from "util/table-list/index.jsx"

const _mm = new Mutill()
const _user = new User()
class UserList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			pageNum:1,
			list:[],
		}
	}
	componentDidMount(){
	       this.loadUserList();
	 }
	loadUserList(){
		_user.getUserList(this.state.pageNum).then(res=>{
			this.setState(res)
		}).catch(error=>{
			this.setState({
				list:[]
			})
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
		return(
			<div id="page">
				<PageTitle title={"用户列表"}/>
				<TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>
					{ListBody}
				</TableList>
				<div>
					<Pagination current={this.state.pageNum}
					total={this.state.total}
					onChange={(pageNum)=>this.onPageNum(pageNum)}/>
				</div>
			</div>
		)
	}
}
export default UserList 