import Vue from '/vendor/vue.esm.browser.js';

export const app = new Vue({
  el: '#app',

  data() {
    return {
      meetup: Object,
      API_URL: 'https://course-vue.javascript.ru/api',
      MEETUP_ID: 5,
      meetupImageUrl: String,

      agendaItemTitles: {
        registration: 'Регистрация',
        opening: 'Открытие',
        break: 'Перерыв',
        coffee: 'Coffee Break',
        closing: 'Закрытие',
        afterparty: 'Afterparty',
        talk: 'Доклад',
        other: 'Другое',
      },

      agendaItemIcons: {
        registration: 'key',
        opening: 'cal-sm',
        talk: 'tv',
        break: 'clock',
        coffee: 'coffee',
        closing: 'key',
        afterparty: 'cal-sm',
        other: 'cal-sm',
      }
    }
  },

  async mounted() {
    this.meetup = await this.fetchMeetup(this.MEETUP_ID);
    this.meetupImageUrl = await this.fetchMeetupImage(this.MEETUP_ID);
  },

  computed: {
    processedMeetup() {
      return Object.assign({}, this.meetup, {
        date: new Date(this.meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        meetupImageUrl: this.meetupImageUrl,
        agenda: this.meetup.agenda ? this.meetup.agenda.map(agenda => ({
            ...agenda,
          defaultTitle: agenda.title == null ? this.processDefaultAgendaTitle(agenda.type) : agenda.title,
          defaultIcon: this.processedDefaultAgendaIcon(agenda.type),
          })
        ) : null
      });
    },
  },

  methods: {
    fetchMeetup(meetupId) {
      return fetch(`${this.API_URL}/meetups/${meetupId}`).then( response => response.json())
    },

    fetchMeetupImage(imageId) {
      return fetch (`${this.API_URL}/images/${imageId}`).then(res => res.url)
    },

    processDefaultAgendaTitle (type) {
      let defaultAgendaTitle = ''
      for (let key in this.agendaItemTitles) {
        if (type === key) {
          defaultAgendaTitle = this.agendaItemTitles[key];
        }
      }
      return defaultAgendaTitle;
    },

    processedDefaultAgendaIcon(type) {
      let iconName = '';
      for (let key in this.agendaItemIcons) {
        if (type === key) {
          iconName = this.agendaItemIcons[key];
        }
      }
      return iconName;
    },


  },
});

