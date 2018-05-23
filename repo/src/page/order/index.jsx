import React from "react";
import {Link} from "react-router-dom";
import PageTitle from "components/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx"
import Mutill from "util/mm.jsx";
import Order from "service/order-service.jsx";
import TableList from "util/table-list/index.jsx"
import ListSearch from "./index-list-search.jsx"

const _mm = new Mutill()
const _order = new Order()
class OrderList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			pageNum:1,
			list:[],
			listType : 'list',
			orderNumber:' '
		}
	}
	componentDidMount(){
	       this.loadOrderList();
	 }
	 //订单
	loadOrderList(){
		let listParam = {
			pageNum:this.state.pageNum,
			listType:this.state.listType
		}
		if(this.state.listType === "search"){
			listParam.orderNo = this.state.orderNumber
		}

		_order.getOrderList(listParam).then(res => {
	            	this.setState(res);
	        }, errMsg => {
	            	this.setState({
	                	list : []
	            	});
	           	 _mm.errorTips(errMsg);
	        });
	}

	onPageNum(pageNum){
		this.setState({
			pageNum
		},()=>{
			this.loadOrderList()
		})
	}

	//查找订单
	onSearch(orderNumber){
		let listType = orderNumber === ' ' ? 'list':"search"
		this.setState({
			listType,
			pageNum:1,
			orderNumber
		},()=>{
			this.loadOrderList()
		})
	}
	render(){
		let ListBody = this.state.list.map((val,index)=>{
			return(
				<tr key={index}>
					<td>
						<Link to={`/order/detail/${val.orderNo}`}>{val.orderNo}</Link>
					</td>
					<td>{val.receiverName}</td>
					<td>{val.statusDesc}</td>
					<td>￥{val.payment}</td>
					<td>{new Date(val.createTime).toLocaleString()}</td>
					<td><Link to={`/order/detail/${val.orderNo}`}>查看</Link></td>
				</tr>
			)
		})
		return(
			<div id="page">
				<PageTitle title={"订单管理"}/>
				<ListSearch onSearch={(orderNumber)=>this.onSearch(orderNumber)}/>
				<TableList tableHeads={['订单号', '收件人', '订单状态', '订单总价', '创建时间','	操作']}>
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
export default OrderList 