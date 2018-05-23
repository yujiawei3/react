import React from "react";
import PageTitle from "components/page-title/index.jsx"
import Mutil from "util/mm.jsx"
import Product from "service/product-service.jsx"

const _mm = new Mutil()
const _product = new Product()
class CategoryAdd extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list:[],
			parentId:0,
			categoryName:''
		}
	}
	
	componentDidMount(){
		this.loadList()
	}
	loadList(){
		_product.getCategotyList().then(res=>{
			this.setState({
				list:res
			})
			console.log(res)
		}).catch(error=>{
			_mm.errorTips(error)
		})
	}
	onValueChange(e){
		let names = e.target.name,
			value = e.target.value.trim()
		this.setState({
			[names]:value
		})
	}
	onSubmit(){
		let data={
			parentId:this.state.parentId,
			categoryName:this.state.categoryName.trim()
		}
		if(data.categoryName){
			_product.saveCategory(data).then(res=>{
				_mm.successTips(res);
				this.props.history.push('/product-category/index')
			}).catch(error=>{
				_mm.errorTips(error)
			})
		}else{
			 _mm.errorTips('请输入品类名称');
		}
		
	}
	render(){
		return(
			<div id="page">
				<PageTitle title={"品类管理 -- 添加品类"}/>
				<div className="shop">
					<div className="shop-list">
						<span>所属品类</span>
						<select name="parentId"
						onChange={(e)=>this.onValueChange(e)}>
							<option value="0">根品类/</option>
							{
								this.state.list.map((val,index)=>{
									return(<option value={val.id} key={index}>{val.name}</option>)
								})
							}
						</select>
					</div>
					<div className="shop-list">
						<span>品类名称</span>
						<input type="text" name="categoryName" className="add" placeholder="请输入品类名称"
						onChange={(e)=>this.onValueChange(e)}/>
					</div>
					<div className="shop-list">
						<button className="sub" onClick={()=>this.onSubmit()}>提交</button>
					</div>
				</div>
				
					
			</div>
		)
	}
}

export default CategoryAdd