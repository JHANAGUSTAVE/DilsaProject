<template>
    <div class='wrapper'>
        <div class='content'><h4>404</h4>
        <h3>Page Not Found 😞</h3>
        <router-link to="/" class="btn btn-light">Go back to home</router-link>
        </div>
    </div>
</template>


<script>
	export default {
		name: "PageNotFound",
		created(){
        }
    }
</script>
<style scoped>
    div.wrapper{
        width: 100%;
        height:100vh;
        background:#333;
        text-align: center;
        color:#fff;
        vertical-align: middle;
    }
    div.wrapper .content{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
    }
     div.wrapper h3{
        color:#fff;
        font-size:90px;
     }
     div.wrapper h4{
        color:#ddd;
        font-size:60px
     }
</style>