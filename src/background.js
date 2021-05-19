const axios = require("axios")

async function addProduct(token,body) {
	let resp;
	let header = { headers: {"x-token": token}}
	resp = await axios.post('http://localhost:8085/product/add',body,header)
	return resp;
}

chrome.runtime.onMessage.addListener(async function(req,sender,sendResponse) {
	if (req.order == "add-product") {
		let resp;
		try{
			resp = await addProduct(req.token,{'product':req.product})
			if(resp.data.res == "ok"){
				sendResponse({'res':'ok',title: resp.data.product.title});
			}else{
				sendResponse({'res':'error',message: resp.data.message});
			}
		}catch(e){
			if(e.message === "Network Error")
				console.log("error : Pas de Connexion avec le serveur .!!!!!!")
			else 
				console.log("autre error: "+e.message)
		}
		
			
	}else if(req.order == "check-login"){
		chrome.storage.sync.get('user', function(v) {
			try{
				v.user.fullName == null ? sendResponse({res:false}) : sendResponse({res:true,user:v.user});
			}catch(e){
				sendResponse({res:false});
			}
		});
	}
});


