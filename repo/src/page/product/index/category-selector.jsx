import React from 'react';
import MUtil        from 'util/mm.jsx'
import Product      from 'service/product-service.jsx'


const _mm  = new MUtil();
const _product = new Product();

// 选择器
class CategorySelector extends React.Component {
    constructor(props) {
            super(props)
            this.state = {
                    firstCategoryList   : [],
                    firstCategoryId     : 0,
                    secondCategoryList  : [],
                    secondCategoryId    : 0
              }
    }
    componentDidMount(){
            this.loadFirstCategory()
    }
    componentWillReceiveProps(nextProps){

            let categotyIdChange = nextProps.categoryId !== this.state.firstCategoryId,
                 parentCategoryIdChange = nextProps.parentCategoryId !== this.state.secondCategoryId
                 // 数据没有发生变化的时候，直接不做处理
                 if(!categotyIdChange && !parentCategoryIdChange){
                    return 
                 }

                  // 假如只有一级品类
                 if(nextProps.parentCategoryId == 0){
                          this.setState({
                                firstCategoryId     : nextProps.categoryId,
                                secondCategoryId    : 0
                           });
                 }else{
                        this.setState({
                                firstCategoryId:nextProps.parentCategoryId,
                                secondCategoryId:nextProps.categoryId
                        },()=>{
                            this.loadSecondCategory()
                        })
                 }
    }
    // 加载一级分类
    loadFirstCategory(){
            
            _product.getCategotyList().then(res=>{
                this.setState({
                        firstCategoryList:res
                })
            }).catch(error=>{
                _mm.errorTips(error)
            })
    }
    // 加载二级分类
    loadSecondCategory(){
        
            _product.getCategotyList(this.state.firstCategoryId).then(res=>{
                    this.setState({
                        secondCategoryList:res
                    })
              }).catch(error=>{
                    _mm.errorTips(error)
              })
    }
    //选择一级分类
    onSelect(e){
        if(this.props.readOnly){
                return
            }
            let newId = e.target.value || 0
            this.setState({
                            firstCategoryId:newId,
                            secondCategoryList  : [],
                            secondCategoryId    : 0
                    },()=>{
                            this.loadSecondCategory()
                            this.onPropsCategoryChange();
              })
    }
    //选择二级分类
    onSecond(e){
            if(this.props.readOnly){
                return
            }
            let newId = e.target.value || 0
                 this.setState({
                        secondCategoryId : newId
                 },()=>{
                        this.onPropsCategoryChange();
             })
    }
    //传给父组件
    onPropsCategoryChange(){
            let  categoryChangable =  typeof this.props.onCategoryChangable ==='function';
            if(this.state.secondCategoryId){
                    categoryChangable && this.props.onCategoryChangable(this.state.firstCategoryId,this.state.secondCategoryId)
            }else{
                    categoryChangable && this.props.onCategoryChangable(this.state.firstCategoryId,0)
            }
    }
    render() {
            return (
                    <div className="ification">
                            <select name="password"
                            readOnly={this.props.readOnly}
                             onChange={(e)=>this.onSelect(e)}
                               value={this.state.firstCategoryId}>
                                <option>请选择一级品类</option>
                                {
                                        this.state.firstCategoryList.map((val,index)=>{
                                                return(
                                                        <option value={val.id} key={index}>{val.name}</option>
                                                )
                                        })
                                }
                            </select>
                            {
                                this.state.secondCategoryList.length>0?
                                <select name="password"
                                readOnly={this.props.readOnly}
                                 onChange={(e)=>this.onSecond(e)}
                                 value={this.state.secondCategoryId}>
                                    <option>请选择二级品类</option>
                                    {
                                            this.state.secondCategoryList.map((val,index)=>{
                                                    return(
                                                            <option value={val.id} key={index}>{val.name}</option>
                                                    )
                                            })
                                    }
                                </select>:null
                            }
                            
                    </div>
            )
    }
}
export default CategorySelector