module.exports.addMainBtn = function() {
    //<span></span>
    let span = document.createElement("span");
    span.classList.value = "addcart-wrap span-container";
    //<button></button>
    let btn = document.createElement("button");
    btn.innerHTML = "Clone Product";
    btn.id = "main-btn-cloner";
    btn.classList.value = "next-btn next-large next-btn-primary"
    span.appendChild(btn);
    
    const div = document.querySelector("div.product-action")
    const beffor = document.querySelector("span.add-wishlist-wrap")
    div.insertBefore(span,beffor);

    document.getElementById("main-btn-cloner").addEventListener("click", BtnEvent);
}
module.exports.addFixBtn = function() {
    let btn2 = document.createElement("button");
    btn2.innerHTML = "Clone Product";
    btn2.id = "fix-btn-cloner";
    btn2.classList.value = "next-btn next-large next-btn-primary";

    const containerSelector = "span.buy-now-wrap.fixed-buy-now"
    const container = document.querySelector(containerSelector)
    container.appendChild(btn2);

    document.getElementById("fix-btn-cloner").addEventListener("click", BtnEvent);
}

module.exports.addNotif = function(){
    let elm = document.createElement("div");
    elm.innerHTML = `
    <div class="notify"><div class="div-notify"><h3 id="notify-title"></h3> <p id="notify-content">...</p></div></div>
    `
    document.querySelector("body").appendChild(elm)
}
function notifyEvent(resp){ 
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(resp.res == "ok"){ 
        let title = resp.title.slice(0,40)
        document.querySelector(".div-notify").classList.add("success");
        document.querySelector(".div-notify").classList.remove("error");
        document.querySelector("#notify-title").innerHTML="Completed with SUCCESS.";
        document.querySelector("#notify-title").style.color = "green"
        document.querySelector("#notify-content").innerHTML="<span>Product title : </span>"+title+"...";
    }else{
        document.querySelector(".div-notify").classList.add("error");
        document.querySelector(".div-notify").classList.remove("success");
        document.querySelector("#notify-title").style.color = "#cc0000"
        document.querySelector("#notify-title").innerHTML="There is a problem.";
        document.querySelector("#notify-content").innerHTML="<span>Error : </span>"+resp.message;
    }

    
    document.querySelector(".notify").classList.toggle("active");
    
    setTimeout(function(){
        document.querySelector(".notify").classList.remove("active");
    },3000);
}

let product;
function getData() {
    const titleSelector = "div.product-info > div.product-title > h1"
    const descSelector = "#root > div > div.product-main > div > div.product-info > meta:nth-child(4)"
    const priceSelector = "#root > div > div.product-main > div > div.product-info > div.product-price > div > span"
    const bonusPriceSelector = "#root > div > div.product-main > div > div.product-info > div.uniform-banner > div.uniform-banner-box > div:nth-child(1) > span.uniform-banner-box-price"
    const comparPriceSelector = "#root > div > div.product-main > div > div.product-info > div.product-price > div.product-price-original > div > span"
    const bonusComparPriceSelector = "#root > div > div.product-main > div > div.product-info > div.uniform-banner > div.uniform-banner-box > div:nth-child(1) > span.uniform-banner-box-discounts > span:nth-child(1)"
    const imgsSelector = "#root > div > div.product-main > div > div.img-view-wrap > div > div > div.images-view-wrap > ul > li"//array
    const propertiesSelector = "#root > div > div.product-main > div > div.product-info > div.product-sku > div > div.sku-property"//array
    
    
    let title,desc,price,comparPrice,imgs,imgsURL=[],properties,arrayProp=[];
    title = document.querySelector(titleSelector).innerHTML;
    desc = document.querySelector(descSelector).getAttribute("content");
    let priceDiv = document.querySelector(priceSelector);
    let currency
    if(priceDiv){
        price = document.querySelector(priceSelector).innerHTML
        currency = price.split(" ")[0]
        try{
            comparPrice = document.querySelector(comparPriceSelector).innerHTML;
            comparPrice.includes("-") ? comparPrice = comparPrice.split("-")[1] : comparPrice = comparPrice.split(" ")[1]
        }catch(e){console.log(e)}

        price.includes("-") ? price = price.split("-")[1] : price = price.split(" ")[1]
        //Add currency
        price = price+" "+currency
        comparPrice = comparPrice+" "+currency 
        //Replace ',' with '' Ex= 1,755.55
        console.log("Price-1 :"+price+"|")
        price = price.trim().replace(",","")
        comparPrice = comparPrice.trim().replace(",","")
        console.log("Price-2 :"+price+"|")
        
    }else{//Bonus 
        price = document.querySelector(bonusPriceSelector).innerHTML
        currency = price.split(" ")[0]
        try{
            comparPrice = document.querySelector(bonusComparPriceSelector).innerHTML;
            comparPrice.includes("-") ? comparPrice = comparPrice.split("-")[1] : comparPrice = comparPrice.split(" ")[1]
        }catch(e){console.log(e)}

        price.includes("-") ? price = price.split("-")[1] : price = price.split(" ")[1]
        //Add currency
        price = price+" "+currency
        comparPrice = comparPrice+" "+currency  
        price = price.trim().replace(",","")
        comparPrice = comparPrice.trim().replace(",","")
    } 
    if(comparPrice.includes("undefined")) comparPrice = " "
    console.log(price+" comp>>>"+comparPrice)   

    imgs = document.querySelectorAll(imgsSelector);
    imgs.forEach(function(img){
        let url = img.querySelector("div > img").getAttribute("src");
        url = url.replace("50x50", "Q90");
        imgsURL.push(url);
    })

    properties = document.querySelectorAll(propertiesSelector);
    let i =1;
    properties.forEach(function(property){
        let pTitle = property.querySelector("div.sku-title").innerHTML.split(":")[0];//var res = str.split(" ");
        let pList = document.querySelectorAll("#root > div > div.product-main > div > div.product-info > div.product-sku > div.sku-wrap > div:nth-child("+i+") > ul.sku-property-list > li.sku-property-item");
        let objProp, propertyValues;

        propertyValues=[]
        pList.forEach(function(item){ 
            let pValue;
            if(!item.querySelector("div").classList.contains("sku-property-text")){
                pValue = item.querySelector("div.sku-property-image > img").getAttribute("title");
            }else{
                pValue = item.querySelector("div.sku-property-text > span").innerHTML;
            }
            propertyValues.push(pValue);  
        })
        objProp = {
            "title":pTitle,
            "list":propertyValues
        }
        arrayProp.push(objProp);

        i++;
    })
    product = {
        "title":title,
        "description":desc,
        "buyingPrice":price,
        "comparePrice":comparPrice,
        "salePrice":"1.00 "+currency,
        "images":imgsURL,
        "properties":arrayProp,
    }
    return product;
}


function BtnEvent() {
    chrome.runtime.sendMessage({"order":"check-login"}, function(response) {        
        if(response.res){
            let product = getData()
            product.idUser = response.user.id;
            chrome.runtime.sendMessage({"order":"add-product","product":product,"token":response.user.token}, function(response) {
                notifyEvent(response);
            });
        }else{
            console.log("falssssssssssssssssse")
            notifyEvent({res:"error",message:"Please login first"});
        }
    });    
}