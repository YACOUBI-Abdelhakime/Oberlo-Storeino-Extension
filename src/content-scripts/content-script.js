import '@/assets/css/aliExpress.css'
import {getData} from '@/content-scripts/aliExpressData'




  
function addMainBtn() {
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

function addNotif(){
    let elm = document.createElement("div");
    elm.innerHTML = `
    <div class="notify"><h3 id="notify-title"></h3> <p id="notify-content">...</p></div>
    `
    document.querySelector("body").appendChild(elm)
}
function notifyEvent(resp){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(resp.res == "ok"){
        let title = resp.title.slice(0,90)
        document.querySelector(".notify").classList.add("success");
        document.querySelector(".notify").classList.remove("error");
        document.querySelector("#notify-title").innerHTML="Completed with SUCCESS.";
        document.querySelector("#notify-title").style.color = "green"
        document.querySelector("#notify-content").innerHTML="<span>Product title : </span>"+title+"...";
    }else{
        document.querySelector(".notify").classList.add("error");
        document.querySelector(".notify").classList.remove("success");
        document.querySelector("#notify-title").style.color = "red"
        document.querySelector("#notify-title").innerHTML="There is a problem.";
        document.querySelector("#notify-content").innerHTML=resp.message;
    }

    
    document.querySelector(".notify").classList.toggle("active");
    
    setTimeout(function(){
        document.querySelector(".notify").classList.remove("active");
    },2000);
}


function BtnEvent() {
    let product = getData()
    chrome.runtime.sendMessage({"order":"add-product","product":product}, function(response) {
        notifyEvent(response);
    });


    
    
}


addNotif()
addMainBtn();
addFixBtn();
      
      