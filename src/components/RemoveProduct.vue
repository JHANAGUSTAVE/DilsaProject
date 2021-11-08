<template>
  <table class="table table-hover product-table">
    <tbody>
      <tr v-for="product in products" track-by="id" v-on:click.prevent="onEdit">
        <td><a href="#" v-on:click.prevent.stop="onRemove(product.id)">remove</a></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: ['RemoveProduct'],
  methods: {
    onRemove (productId) {
      this.$emit('remove', productId)
    }
  }
}
</script>