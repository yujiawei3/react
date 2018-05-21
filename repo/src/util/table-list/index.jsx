import React from "react"


 class TableList extends React.Component{
 	constructor(props){
 		super(props)
 		this.state = {
	            isFirstLoading: true
	       }
 	}
 	componentWillReceiveProps(){
	        this.setState({
	            isFirstLoading : false
	        });
	}
 	render(){
	 	// 列表内容
	        let listBody = this.props.children;
	        // 列表的信息
	        let listInfo = (
	            <tr>
	               	<td colSpan={this.props.tableHeads.length}>
	                    	{this.state.isFirstLoading ? '正在加载数据...' : '没有找到相应的结果~'}
	                	</td>
	            </tr>
	        );
	        let tableBody = listBody.length > 0 ? listBody : listInfo;
 		return(
 			<div className="home">
				<table className="table">
					<thead>
						<tr>
							{this.props.tableHeads.map((val,index)=>{
								return(
									<th key={index}>{val}</th>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{tableBody}
					</tbody>
				</table>
			</div>
 		)
 	}
 }
 export default TableList