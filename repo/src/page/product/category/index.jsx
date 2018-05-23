import React from "react";
import {Link} from "react-router-dom";
import PageTitle from "components/page-title/index.jsx";
import Mutill from "util/mm.jsx";
import Product from "service/product-service.jsx";
import TableList from "util/table-list/index.jsx"

const _mm = new Mutill()
const _product = new Product()
class CategoryList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list:[],
			parentCategoryId:this.props.match.params.category || 0
		}
	}
	componentDidMount(){
	       this.loadUserList();
	 }
	 componentDidUpdate(prevProps,prevState){
	 	let 	oldPath = prevProps.location.pathname,
            		newPath = this.props.location.pathname,
	            	newId   = this.props.match.params.categoryId || 0;
	        if(oldPath !== newPath){
	            this.setState({
	                parentCategoryId : newId
	            }, () => {
	                this.loadUserList();
	            });
	        }
	 }
	 componentWillUnmount(){
	    this.setState = (state,callback)=>{
	      	return;
	    };
	}
	loadUserList(){
		_product.getCategoryList(this.state.parentCategoryId).then(res=>{
			this.setState({
				list:res
			})
		}).catch(error=>{
			this.setState({
				list:[]
			})
			_mm.errorTips(error)
		})
	}
	onUpdateName(e,categoryId,categoryName){
		e.preventDefault();
		let newName = window.prompt("请输入新的品类名称",categoryName)
		if(newName){
			_product.updateCategoryName({
				categoryId,
				categoryName:newName
			}).then(res=>{
				_mm.successTips(res)
				this.loadUserList()
			}).catch(error=>{
				_mm.errorTips(error)
			})
		}
	}
	render(){
		let ListBody = this.state.list.map((val,index)=>{
			return(
				<tr key={index}>
					<td>{val.id}</td>
					<td>{val.name}</td>
					<td>
						<a href="#" onClick={(e)=>this.onUpdateName(e,val.id,val.name)}>修改名称</a>
						{
							val.parentId === 0 ? <Link to={`/product-category/index/${val.id}`}>查看子品类</Link>:null
						}
					</td>
				</tr>
			)
		})
		return(
			<div id="page">
				<PageTitle  title={"品类管理"}>
		                    <Link to="/product-category/add">
		                        <i className="fa fa-plus fa-fw"></i>
		                        添加品类
		                    </Link>
		             </PageTitle>
				<TableList tableHeads={['品类ID', '品类名称', '操作']}>
					{ListBody}
				</TableList>
			</div>
		)
	}
}
export default CategoryList 