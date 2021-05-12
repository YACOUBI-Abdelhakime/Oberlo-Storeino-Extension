const axios = require("axios")

/*browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background')

  browser.tabs.executeScript({
    file: 'content-script.js',
  });
})*/
/*console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");*/
async function addProduct(body) {
	let resp;
	resp = await axios.post('http://localhost:8085/product/testadd',body)
	return resp;
}


chrome.runtime.onMessage.addListener(async function(req,sender,sendResponse) {
	if (req.order == "add-product") {
		let resp;
		try{
			resp = await addProduct({'id':"6093b95915833923c0823bf6",'product':req.product})
			if(resp.data.res == "ok"){
				console.log("TITLE :>"+resp.data.product.title)
				sendResponse({return: resp.data.product.title});
			}else{
				console.log("Error msg :>"+resp.data.message)
				sendResponse({return: resp.data.message});
			}



		}catch(e){
			if(e.message === "Network Error")
				console.log("error : Pas de Connexion avec le serveur .!!!!!!")
			else 
				console.log("error--: "+e.message)
		}
		
			
	}
});