
<template>
  <label class="file-select">
    <div class="select-button">
      <span v-if="value">Selected File: {{value.name}}</span>
      <span v-else>Select File</span>
    </div>
    <input type="file" @change="handleFileChange"/>
  </label>
</template>

<script>
// Package inspired from alligator.io for upload
export default {
  props: {
    value: File
  },

  methods: {
    handleFileChange(e) {
      this.$emit('input', e.target.files[0])
    }
  }
}
</script>

<style scoped>
.file-select > .select-button {
  color: white;
  background-color: #3d4982;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}
</style>