<template>
    <div>
        <Register />
        <Login />
    </div>
</template>

<script>
    import Register from './RegisterUser.vue';
    import Login from './LoginUser.vue';

    export default {
        name: 'HomePage',
        components: {
            Register,
            Login
        }
    };
</script>
