import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <div class="meetup-agenda__item"
           v-for="agenda in meetup.agenda"
           :key="meetup.agenda.id"
      >
        <meetup-agenda-item
          :agenda="agenda"
        ></meetup-agenda-item>
      </div>
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
