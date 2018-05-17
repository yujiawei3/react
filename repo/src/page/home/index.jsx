import React from "react";
import PageTitle from "components/page-title/index.jsx";
import {Link} from "react-router-dom";
import Mutil        from 'util/mm.jsx'
import Statistic    from 'service/statistic-service.jsx'

const _mm           = new Mutil();
const _statistic    = new Statistic();
class Home extends React.Component{
	constructor(props){
	        super(props);
	        this.state = {
	            userCount       : ' ',
	            productCount    : ' ',
	            orderCount      : ' '
	        }
    	}
    	componentDidMount(){
    		this.loadCount()
    	}
    	loadCount(){
    		_statistic.getHomeCount().then(res=>{
    			this.setState(res);
    		}).catch(error=>{
    			_mm.errorTips(error)
    		})
    	}
	render(){
		return(
			<div id="page">
				<PageTitle title={"首页"}/>
				<div className="home">
					<div className="row">
						<Link to="/user">
							<p className="count">{this.state.userCount}</p>
							<div className="des">
								<i className="fa fa-user-o"></i>
								<span>用户总数</span>
							</div>
						</Link>
					</div>
					<div className="row">
						<Link to="/user">
							<p className="count">{this.state.productCount}</p>
							<div className="des">
								<i className="fa fa-list"></i>
                                			<span>商品总数</span>
							</div>
						</Link>
					</div>
					<div className="row">
						<Link to="/user">
							<p className="count">{this.state.orderCount}</p>
							<div className="des">
								 <i className="fa fa-check-square-o"></i>
                                			 <span>订单总数</span>
							</div>
						</Link>
					</div>
				</div>
				
			</div>
		)
	}
}
export default Home