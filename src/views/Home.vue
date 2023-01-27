<script>
import { mapGetters } from "vuex";
import CardArticle from "../components/Organisms/CardArticle.vue";
export default {
  computed: { ...mapGetters(["allArticles"]) },
  components: {
    CardArticle,
  },
  data() {
    return {
      loading: false,
      perpage: 2,
    };
  },
  methods: {
    nextPage() {
      if (this.perpage < this.allArticles.length) this.perpage = this.perpage + 2;
    },
  },
};
</script>

<template>
  <div class="flex justify-between flex-col min-h-screen p-12">
    <div class="">
      <router-link to="/">Home</router-link> |
      <router-link to="/add">Add Article</router-link>
    </div>
    <div class="h-full flex flex-wrap justify-center">
      <h1 v-if="!allArticles.length">No Article Plese Add Article</h1>
      <CardArticle
        v-else-if="allArticles.length"
        v-for="item in allArticles.slice(0, perpage)"
        :title="item.title"
        :imageUrl="item.imageUrl"
        :author="item.author"
        :text="item.text"
        :date="item.date"
        :id="item.id"
      />
    </div>
    <div class="w-full justify-center">
      <button v-on:click="nextPage" class="bg-blue-500 text-white w-32 text-center">Next</button>
    </div>
  </div>
</template>
