<template>
    <div>
    <Header />
    <div><h1>This is about page</h1>
        <p v-for="client in allProducts" :key="client.id">
                {{client.name}} || {{client.gender}} 
        </p>
    </div>
    <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name:"About",
    components:{
        Header,
        Footer
    },
}
</script>