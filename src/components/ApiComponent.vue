<template>
    <div class="container">
        <h1>Api component</h1>
        <table border="1" cellpadding="0" cellspacing="0" width="100%">
            <thead>
                <td>Name</td>
                <td>Salary</td>
                <td>Age</td>
                <td>Action</td>
            </thead>
            <tr v-for="e in employee" v-bind:key="e.id">
                <td>{{e.employee_name}}</td>
                <td>{{e.employee_salary}}</td>
                <td>{{e.employee_age}}</td>
                <td><button v-on:click="deleteEmp(e.id)">Delete</button></td>
            </tr>
        </table>
        <p>{{token}}</p>
    </div>
</template>

<script>

import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(VueAxios,axios);

export default {
    name:"ApiComponent",
    data(){
        return {
            employee:[],
            token:null
        }
    },
    methods : {
        deleteEmp(id){
            this.axios.delete("http://dummy.restapiexample.com/api/v1/delete/"+id).then((response)=>{
                console.warn(response);
                this.getUsers();
            })
        },
        getUsers(){
            this.employee = [];
            Vue.axios.get("http://dummy.restapiexample.com/api/v1/employees").then((response)=>{
                this.employee = response.data.data;
                console.warn(this.employee);
            });
        }
    },
    mounted(){
        return this.getUsers();
        
    }
}
</script>