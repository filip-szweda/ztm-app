<template>
    <div>
        <RegisterComponent />
        <LoginComponent />
    </div>
</template>

<script>
    import RegisterComponent from './RegisterComponent.vue';
    import LoginComponent from './LoginComponent.vue';

    export default {
        name: 'HomePage',
        components: {
            RegisterComponent,
            LoginComponent
        }
    };
</script>
