import article from "./modules/article";
import { createStore } from "vuex";

const store = createStore({
  modules: {
    article,
  },
});

export default store;
