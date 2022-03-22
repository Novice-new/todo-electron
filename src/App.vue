<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("todo/shouldUpdate");
  },
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
