module.exports.getData = function () {
    
    const titleSelector = "div.product-info > div.product-title > h1"
    const descSelector = "#root > div > div.product-main > div > div.product-info > meta:nth-child(4)"
    const priceSelector = "#root > div > div.product-main > div > div.product-info > div.product-price > div > span"
    const imgsSelector = "#root > div > div.product-main > div > div.img-view-wrap > div > div > div.images-view-wrap > ul > li"//array
    const propertiesSelector = "#root > div > div.product-main > div > div.product-info > div.product-sku > div > div.sku-property"//array
    
    
    let title,desc,price,imgs,imgsURL=[],properties,arrayProp=[],productObject;
    title = document.querySelector(titleSelector).innerHTML;
    desc = document.querySelector(descSelector).getAttribute("content");
    price = document.querySelector(priceSelector).innerHTML;

    imgs = document.querySelectorAll(imgsSelector);
    imgs.forEach(function(img){
        let url = img.querySelector("div > img").getAttribute("src");
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
    productObject = {
        "title":title,
        "description":desc,
        "price":price,
        "images":imgsURL,
        "properties":arrayProp,
    }
    let p = productObject;
    console.log("title: "+p.title+" Images: "+p.images.length+" Props0: "+p.properties[0].list)

}


