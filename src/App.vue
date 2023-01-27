<script>
export default {
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
};
</script>

<template>
  <router-view />
</template>
