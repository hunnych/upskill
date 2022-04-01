<template>
<div>
    <Header />
    <div class="content">
        <p>Welcome !! {{LoggedInuser}}</p>
        <Form v-on:LoggedUser="getLoggedUser"><template slot="sas" ><p>This is test form</p></template></Form>
        <Chat :name="LoggedInuser" />
    </div>
    <Footer  />
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Form from '@/components/Form.vue'
import Chat from '@/components/Chat.vue'

export default {
    name: "Home",
    components: {
        Header,
        Footer,
        Chat,
        Form
    },
    data() {
        return {
            p: "parth",
            rowHtml: "<h2>Harshit</h2>",
            BtnClass: "BtnClass",
            LoggedInuser:'',
            Message: "Test Message",
            Test: [{
                    name: "harshit",
                    age: "24"
                },
                {
                    name: "parth",
                    age: "24"
                },
                {
                    name: "pranav",
                    age: "22"
                },
            ]
        }
    },
    methods: {
        /* toggle(){ 
            if(this.p == "parth"){
                return this.p = "harshit"
            }else{
                return this.p = "parth"
            }
        }, */
        updateValue(title) {
            this.p = title
        },
        getLoggedUser(event){
            console.log(event);
            this.LoggedInuser = event;
        }

    },

    // beforeCreate:function() {
    //     alert(this.p);
    //     console.log("before Create")
    // },
    created:function() {
        /* setInterval(() => {
            this.$store.dispatch('getMessages');
        }, 1000); */
    },
    // beforeMount:function() {
    //     alert(this.$el);
    //     console.log("beforeMount")
    // },
    // mounted:function() {
    //     alert(this.$el)
    //     console.log("mounted")
    // },
    // beforeUpdate(){
    //     alert(this.Message)
    // },
    // updated(){
    //     alert(this.Message)
    // },
    // beforeDestroy(){
    //     alert("before destroy");
    // },
    // destroyed(){
    //     alert("Destroyed");
    // }
}
</script>

<style>
/* Add some padding on document's body to prevent the content
    to go underneath the header and footer */
body {
    padding-top: 60px;
    padding-bottom: 40px;
}

.fixed-header,
.fixed-footer {
    width: 100%;
    position: fixed;
    background: #333;
    padding: 10px 0;
    color: #fff;
}

.fixed-header {
    top: 0;
}

.fixed-footer {
    bottom: 0;
}

.container {
    width: 80%;
    margin: 0 auto;
    /* Center the DIV horizontally */
}

nav a {
    color: #fff;
    text-decoration: none;
    padding: 7px 25px;
    display: inline-block;
}

.todo-box {
    width: 400px;
    height: 30px;
    border-radius: 5px;
    margin-right: 10px;
}
.content{
    margin-bottom: 30px;
}
.BtnClass {
    background-color: green;
}
</style>
