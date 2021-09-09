<template>
	<div id="app">
		<Home/>
	</div>
</template>

<script>
	import Home from './components/Home.vue'

	export default {
		name: 'App',
		components: {
			Home
		}
	}
</script>

<style>
	@import './assets/css/style.css';
	.svg-inline--fa.fa-stack-2x{
		width: 1em !important;
	}
</style>