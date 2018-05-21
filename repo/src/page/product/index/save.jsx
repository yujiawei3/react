import React from "react";
import PageTitle from "components/page-title/index.jsx"
import Mutil from "util/mm.jsx";
import Product from "service/product-service.jsx";
import CategorySelector from "./category-selector.jsx";
import FileUploader from "util/file-upload/index.jsx";
import RichEditor from "util/rich-editor/index.jsx";

const _product = new Product()
const _mm = new Mutil();
class ProductSave extends React.Component{
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
	// 选择器
	onCategoryChangable(firstCategoryId,secondCategoryId){
		this.setState({
			categoryId:firstCategoryId,
			parentCategoryId:secondCategoryId
		})
	}
	//上传图片成功
	onUploadSuccess(res){
		this.setState({
			subImages:[...this.state.subImages,res]
		})
	}
	//上传图片失败
	onUploadError(error){
		_mm.errorTips(error)
	}
	//删除图片
	onImageDelete(e){
		let index = parseInt(e.target.getAttribute('index')),
			list = this.state.subImages
		list.splice(index,1)
		this.setState({
			subImages:list
		})
	}
	//富文本
	onDetailValueChange(value){
		this.setState({
	            detail: value
	       });
	}
	getSubImagesString(){
		return this.state.subImages.map(val=>val.uri).join(',')
	}
	//获取表单的值
	onValueChange(e){
		let names = e.target.name,
			value =e.target.value.trim()
		this.setState({
			[names]:value
		})
	}
	//提交
	onSubmit(){
		let product = {
			name:this.state.name,
			subtitle:this.state.subtitle,
			categoryId: parseInt(this.state.categoryId),
			subImages:this.getSubImagesString(),
			price: parseFloat(this.state.price),
			stock:parseInt(this.state.stock),
			detail:this.state.detail,
			status:this.state.status,
		}
		let productCheckResult = _product.checkProduct(product)
		if(this.state.id){
			product.id = this.state.id
		}
		if(productCheckResult.status){
			_product.saveProduct(product).then(res=>{
				_mm.successTips(res);
                		this.props.history.push('/product/index');
			}).catch(error=>{
				_mm.errorTips(error)
			})
		}else{
			_mm.errorTips(productCheckResult.msg)
		}
	}
	render(){
		return (
			<div id="page">
				<PageTitle title={"商品管理 -- 添加商品"}/>
				<div className="shop">
					<div className="shop-list">
						<span>商品名称</span>
						<input type="text" placeholder="请输入商品名称"
						name="name"
						value={this.state.name}
						onChange={(e)=>this.onValueChange(e)}/>
					</div>
					<div className="shop-list">
						<span>商品描述</span>
						<input type="text" placeholder="请输入商品描述"
						name="subtitle"
						value={this.state.subtitle}
						onChange={(e)=>this.onValueChange(e)}/>
					</div>
					<div className="shop-list">
						<span>所属分类</span>
						<CategorySelector
						categoryId={this.state.categoryId}
						parentCategoryId={this.state.parentCategoryId}
						onCategoryChangable={(firstCategoryId,secondCategoryId)=>this.onCategoryChangable(firstCategoryId,secondCategoryId)}/>
					</div>
					<div className="shop-list  desc">
						<span>商品价格</span>
						<div className="ification">
							<input type="number" placeholder="价格"
							 name="price"
							 value={this.state.price}
							 onChange={(e)=>this.onValueChange(e)}/>
							<div className="price">元</div>
						</div>	
					</div>
					<div className="shop-list  desc">
						<span>商品库存</span>
						<div className="ification">
							<input type="number" placeholder="库存"
							 name="stock"
							  value={this.state.stock}
							 onChange={(e)=>this.onValueChange(e)}/>
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
												<i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
											</div>
											
										
									)
								}):<span className="file">请上传图片</span>
							}
						</div>
						<FileUploader 
						onSuccess={res=>this.onUploadSuccess(res)}
						onError={error=>this.onUploadError(error)}/>
					</div>
					<div className="shop-list detail">
						<span>商品详情</span>
						<RichEditor
						defaultDetail={this.state.defaultDetail}
		                          onValueChange={value=> this.onDetailValueChange(value)}/>
					</div>

					<div className="shop-list">
						<button className="sub" onClick={()=>this.onSubmit()}>提交</button>
					</div>

				</div>
			</div>
		)
	}
}

export default ProductSave