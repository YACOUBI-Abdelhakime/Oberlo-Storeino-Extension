<template>
  <div >
    <!-- Navigation <div class="vue-tempalte">-->
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

    <!-- Main -->
    <div class="App">
     <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>


export default {
  name: 'App',
}

</script>

<style>

/*
#nav{
	background-color: #777;
	color: white;
	height: 50px;
	display: flex;
	justify-content: flex-end;
	align-items: center;

} */
</style>
