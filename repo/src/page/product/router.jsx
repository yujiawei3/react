import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import ProductList from "page/product/index/index.jsx";
import ProductSave from "page/product/index/save.jsx";
import ProductDetail from "page/product/index/detail.jsx";
import CategoryList  from 'page/product/category/index.jsx';
import CategoryAdd  from 'page/product/category/add.jsx';
class ProductRouter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product-category/add" component={CategoryAdd}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                <Route path="/product-category/index/:categoryId?" component={CategoryList}/>
                
                <Redirect exact from="/product" to="/product/index"/>
                <Redirect exact from="/product-category" to="/product-category/index"/>
            </Switch>
        )
    }
}
export default ProductRouter