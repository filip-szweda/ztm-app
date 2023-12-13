<template>
  <div id="app">
    <h1>ZTM App</h1>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  :root {
    --background: #282a36;
    --foreground: #f8f8f2;
    --comment: #6272a4;
    --green: #50fa7b;
    --cyan: #8be9fd;
    --purple: #bd93f9;
  }

  #app {
    background-color: var(--background);
    color: var(--foreground);
    font-family: 'Arial', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    padding: 20px;
  }

  h1 {
    color: var(--cyan);
  }

  h3 {
    color: var(--purple); /* Using the purple color for h3 */
    margin: 5px 0;
  }

  span {
    margin-right: 10px;
    display: inline-block;
  }

  input {
    background-color: var(--background);
    color: var(--foreground);
    border: 1px solid var(--comment);
    padding: 10px;
    margin-bottom: 10px;
  }

  button {
    background-color: var(--green);
    color: var(--background);
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: var(--cyan);
  }
</style>
