<template>
  <div >
    <Header />

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
import Header from "../components/Header"

export default {
  name: 'App',
  components:{
    Header
  }
}

</script>

<style>

</style>
