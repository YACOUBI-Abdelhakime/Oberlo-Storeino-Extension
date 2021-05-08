import '@/assets/css/aliExpress.css'
import {getData} from '@/content-scripts/aliExpressData'


  
function addMainBtn() {
    let span = document.createElement("span");
    span.classList.value = "addcart-wrap span-container";
    let btn = document.createElement("button");
    btn.innerHTML = "Clone Product";
    btn.id = "main-btn-cloner";
    btn.classList.value = "next-btn next-large next-btn-primary";
    span.appendChild(btn);
    const div = document.querySelector("div.product-action")
    const beffor = document.querySelector("span.add-wishlist-wrap")
    div.insertBefore(span,beffor);

    document.getElementById("main-btn-cloner").addEventListener("click", BtnEvent);
}
function addFixBtn() {
    let btn2 = document.createElement("button");
    btn2.innerHTML = "Clone Product";
    btn2.id = "fix-btn-cloner";
    btn2.classList.value = "next-btn next-large next-btn-primary";

    const containerSelector = "span.buy-now-wrap.fixed-buy-now"
    const container = document.querySelector(containerSelector)
    container.appendChild(btn2);

    document.getElementById("fix-btn-cloner").addEventListener("click", BtnEvent);
}

function BtnEvent() {
    //alert("******************main")
    getData()
}


addMainBtn();
addFixBtn();
      
      