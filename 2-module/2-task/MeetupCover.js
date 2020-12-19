import { getMeetupCoverLink } from './data.js';

export const MeetupCover = {

  template: `<div
    style="\`\${processedMeetup.meetupImageUrl}\` ? \`--bg-url: url('\${processedMeetup.imgUrl}')\` : ''"
    class="meetup-cover"
  >
  <h1 class="meetup-cover__title">{{processedMeetup.title}}</h1>
  </div>`,

  name: 'MeetupCover',

  // Пропсы
  props: {
    meetup: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      imgUrl: ''
    }
  },

  async mounted() {
    this.imgUrl = this.getCover(this.meetup)
  },

  computed: {
    processedMeetup() {
      if (this.meetup) {
        return Object.assign({}, this.meetup, {
          imgUrl: this.imgUrl
        })
      }
    }
  },

  methods: {
    getCover(meetup) {
      return getMeetupCoverLink(meetup)
    }
  }
};
