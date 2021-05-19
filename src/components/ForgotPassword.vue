<template>
    <div class="vue-tempalte">
        <Header/> 
        <form>
            <h3>Forgot Password</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>

        </form> 
    </div>
</template>

<script>
import Header from './Header.vue';

    export default {
        data() {
            return {}
        },
        components:{
            Header
        }
    }
</script>