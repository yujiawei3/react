
class Mutil{
	request(param){
		return new Promise((resolve,reject)=>{
			$.ajax({
				type: param.type || "get",
				url: param.url || " ",
				dataType: param.dataType || "json",
				data: param.data || null,
				success:res=>{
					if(res.status === 0){
						typeof resolve ==="function" && resolve(res.data,res.msg)
					}else if(res.status === 10){
						// 强制登录
						this.doLogin()
					}else{
						typeof reject ==='function' && reject(res.msg || res.data)
					}
				},
				error:error=>{
					typeof reject ==='function' && reject(error.statusText)
				}
			})
		})
		
	}
	// 跳转登录
	doLogin(){
		window.location.href="/login?redirect="+encodeURIComponent(window.location.pathname)
	}
	errorTips(errorMsg){
		alert(errorMsg)
	}
	// 获取URL参数
    	getUrlParam(name){
        // param=123&param1=456
	       let queryString = window.location.search.split('?')[1] || '',
	            	reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
	            	result      = queryString.match(reg);
	        return result ? decodeURIComponent(result[2]) : null;
    	}
    	setStorage(name,data){
    		let dataType = typeof data
    		if(dataType === 'object'){
    			window.localStorage.setItem(name,JSON.stringify(data))

    		}else if(~['string','number','boolean'].indexOf(dataType)){
    			window.localStorage.setItem(name,data)
    		}else{
    			alert('该类型不能用于本地存储');
    		}
    	}
	getStorage(name){
	      let data = window.localStorage.getItem(name);
	      if(data){
	            return JSON.parse(data);
	      }
	       else{
	           return '';
	      }
	}
	removeStorage(name){
	      window.localStorage.removeItem(name);
	}
}
export default Mutil