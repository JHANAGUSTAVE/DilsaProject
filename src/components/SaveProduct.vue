<template>
  <form>
    <div class="form-group">
      <label for="productName">Product name</label>
      <input type="text" v-model="product.name" class="form-control" id="productName" maxlength="32" placeholder="Enter product name">
    </div>
    <div class="form-group">
      <label for="productDescription">Product description <small class="text-muted">(optional)</small></label>
      <textarea class="form-control" v-model="product.description" id="productDescription" rows="3" maxlength="128" placeholder="Enter description"></textarea>
    </div>
    <div class="form-group">
      <label for="text">Photo</label>
      <input type="text" v-model="product.photo" class="form-control" id="Photo" placeholder="Enter Photo" >
    </div>
    <button type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary">Save product</button>
  </form>
</template>

<script>
    export default {
		name: 'SaveProduct',
		props: {

		},
		data(){
			return {
                product:{
                   name:"",
                    description:"",
                    photo:"",
                }
            }
            
        }
    
    }
</script>