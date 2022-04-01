<template>
<div>
    <Header />
    <b-container v-bind:class="containerClass">
        <h3>Login</h3>
        <b-alert v-if="error != null" show variant="danger">{{error}}</b-alert>
        <b-alert v-if="success !== false" show variant="success">{{$store.state.notificationMessage}}</b-alert>
        <b-form method=post @submit.prevent="userLogin">
            <label>Username</label>
            <b-form-input v-model="formData.username" type="text" placeholder="Username" />
            <label>password</label>
            <b-form-input v-model="formData.password" type="password" placeholder="Password" /><br>
            <b-button type="submit" variant="primary">Login</b-button><br><br>
        </b-form>
        <router-link to="/register">Register</router-link>
    </b-container>
    <Footer />
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: "Login",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            containerClass: "containerClass",
            formData: {
                username: null,
                password: null
            },
            error: null,
            success: this.$store.state.notificationMessage
        }
    },
    methods: {
        userLogin() {
            this.$store.dispatch('UserLogin', this.formData).then((result) => {
                if (result.status == 200 && result.data.length > 0) {
                    localStorage.setItem('loggedInUser', result.data[0].name);
                    localStorage.setItem('loggedInUserName', result.data[0].username);
                    this.$router.push("/")
                } else {
                    this.error = "Incorrect username and password";
                    this.formData.username = null;
                    this.formData.password = null;
                    setTimeout(function () {
                        console.log("before", this.error);
                        this.error = null;
                        this.success = null;
                        console.log("after", this.error);
                    }, 3000)
                }
            })

        }
    },

}
</script>

<style scoped>
.containerClass {
    width: 40%;
    background-color: ghostwhite;
}

.alert-dismissible .close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 0.75rem 1.25rem;
    color: inherit;
}
</style>
