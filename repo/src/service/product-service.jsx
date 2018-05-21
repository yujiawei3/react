import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Product{
    
    getProductList(listParma){
        let url = "",
             data={}
         if(listParma.listType === 'list'){
              url='/manage/product/list.do'
              data={
                pageNum:listParma.pageNum
              }
         }else if(listParma.listType === 'search'){
            url= '/manage/product/search.do'
            data={
                pageNum:listParma.pageNum,
                [listParma.searchType]:listParma.keyword
            }
         }
        return _mm.request({
                type : 'post',
                url : url,
                data :data
        });
    }
    //编辑
    getProduct(productId){
      return _mm.request({
            type    : 'post',
            url     : '/manage/product/detail.do',
            data    : {
                productId : productId || 0
            }
        });
    }
    // 变更商品状态
    setProductStatus(productInfo){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/set_sale_status.do',
            data    : productInfo
        });
    }

    //一级分类
    getCategotyList(categoryId){
        return _mm.request({
              type:"post",
              url:"/manage/category/get_category.do",
              data:{
                       categoryId:categoryId || 0
              }
        })
    }
    //
    checkProduct(product){
             // 判断用户名为空
            if(typeof product.name !== 'string' || product.name.length ===0){
                  return {
                      status: false,
                      msg: '商品名称不能为空！'
                  }
            }
            // 判断描述不能为空
            if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
                  return {
                      status: false,
                      msg: '商品描述不能为空！'
                  }
            }
            // 验证品类ID
            if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
                  return {
                      status: false,
                      msg: '请选择商品品类！'
                  }
            }
            // 判断商品价格为数字，且大于0
            if(typeof product.price !== 'number' || !(product.price >= 0)){
                  return {
                      status: false,
                      msg: '请输入正确的商品价格！'
                  }
            }
            // 判断库存为数字，且大于或等于0
            if(typeof product.stock !== 'number' || !(product.stock >= 0)){
                  return {
                      status: false,
                      msg: '请输入正确的库存数量！'
                  }
            }
            return {
                  status:true,
                  msg:"验证通过"
            }
        }
        saveProduct(product){
                return _mm.request({
                      type    : 'post',
                      url     : '/manage/product/save.do',
                      data    : product
                });
        }
}

export default Product;