<template>
    <div class="card">
        <div class="image">
            <img src="/assets/AC.jpeg" alt="AC">
        </div>
        <nuxt-link to="categories/id/subid/"><p class="font-bold">Air conditioning</p></nuxt-link>
        
    </div>
</template>
<script setup>

</script>
<style scoped>
.card{
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    width: 307px;
    background-color: white;
    padding: 10px;
    border-radius: 12px;
}
.image{
    width: 100%;
    padding-bottom: 16px;
}
img{
    width: 100%;
     border-radius: 8px;
}

</style>