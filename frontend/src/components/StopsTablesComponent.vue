<template>
  <textarea v-model="stopIdInput"></textarea>
  <button @click="addStopId">Add Stop</button>
  <div v-for="(delay, index) in allDelays" :key="index">
    <br />
    <br />
    <h3>Stop #{{ stopsIds[index] }}</h3>
    <vue-good-table
      :columns="columns"
      :rows="delay"
      :paginate="false"
      :lineNumbers="true"
      :globalSearch="false"
    />
    <button @click="removeStopId(stopsIds[index])">Remove Stop</button>
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
        { label: 'Route ID', field: 'routeId', sortable: false },
        { label: 'Estimated Time', field: 'estimatedTime', sortable: false },
        { label: 'Delay (Seconds)', field: 'delayInSeconds', sortable: false },
      ],
      allDelays: []
    };
  },
  async created() {
    await this.fetchUserStopsIds();
    await this.fetchAllDelays();
  },
  methods: {
    async refreshStopsData() {
      this.stopIdInput = '';
      await this.fetchUserStopsIds();
      this.allDelays = [];
      this.fetchAllDelays();
    },
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
        console.error('Error fetching user stops Ids:', error);
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
          console.error('Error fetching stop data', stopId, ':', error);
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
        alert('Stop added successfully');
        this.refreshStopsData();
      } catch (error) {
        alert('Stop could not be added: ' + error);
      }
    },
    async removeStopId(stopId) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        await axios.post('http://localhost:3000/removeUserStopId', {
          token,
          stopId
        });
        alert('Stop removed successfully');
        this.refreshStopsData();
      } catch (error) {
        alert('Stop could not be removed: ' + error);
      }
    }
  }
};
</script>
