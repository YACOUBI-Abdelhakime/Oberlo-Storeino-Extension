<template>
    <div  class="vue-tempalte">
        <nav id="header" class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container">
                <img height="35" src="icons/logo.png" title="Storeino" alt="storeino">
                <ul v-if="this.user.fullName == null" class="nav navbar-nav flex-row float-right">
                    <li class="nav-item">
                        <a href="https://www.google.com" class="nav-link pr-3" target="_blank">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="btn btn-outline-primary" to="/signup">Sign up</router-link>
                    </li>
                </ul>
                <ul v-else class="nav navbar-nav flex-row float-right">
                    <li class="nav-item">
                        <a href="https://www.google.com" class="nav-link pr-3" target="_blank">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a v-on:click="logOut" class="nav-link pr-3" >log out</a>
                    </li>
                    <li class="nav-item">
                        
                        <button id="div-user" class="btn btn-primary">
                            <img height="25" src="icons/person.png" alt="person">
                            <span>{{user.fullName.slice(0,10)}}..</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import router from "../router"

    export default {
        data() {
            return {
                user : {},
            }
        },
        methods:{
            getUser(){
                let self = this;
                chrome.storage.sync.get('user', function(v) {
                    self.$set(self, "user", v.user)
                });
            },
            logOut(){
                chrome.storage.sync.clear(function() {
                    var error = chrome.runtime.lastError;
                    if (error)
                        console.error(error);
                });
                router.push("/login")
            }
        },
        mounted() {
            this.getUser()
        }
    }
</script>
<style scoped>
#div-user{
    padding: 5px 1px;
}
#div-user img{
    margin-right: 2px;
}
#div-user:hover{
    background-color: #007bff;
}
li:hover{
    text-decoration: underline;
}
</style>