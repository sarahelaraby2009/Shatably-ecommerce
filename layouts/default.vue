<script setup>
import Chatbot from '~/components/Chatbot.vue'
</script>
<template>
    <MyNav/>
    <Chatbot/>
    <slot></slot>
    <Footer/>
</template>
