<template>
<div>
    <h1>Props data</h1>
    <button v-on:click="updateValue">Click me</button>
</div>
</template>

<script>
export default {
    name: "Propsdata",
    methods: {
        updateValue() {
            this.$emit("updateName", "Harshit")
        }
    }
}
</script>
