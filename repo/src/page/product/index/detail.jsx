import React from "react";
import PageTitle from "components/page-title/index.jsx"
import Mutil from "util/mm.jsx";
import Product from "service/product-service.jsx";
import CategorySelector from "./category-selector.jsx";

const _product = new Product()
const _mm = new Mutil();
class ProductDetail extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			id:this.props.match.params.pid,
			name:"",
			subtitle:'',
			categoryId:0,
			parentCategoryId:0,
			subImages:[],
			price:'',
			stock:'',
			detail:'',
			status:1
		}
	}
	componentDidMount(){
	        this.loadProduct();
	 }
	//编辑
	loadProduct(){
		if(this.state.id){
			_product.getProduct(this.state.id).then(res=>{
				let images = res.subImages.split(',')
				res.subImages = images.map(imgUrl=>{
					return{
						uri :imgUrl,
						url:res.imageHost + imgUrl
					}
				})
				res.defaultDetail = res.detail;
				this.setState(res);
			}).catch(error=>{
				_mm.errorTips(error)
			})
		}
	}
	render(){
		return (
			<div id="page">
				<PageTitle title={"商品详情"}/>
				<div className="shop">
					<div className="shop-list">
						<span>商品名称</span>
						<input type="text"readOnly
						value={this.state.name}/>
					</div>
					<div className="shop-list">
						<span>商品描述</span>
						<input type="text" readOnly
						value={this.state.subtitle}/>
					</div>
					<div className="shop-list">
						<span>所属分类</span>
						<CategorySelector
						readOnly
						categoryId={this.state.categoryId}
						parentCategoryId={this.state.parentCategoryId}/>
					</div>
					<div className="shop-list  desc">
						<span>商品价格</span>
						<div className="ification">
							<input type="number" 
							value={this.state.price}
							readOnly/>
							<div className="price">元</div>
						</div>	
					</div>
					<div className="shop-list  desc">
						<span>商品库存</span>
						<div className="ification">
							<input type="number" readOnly
							  value={this.state.stock}/>
							<div className="price">件</div>
						</div>
					</div>
					<div className="shop-list img">
						<div>
							<span>商品图片</span>
						</div>
						<div  className="upload">
							{
								this.state.subImages.length>0?this.state.subImages.map((val,index)=>{
									return(
											<div key={index}>
												<img src={val.url} />
											</div>
									)
								}):<span className="file">暂无图片</span>
							}
						</div>
					</div>
					<div className="shop-list detail">
						<span>商品详情</span>
						<div dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
					</div>


				</div>
			</div>
		)
	}
}

export default ProductDetail