<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import Example from './components/Example.vue';

  export default {
    name: 'app',
    components: {
      Example
    }
  };
</script>
