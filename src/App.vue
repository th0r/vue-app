<template>
  <div id="app" class="app">
    <b-container>
      <b-nav fill pills class="nav">
        <b-nav-item to="problem">The Problem</b-nav-item>
        <b-nav-item to="example">Example</b-nav-item>
      </b-nav>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
  import bNav from 'bootstrap-vue/es/components/nav/nav';
  import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
  import bContainer from 'bootstrap-vue/es/components/layout/container';

  export default {
    components: {
      bNav,
      bNavItem,
      bContainer
    }
  };
</script>

<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style scoped>
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .nav {
    margin-bottom: 40px;
  }
</style>
<style>
  h2 {
    font-size: 26px;
  }
</style>
