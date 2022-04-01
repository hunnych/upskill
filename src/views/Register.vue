<template>
<div>
    <Header />
    <b-container v-bind:class="containerClass">
        <h3>Registration</h3>
        <b-alert v-if="error != null" show variant="danger">{{error}}</b-alert>
        <b-form method=post @submit.prevent="userRegistration">
            <label>Name</label>
            <b-form-input v-model="formData.name" type="text" />
            <label>Email</label>
            <b-form-input v-model="formData.email" type="text" />
            <label>Username</label>
            <b-form-input v-model="formData.username" type="text" />
            <label>Password</label>
            <b-form-input v-model="formData.password" type="password" /><br>
            <label>Confirm password</label>
            <b-form-input v-model="formData.confirmPassword" type="password" /><br>
            <b-button type="submit" variant="primary">Register</b-button><br><br>
        </b-form>
    </b-container>
    <Footer />
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: "Register",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            containerClass: "containerClass",
            formData: {
                name: null,
                email: null,
                username: null,
                password: null,
                confirmPassword: null
            },
            error: null
        }
    },
    methods: {
        userRegistration() {
            this.$store.dispatch('UserRegistration', this.formData).then(data => {
                if (data) {
                    this.$router.push("/login")
                } else {
                    this.error = "Registration failed"
                }
            })
        }

    }
}
</script>

<style scoped>
.containerClass {
    width: 40%;
    background-color: ghostwhite;
}
</style>
