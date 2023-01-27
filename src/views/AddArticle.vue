<script>
import Input from "../components/Atoms/Input.vue";
import TextArea from "../components/Atoms/TextArea.vue";
import Select from "../components/Atoms/Select.vue";
import { mapActions, mapGetters } from "vuex";
import { nanoid } from "nanoid";

export default {
  components: {
    Input,
    TextArea,
    Select,
  },
  data() {
    return {
      title: "",
      imageUrl: "",
      date: "",
      author: "",
      text: "",
    };
  },
  methods: {
    ...mapActions(["addArticle"]),

    onSubmit(e) {
      const id = nanoid();
      e.preventDefault(e);
      const obj = {
        id: id,
        title: this.title,
        imageUrl: this.imageUrl,
        date: this.date,
        author: this.author,
        text: this.text,
      };
      this.addArticle(obj);
      this.title = "";
      this.imageUrl = "";
      this.date = "";
      this.author = "";
      this.text = "";

      this.$refs.form.reset();
      console.log(this.title);
      window.alert("success add article");
    },
  },
  computed: {
    ...mapGetters(["allArticles"]),
  },
};
</script>
<template>
  <div class="flex justify-between px-12 py-6">
    <h1 class="text-black">Add Article</h1>
    <div class="">
      <router-link to="/"><h1>Back</h1></router-link>
    </div>
  </div>
  <form ref="form" @submit="onSubmit" class="w-full p-0 md:px-12">
    <div class="flex flex-wrap -mx-3 mb-2">
      <Input
        @on-input="(word) => (title = word)"
        label="Title"
        typeInput="text"
        placeholder="Post Title Here"
      />
      <Input
        @on-input="(word) => (imageUrl = word)"
        label="Image Url"
        typeInput="text"
        placeholder="www.imageurl.com/image"
      />
    </div>

    <div class="flex flex-wrap -mx-3">
      <Input @on-input="(word) => (date = word)" label="Date" typeInput="date" />
      <Select
        @on-change="(word) => (author = word)"
        label="Author"
        :list="['Jhon Doe', 'Miramar', 'Alex']"
      />
      <TextArea
        @on-input="(word) => (text = word)"
        v-model="text"
        label="Article Text"
        typeInput="text"
        placeholder="Post Description"
      />
    </div>
    <div class="w-full flex justify-end">
      <button type="submit" class="bg-blue-600 mt-12">Submit</button>
    </div>
  </form>
</template>
