<template>
    <table class="table table-stripped">
        {{users}}
        <thead>
            <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Last login</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="u in users" :key="u.id">
                <td>{{u.first_name}}</td>
                <td>{{u.last_name}}</td>
                <td>{{u.email}}</td>
                <td>{{u.last_login}}</td>
            </tr>
        </tbody>
    </table>
</template>


<script>
	export default {
		name: "Users",
        created(){
            this.$store.dispatch('callUsers');
        },
        computed: {
            users(){
                return this.$store.getters.users;
            }
        }
    }
</script>
<style scoped>
    table{
        width:100%
    }
</style>