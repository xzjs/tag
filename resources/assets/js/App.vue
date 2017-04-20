<template>

    <router-view></router-view>

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
