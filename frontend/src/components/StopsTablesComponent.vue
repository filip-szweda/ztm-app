<template>
  <textarea v-model="stopIdInput"></textarea>
  <button @click="addStopId">Add Stop Id</button>
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
      stopIdInput: '',
      stopsIds: [],
      columns: [
        { label: 'Route ID', field: 'routeId' },
        { label: 'Estimated Time', field: 'estimatedTime' },
        { label: 'Delay (Seconds)', field: 'delayInSeconds' },
      ],
      allDelays: []
    };
  },
  async created() {
    await this.fetchUserStopsIds();
    this.fetchAllDelays();
  },
  methods: {
    async fetchUserStopsIds() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        
        const response = await axios.get('http://localhost:3000/getUserStopsIds', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.stopsIds = response.data.stopsIds;
      } catch (error) {
        console.error('Error fetching user stops IDs:', error);
      }
    },
    async fetchAllDelays() {
      for (const stopId of this.stopsIds) {
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
    },
    async addStopId() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        await axios.post('http://localhost:3000/addUserStopId', {
          token,
          stopId: this.stopIdInput
        });
        this.stopIdInput = '';
        this.fetchUserStopsIds();
        alert('Stop ID added successfully');
      } catch (error) {
        alert('Stop ID could not be added: ' + error);
      }
    }
  }
};
</script>
