<template>
  <div>
    <manage></manage>
  </div>
</template>

<script>

import Manage from "./view/Manage";
export default {
  name: 'App',
  components: {Manage}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
