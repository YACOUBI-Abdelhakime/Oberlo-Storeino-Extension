<template>
    <div class="vue-tempalte">
        <Header/> 
        <form v-on:submit="signUp">
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Full Name</label>
                <input id="fullName" type="text" class="form-control form-control-lg" required/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input id="email" type="email" class="form-control form-control-lg" required/>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input id="password" type="password" class="form-control form-control-lg" required/>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
        </form> 
    </div>
</template>

<script>
import Header from './Header.vue';
import router from "../router"        
import axios from "axios"

    export default {
        data() {
            return {}
        },
        components:{
            Header
        },
        methods: {
            signUp(e){
                e.preventDefault()    
                let fullName = document.getElementById("fullName").value   
                let email = document.getElementById("email").value   
                let password = document.getElementById("password").value   
                let data = { 
                    'fullName':fullName,
                    'email': email, 
                    'password': password    
                }    

                axios.post("http://localhost:8085/user/emailConfirm", {email})    
                    .then((resp) => {
                        if(resp.data.res == "ok") {
                            let code = resp.data.code;
                            chrome.storage.sync.set({ 'code' : code,'userData':data });
                            router.push("/emailConf")
                        }else{ 
                            console.log("Error :>"+resp.data.message)
                            document.querySelector(".notify").classList.add("error");
                            document.querySelector(".notify").classList.remove("success");
                            document.querySelector(".notify").classList.add("topPadding");
                            document.querySelector("#notify-title").style.color = "red"
                            document.querySelector("#notify-title").innerHTML="There is a problem.";
                            document.querySelector("#notify-content").innerHTML="<span>Error : </span>"+resp.data.message;

                            document.querySelector(".notify").classList.toggle("active");
                            
                            setTimeout(function(){
                                document.querySelector(".notify").classList.remove("active");
                                document.querySelector(".notify").classList.remove("topPadding");
                            },3000);
                        }
                           
                    })    
                    .catch((error) => {    
                        console.log("ERROR : "+error.message)  
                    }) 
            }
        }
    }
</script>