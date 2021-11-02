<template>
    <table class="table table-stripped">
        <thead>
            <tr>
                <th>Promotions</th>
                <th>Description</th>
                <th>Photo</th>
                <th>Date created</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="pr in products" :key="pr.id">
                <td>{{pr.name}}</td>
                <td>{{pr.description}}</td>
                <td>{{pr.photo}}</td>
                <td>{{pr.created_at}}</td>
            </tr>
        </tbody>
    </table>
</template>


<script>
	export default {
		name: "Promotionss",
        props: {
            promotions: Array,
        },
		created(){
        }
    }
</script>
<style scoped>
    table{
        width:100%
    }
</style>