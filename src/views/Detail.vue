<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getById"]),
    item() {
      return this.getById(this.$route.params.id);
    },
  },
};
</script>

<template>
  <div>
    <h1 class="text-left text-xl md:text-5xl mb-8">{{ item.title }}</h1>
    <figure>
      <img :src="item.imageUrl" width="1972" height="1289" :alt="title" />
    </figure>
    <div class="p-6">
      <div class="w-full flex gap-2 my-2">
        <span class="text-gray-500 text-sm">{{ item.date }}</span>
        <span class="text-gray-500 text-sm">{{ item.author }}</span>
      </div>
      <p class="text-justify text-gray-600">{{ item.text }}</p>
    </div>
  </div>
</template>
