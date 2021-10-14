<template>
    <div>
		<form>  
			<div class="container">   
				<label>Username : </label>   
				<input type="text" placeholder="Enter Username" name="username" required>  
				<label>Password : </label>   
				<input type="password" placeholder="Enter Password" name="password" required>  
				<button type="submit">Login</button>   
				<!-- <input type="checkbox" checked="checked"> Remember me    -->
				<button type="button" class="cancelbtn"> Cancel</button>   
				Forgot <a href="#"> password? </a>   
			</div>   
       </form>     
	</div>
</template>

<script>
	export default {
		name: "Login",
		created(){

		},
		data(){

		}
	};
</script>
<style scoped>

button {   
       background-color: #d9d3e4;   
       width: 100%;  
        color: rgb(32, 35, 68);   
        padding: 15px;   
        margin: 10px 0px;   
        border: none;   
        cursor: pointer;   
         }   
 form {   
        border: 3px solid #f1f1f1;   
    }   
 input[type=text], input[type=password] {   
        width: 100%;   
        margin: 8px 0;  
        padding: 12px 20px;   
        display: inline-block;   
        border: 2px solid rgb(162, 198, 231);   
        box-sizing: border-box;   
    }  
 button:hover {   
        opacity: 0.7;   
    }   
  .cancelbtn {   
        width: auto;   
        padding: 10px 18px;  
        margin: 10px 5px;  
    }   
        
     
 .container {   
        padding: 25px;   
        background-color: lightblue;  
    }  

</style>