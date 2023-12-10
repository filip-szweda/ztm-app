<template>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :paginate="true"
      :lineNumbers="true"
      styleClass="vgt-table"
    ></vue-good-table>
  </template>
  
  <script>
  import VueGoodTablePlugin from 'vue-good-table';
  import 'vue-good-table/dist/vue-good-table.css'
  
  export default {
    name: 'StopsTables',
    components: {
      'vue-good-table': VueGoodTablePlugin.VueGoodTable
    },
    data() {
      return {
        columns: [
          { label: 'Name', field: 'name' },
          { label: 'Email', field: 'email' }
          // Add more columns as needed
        ],
        rows: [
          // Rows will be populated with user data
        ]
      };
    },
    // Add methods, computed properties, etc., as needed
  };
  </script>
  
  <style>
  /* Add custom styles for your table here */
  </style>
  