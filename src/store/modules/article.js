const state = {
  article: [],
};

const getters = {
  allArticles: (state) => state.article,
  getById: (state) => (id) => {
    return state.article.find((item) => item.id == id);
  },
};

const actions = {
  async addArticle({ commit }, objData) {
    commit("newArticle", objData);
    localStorage.setItem("articles", JSON.stringify(state.article));
  },
  async deleteArticle({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/article/${id}`);

    commit("removeArticle", id);
  },
  async filterArticles({ commit }, e) {
    // Get selected number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/article?_limit=${limit}`,
    );

    commit("setArticles", response.data);
  },
  async updateArticle({ commit }, updArticle) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/article/${updArticle.id}`,
      updArticle,
    );

    commit("updateArticle", response.data);
  },
};

const mutations = {
  setArticles: (state, article) => (state.article = article),
  newArticle: (state, Article) => state.article.unshift(Article),
  removeArticle: (state, id) =>
    (state.article = state.article.filter((Article) => Article.id !== id)),
  updateArticle: (state, updArticle) => {
    const index = state.article.findIndex((Article) => Article.id === updArticle.id);
    if (index !== -1) {
      state.article.splice(index, 1, updArticle);
    }
  },
  initialiseStore(state) {
    // Check if the ID exists
    if (localStorage.getItem("articles")) {
      state.article = (state, JSON.parse(localStorage.getItem("articles")));
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
