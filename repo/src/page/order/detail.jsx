import React        from 'react';
import MUtil        from 'util/mm.jsx'
import Order        from 'service/order-service.jsx'
import PageTitle    from 'components/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

const _mm           = new MUtil();
const _order        = new Order();
class OrderDetail extends React.Component{
	constructor(props){
		super(props)
		this.state={
			orderNumber:this.props.match.params.orderNumber,
			orderInfo:''
		}
	}
	componentDidMount(){
		this.loadOrderDetail();
	}
	loadOrderDetail(){
		_order.getOrderDetail(this.state.orderNumber).then(res=>{
			console.log(res)
			this.setState({
				orderInfo:res
			})
		}).catch(error=>{
			_mm.errorTips(error)
		})
	}
	//发货
	onSendGoods(){
		if(window.confirm('是否确认该订单已经发货？')){
			_order.sendGoods(this.state.orderNumber).then(res=>{
				_mm.successTips(res)
				this.loadOrderDetail()
			}).catch(error=>{
				_mm.errorTips(res)
			})
		}
	}
	render(){
		let 	receiverInfo = this.state.orderInfo.shippingVo      || {},
            		productList  = this.state.orderInfo.orderItemVoList || [];
		return(
			<div id="page">
				<PageTitle title={"订单详情"}/>
				<div className="shop">
					<div className="shop-list">
						<span className="shopDetail">订单号：</span>
						<p>{this.state.orderInfo.orderNo}</p>
					</div>
					<div className="shop-list">
						<span className="shopDetail">创建时间：</span>
						<p>{this.state.orderInfo.createTime}</p>
					</div>
					<div className="shop-list">
						<span className="shopDetail">收件人：</span>
						<p> 
							{receiverInfo.receiverName}，
		                                 {receiverInfo.receiverProvince} 
		                                 {receiverInfo.receiverCity} 
		                                 {receiverInfo.receiverAddress} 
		                                 {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
	                                </p>
					</div>
					<div className="shop-list">
						<span className="shopDetail">订单状态：</span>
						<p>
							{this.state.orderInfo.statusDesc}
							{
								 this.state.orderInfo.status === 20?
								<button className="sub" onClick={()=>this.onSendGoods()}>发货</button> : null
							}		
						</p>
						
					</div>
					<div className="shop-list">
						<span className="shopDetail">支付方式：</span>
						<p> {this.state.orderInfo.paymentTypeDesc}</p>
					</div>
					<div className="shop-list">
						<span className="shopDetail">订单金额：</span>
						<p>￥{this.state.orderInfo.payment}</p>
					</div>
				</div>
				<TableList tableHeads={['商品图片', '商品信息', '单价', '数量', '合计']}>
						 {
		                                 productList.map((product, index) => {
		                                        return (
		                                            <tr key={index}>
		                                                <td>
		                                                    <img className="p-img"  alt={product.productName}
		                                                        src={`${this.state.orderInfo.imageHost}${product.productImage}`}/>
		                                                </td>
		                                                <td>{product.productName}</td>
		                                                <td>￥{product.currentUnitPrice}</td>
		                                                <td>{product.quantity}</td>
		                                                <td>￥{product.totalPrice}</td>
		                                            </tr>
		                                        );
		                                 })
                               		 }
				</TableList>
			</div>
		)
	}
}
export default OrderDetail