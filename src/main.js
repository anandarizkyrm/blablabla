import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});
createApp(App).use(routes).use(store).mount("#app");
