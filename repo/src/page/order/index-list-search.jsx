import React from 'react';

class SearchList extends React.Component {
    constructor(props) {
        super(props)
        this.state={
             orderNumber:""
        }
    }
    onInput(e){
            this.setState({
                orderNumber:e.target.value.trim()
            })
    }
    onSearch(){
        this.props.onSearch(this.state.orderNumber)
    }
    render() {
        return (
             <div className="search">
                <select>
                    <option value="">按订单号查询</option>
                </select>
                <input name="search" type="text" placeholder="订单号" onChange={e=>this.onInput(e)}/>
                <button onClick={()=>this.onSearch()}>查询</button>
            </div>
        )
    }
}
export default SearchList