import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
        <meetup-agenda-item
          v-for="agenda in meetup.agenda"
          :key="meetup.agenda.id"
          :agenda="agenda"
        ></meetup-agenda-item>
    </div>`,


  components: {
    MeetupAgendaItem
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    }
  },


};
