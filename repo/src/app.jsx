import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import  Home from "page/home/index.jsx";
import Layout from "components/layout/index.jsx";
import Login  from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
import ErrorPage  from 'page/error/index.jsx';
import ProductRouter from "page/product/router.jsx"
import CategoryList  from 'page/product/category/index.jsx';
import OrderList from "page/order/index.jsx";
import OrderDetail from "page/order/detail.jsx"
class App extends React.Component {
    render() {
        let LayoutRoute = (
            <Layout>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/product" component={ProductRouter}/>
                            <Route path="/product-category" component={ProductRouter}/>
                             <Route path="/order/index" component={OrderList}/>
                             <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                            <Route path="/user/index" component={UserList}/>
                            <Redirect exact from="/user" to="/user/index"/>
                            <Redirect exact from="/order" to="/order/index"/>
                            <Route component={ErrorPage}/>
                         </Switch>
            </Layout>
            )
        return (
            <Router >
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={ props => LayoutRoute}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);
module.hot && module.hot.accept()