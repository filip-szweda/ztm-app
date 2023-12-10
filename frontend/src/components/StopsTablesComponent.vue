<template>
  <div v-for="(delayData, index) in allDelays" :key="index"> 
    <vue-good-table
      :columns="columns"
      :rows="delayData"
      :paginate="false"
      :lineNumbers="true"
      :globalSearch="false"
    />
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';
import axios from 'axios';

export default {
  name: 'StopsTablesComponent',
  components: {
    VueGoodTable
  },
  data() {
    return {
      stopIds: [1013, 1014, 1015],
      columns: [
        { label: 'Route ID', field: 'routeId' },
        { label: 'Estimated Time', field: 'estimatedTime' },
        { label: 'Delay (Seconds)', field: 'delayInSeconds' },
      ],
      allDelays: []
    };
  },
  created() {
    this.fetchAllDelays();
  },
  methods: {
    async fetchAllDelays() {
      for (const stopId of this.stopIds) {
        try {
          const response = await axios.get(`http://ckan2.multimediagdansk.pl/delays?stopId=${stopId}`);
          this.allDelays.push(response.data.delay.map(item => ({
            routeId: item.routeId,
            estimatedTime: item.estimatedTime,
            delayInSeconds: item.delayInSeconds
          })));
        } catch (error) {
          console.error('Error fetching delay data for stop ID', stopId, ':', error);
        }
      }
    }
  }
};
</script>
