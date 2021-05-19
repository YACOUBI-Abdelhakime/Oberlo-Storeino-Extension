<template>
    <div>
        <Header/>
        <div class="d-flex justify-content-center flex-column">
            <h3 class="pading">welcome <span>{{user.fullName}}</span> in Storino product cloner</h3>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';


    export default {
        data() {
            return{
                user:{}
            }
        },
        components:{
            Header
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
            this.getUser()
            
        }
    }
</script>
<style scoped>
span{
    text-decoration: underline;
    font-weight: bold;
}
.pading{
    margin: 5px 1px;
}
h3{
    font-size: 26px;
}
</style>