<template>
    <div class="vue-tempalte">
        <Header/> 
        <form v-on:submit="login">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input id="email" type="email" class="form-control form-control-lg"   />
            </div>

            <div class="form-group">
                <label >Password</label>
                <input id="password" type="password" class="form-control form-control-lg"  />
            </div>

            <input type="submit" class="btn btn-dark btn-lg btn-block" value="Sign in"/>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>

            <div class="social-icons"> 
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
    
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
            login(e){
                e.preventDefault()    
                let email = document.getElementById("email").value   
                let password =  document.getElementById("password").value   
                let data = {   
                    'email': email, 
                    'password': password    
                }    

                axios.post("http://localhost:8085/user/", data)    
                    .then((resp) => {
                        if(resp.data.res == "ok") {
                            chrome.storage.sync.set({
                                'user':{
                                    'id':resp.data.user._id,'fullName':resp.data.user.fullName,'email':resp.data.user.email,'token':resp.headers["x-token"]
                                }
                            });
                            router.push("/home")
                        }else{
                            document.getElementById("email").value =""
                            document.getElementById("password").value =""
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