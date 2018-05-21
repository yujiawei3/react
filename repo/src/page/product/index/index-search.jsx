import React from 'react';

class SearchList extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            select:'productId',
            search:' '
        }
    }
    onInput(e){
        let names = e.target.name,
             val = e.target.value.trim()
        this.setState({
            [names]:val
        })
    }
    onSearch(){
        this.props.onSearch(this.state.select,this.state.search)
    }
    render() {
        return (
             <div className="search">
                <select name="select" onChange={e=>this.onInput(e)}>
                    <option value="productId">按商品id查询</option>
                    <option value="productName">按商品名称查询</option>
                </select>
                <input name="search" type="text" placeholder="关键词" onChange={e=>this.onInput(e)}/>
                <button onClick={()=>this.onSearch()}>查询</button>
            </div>
        )
    }
}
export default SearchList