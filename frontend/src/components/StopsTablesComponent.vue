<template>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :paginate="true"
    :lineNumbers="true"
    :globalSearch="true"
  />
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';

export default {
  name: 'StopsTablesComponent',
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Age', field: 'age' },
        // Additional columns as needed
      ],
      rows: [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Doe', age: 25 },
        // Additional rows as needed
      ]
    };
  }
};
</script>
