<template>
  <div >
    <!-- Main -->
    <div class="App">
     <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
	<div class="notify"><h3 id="notify-title">Title</h3> <p id="notify-content">Content...</p></div>
  </div>
</template>
 
<script>
import router from "../router"  

export default {
	name: 'App',
	data() {
		return{
			user:{}
		}
	},
	components:{
	},
	methods:{
		getUser(){
			let self = this;
			chrome.storage.sync.get('user', function(v) {
				self.$set(self, "user", v.user)
			});
		},
	},
	mounted() {
		//this.getUser()
		let self = this;
		chrome.storage.sync.get('user', function(v) {
			self.$set(self, "user", v.user)
			try{
				if(v.user.fullName == null)
					router.push("/login")
				else 
					router.push("/home")
				console.log("nm : "+v.user.fullName)

			}catch(e){
				router.push("/login")
			}
			
		});
		
		
	}
}

</script>

<style>

</style>
