<template>
<div class="fixed-header">
    <div class="container">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/products">Products</router-link>
            <!-- <router-link to="">Services</router-link> -->
            <router-link to="">Contact Us</router-link>
            <router-link to="to" v-if="userLoggedIn" @click.native="userLogout()">Logout</router-link>
        </nav>
    </div>
</div>
</template>

<script>

export default {
    name: "Header",
    data() {
        return {}
    },
    computed: {
        userLoggedIn() {
            if (localStorage.getItem('loggedInUserName') === null) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        userLogout() {
            localStorage.removeItem("loggedInUser");                                                                         
            localStorage.removeItem("loggedInUserName");
            this.$router.push("/login")
        }
    },

}
</script>
