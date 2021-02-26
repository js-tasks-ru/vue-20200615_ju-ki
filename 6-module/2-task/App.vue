<template>
  <div id="app" class="page container">
    <div>
      <fieldset style="padding: 0 1rem;">
        <legend>Текущие значения</legend>
        <p>view = {{ options.view }}</p>
        <p>date = {{ options.date }}</p>
        <p>participation = {{ options.participation }}</p>
        <p>search = {{ options.search }}</p>
      </fieldset>
      <fieldset style="padding: 0 1rem;">
        <legend>Обновить значения</legend>
        <p>
          view:
          <button @click="options.view = 'list'">list</button> |
          <button @click="options.view = 'calendar'">calendar</button>
        </p>
        <p>
          date:
          <button @click="options.date = 'all'">all</button> |
          <button @click="options.date = 'future'">future</button> |
          <button @click="options.date = 'past'">past</button>
        </p>
        <p>
          participation:
          <button @click="options.participation = 'all'">all</button> |
          <button @click="options.participation = 'attending'">
            attending
          </button>
          |
          <button @click="options.participation = 'organizing'">
            organizing
          </button>
        </p>
        <p>
          search:
          <button @click="options.search = ''">''</button> |
          <button @click="options.search = 'msk'">msk</button> |
          <button @click="options.search = 'value'">value</button>
        </p>
      </fieldset>
    </div>

    <meetups-view :meetups="processedMeetups" :options.sync="options" />
  </div>
</template>

<script>
import MeetupsView from './components/MeetupsView';
import { API_URL, fetchMeetups } from './data';

export default {
  name: 'App',

  components: { MeetupsView },

  data() {
    return {
      meetups: [],
      options: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: '',
      },
    };
  },

  async mounted() {
    this.meetups = await fetchMeetups();
  },

  computed: {
    processedMeetups() {
      return this.meetups.map((meetup) => ({
        ...meetup,
        cover: meetup.imageId
          ? `${API_URL}/images/${meetup.imageId}`
          : undefined,
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }));
    },
  },
};
</script>

<style>
p {
  margin: 1rem auto;
}
</style>
