<template>
    <div class="vue-tempalte">
        <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container">
                <img height="35" src="icons/logo.png" title="Storeino" alt="storeino">
                <ul class="nav navbar-nav flex-row float-right">
                <li class="nav-item">
                    <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn btn-outline-primary" to="/">Sign up</router-link>
                </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>