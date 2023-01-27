<script>
export default {
  props: {
    title: String,
    imageUrl: String,
    date: String,
    author: String,
    text: String,
    id: String,
  },
};
</script>
<template>
  <div class="shadow-xl m-2 bg-white max-w-3xl">
    <figure>
      <img :src="imageUrl" width="1972" height="1289" alt="title" />
    </figure>
    <div class="p-6">
      <router-link class="text-gray-800" :to="{ path: '/detail/' + id }">
        <h1 class="text-4xl font-bold text-left hover:text-orange-500 hover:cursor-pointer">
          {{ title }}
        </h1>
      </router-link>
      <div class="w-full flex gap-2 my-2">
        <span class="text-gray-500 text-sm">{{ date }}</span>
        <span class="text-gray-500 text-sm">{{ author }}</span>
      </div>
      <p class="text-justify text-gray-600">{{ text }}</p>
    </div>
  </div>
</template>
