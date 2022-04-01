<template>
    <div>
    <Header />
    <div><h1>This is products page</h1>
    <p>{{product_id}}</p>
    </div>
    <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name:"Products",
    components:{
        Header,
        Footer
    },
    data(){
        return { product_id:this.$route.params.id}
    }
}
</script>