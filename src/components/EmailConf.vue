<template>
    <div class="vue-tempalte">
        <Header/> 
        <form v-on:submit="confirm">
            <h3>Email Confirm</h3>

            <p style="text-align:center;">You will receive your confirmation code in your email</p>

            <div class="form-group">
                <label>Code</label>
                <input id="code" type="text" class="form-control form-control-lg" required/>
            </div>

            <input type="submit" class="btn btn-dark btn-lg btn-block" value="Confirm"/>
        </form> 
    </div>
</template>

<script>

import router from "../router"        
import axios from "axios"
import Header from './Header.vue';

    export default {
        data() {
            return {}
        },
        components:{
            Header,
        },
        methods: {
            confirm(e){
                e.preventDefault()    
                let code = document.getElementById("code").value  

                chrome.storage.sync.get(["code","userData"], function(v) {
                    try{
                        if(v.code == code){
                            axios.post("http://localhost:8085/user/add",{userData: v.userData})    
                            .then((resp) => {
                                if(resp.data.res == "ok") {
                                    chrome.storage.sync.set({
                                        'user':{
                                            'id':resp.data.user._id,'fullName':resp.data.user.fullName,'email':resp.data.user.email,'token':resp.headers["x-token"]
                                        }
                                    });
                                    router.push("/home")
                                }else{
                                    console.log("Error :>"+resp.data.message)
                                }   
                            })    
                            .catch((error) => {    
                                console.log("ERROR : "+error.message)  
                            })
                        }else{
                            console.log("code : "+v.code)
                            document.getElementById("code").value = ""

                            let msg = "Incorrect code, Please check your email."
                            document.querySelector(".notify").classList.add("error");
                            document.querySelector(".notify").classList.remove("success");
                            document.querySelector(".notify").classList.add("topPadding");
                            document.querySelector("#notify-title").style.color = "red"
                            document.querySelector("#notify-title").innerHTML="There is a problem.";
                            document.querySelector("#notify-content").innerHTML="<span>Error : </span>"+msg;

                            document.querySelector(".notify").classList.toggle("active");
                            
                            setTimeout(function(){
                                document.querySelector(".notify").classList.remove("active");
                                document.querySelector(".notify").classList.remove("topPadding");
                            },3000);
                        }

                    }catch(e){
                        console.log("Error : "+e.message)
                    }
                }); 
            }
        }
        
    }
</script>