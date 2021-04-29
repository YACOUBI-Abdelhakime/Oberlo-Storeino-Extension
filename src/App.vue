<template>
	<div id="app">
		<div id="nav">
			<router-link class="line" to="/" exact>Aller à Home</router-link>
			<router-link class="line" to="/about">Aller à About</router-link>
		</div>
		<router-view/>
		<img alt="Vue logo" src="./assets/logo.png">
		<p>{{ $route.params.name }}</p>
		<HelloWorld msg="Welcome "/>
	</div>
</template>
 
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
}

</script>

<style>
*{
	margin: 0px;
	padding:0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav{
	background-color: #777;
	color: white;
	height: 50px;
	display: flex;
	justify-content: flex-end;
	align-items: center;

}
.line{
	background-color: chartreuse;
	margin:10px;
}
</style>
