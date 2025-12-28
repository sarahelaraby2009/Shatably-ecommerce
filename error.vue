<script setup>
const error = useError()
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] text-center">
    <h1 class="text-6xl font-bold text-[#c76950]">
      {{ error?.statusCode || 404 }}
    </h1>

    <p class="mt-4 text-lg text-gray-600">
      {{ error?.statusMessage || 'Page not found' }}
    </p>

    <NuxtLink
      to="/"
      class="mt-6 px-6 py-3 rounded-full bg-[#c76950] text-white hover:opacity-90 transition"
    >
      Go to Home
    </NuxtLink>
  </div>
</template>
