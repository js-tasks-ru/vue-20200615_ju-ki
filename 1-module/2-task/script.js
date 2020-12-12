import Vue from '/vendor/vue.esm.browser.js';

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

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
      meetupImageUrl: String
    }
  },

  async mounted() {
    this.meetup = await this.fetchMeetup(this.MEETUP_ID);
    this.meetupImageUrl = await this.fetchMeetupImage(this.MEETUP_ID);
  },

  computed: {
    processedMeetup() {
      return Object.assign(this.meetup, {
        localDate: new Date(this.meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        meetupImageUrl: this.meetupImageUrl
      })
    }
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
    fetchMeetup(meetupId) {
      return fetch(`${this.API_URL}/meetups/${meetupId}`).then( response => response.json())
    },

    fetchMeetupImage(imageId) {
      // https://course-vue.javascript.ru/api/images/3
      return fetch (`${this.API_URL}/images/${imageId}`).then(res => res.url)
    }
  },
});

