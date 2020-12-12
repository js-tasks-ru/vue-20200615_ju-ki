import Vue from '/vendor/vue.esm.browser.js';

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */


/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      meetup: Object,
      API_URL: 'https://course-vue.javascript.ru/api',
      MEETUP_ID: 3,
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
      }
    }
  },

  async mounted() {
    this.meetup = await this.fetchMeetup(this.MEETUP_ID);
    this.meetupImageUrl = await this.fetchMeetupImage(this.MEETUP_ID);
  },

  computed: {

    processedDefaultAgendaTitle(type) {
      let defaultAgendaTitle = ''
      for (let defaultTitle in this.agendaItemTitles) {
        if (type === this.agendaItemTitles[defaultTitle]) {
          console.log(this.agendaItemTitles[defaultTitle])
        }

      }

      return defaultAgendaTitle;
    },

    processedDefaultAgendaIcon() {
      return '';
    },

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
            defaultTitle: this.processedDefaultAgendaTitle(agenda.type),
            defaultIcon: this.processedDefaultAgendaIcon,
          })
        ) : undefined
      });
    },



    // defaultAgendaItemTitle: function (type) {
    //   let defaultTitle = '';
    //   for (let key in this.agendaItemTitles.keys) {
    //     console.log(key)
    //     if (key === type) {
    //       defaultTitle = this.agendaItemTitles.key
    //     }
    //   }
    //   return defaultTitle;
    // }
  },

  methods: {
    fetchMeetup(meetupId) {
      return fetch(`${this.API_URL}/meetups/${meetupId}`).then( response => response.json())
    },

    fetchMeetupImage(imageId) {
      return fetch (`${this.API_URL}/images/${imageId}`).then(res => res.url)
    }
  },
});

