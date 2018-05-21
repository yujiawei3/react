import React from 'react';
import {  Link } from 'react-router-dom';
import PageTitle from "components/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx"
import Mutil from "util/mm.jsx";
import Product from "service/product-service.jsx";
import TableList from "util/table-list/index.jsx";
import SearchList from "./index-search.jsx"

const _product = new Product()
const _mm = new Mutil();
class ProductList extends React.Component {
    constructor(props) {
        super(props)
            this.state={
                pageNum:1,
                list:[],
                listType:'list'
            }
    }
    componentDidMount(){
        this.loadProductList()
    }
    loadProductList(){
        let listParma = {}
        listParma.pageNum = this.state.pageNum;
        listParma.listType = this.state.listType;

        if(listParma.listType === "search"){
            listParma.searchType = this.state.searchType
            listParma.keyword = this.state.searchKeyword
        }
        
        _product.getProductList(listParma).then(res=>{
            this.setState(res)
        }).catch(error=>{
            _mm.errorTips(error)
        })
    }

    onPageNum(pageNum){
            this.setState({
                pageNum
            },()=>{
                this.loadProductList()
            })
    }
    //商品上下架
    onProductState(status,ids){
        let newState = status ===1? 2:1,
             confrimTips = status == 1 ? '确定要下架该商品？' : '确定要上架该商品？';
             if(window.confirm(confrimTips)){
                _product.setProductStatus({
                    productId:ids,
                    status:newState
                }).then(res=>{
                     _mm.successTips(res)
                     this.loadProductList();
                }).catch(error=>{
                    _mm.errorTips(error)
                })
             }
    }

    //搜索
    onSearch(select,search){
        let searchType = search ===' ' ? 'list' : 'search'
        this.setState({
              listType:searchType,
              pageNum:1,
              searchType:select,
              searchKeyword:search
        },()=>{
            this.loadProductList()
        })
    }
        
    render() {

        let ListBody = this.state.list.map((val,index)=>{
                    return(
                          <tr key={index}>
                                <td> {val.id}</td>
                                <td>
                                    {val.name}
                                    <div>{val.subtitle}</div>
                                </td>
                                <td>{val.price}</td>
                                <td>
                                    <div className="state">
                                        <span>{val.status === 1? " 在售" : "已下架"}</span>
                                        <button onClick={()=>this.onProductState(val.status,val.id)}>{val.status === 1? " 下架" : "上架"}</button>
                                    </div>
                                </td>
                                <td>
                                    <Link to={`/product/detail/${val.id}`}>详情</Link>
                                    <Link to={`/product/save/${val.id}`}>编辑</Link>
                                </td>
                          </tr>
                        )
                 })
       return(
            <div id="page">
                <PageTitle  title={"商品管理"}>
                    <Link to="/product/save">
                        <i className="fa fa-plus fa-fw"></i>
                        添加商品
                    </Link>
                </PageTitle>

               <SearchList onSearch={(select,search)=>this.onSearch(select,search)} />
                
                <TableList  tableHeads={['ID', '信息', '价格', '状态', '操作']}>
                        {ListBody}    
                </TableList>
                <div>
                    <Pagination current={this.state.pageNum}
                    total={this.state.total} 
                    onChange={pageNum=>this.onPageNum(pageNum)}
                    />
                </div>
            </div>
        )
    }
}
export default ProductList