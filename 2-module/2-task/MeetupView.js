import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div v-if="meetup">
      <!-- meetup-cover -->
      <meetup-cover :meetup="meetup"></meetup-cover>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description :meetup="meetup"></meetup-description>

            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda :meetup="meetup"></meetup-agenda>
          </div>
          <div class="meetup__aside">
            <meetup-info :meetup="meetup"></meetup-info>
          </div>
        </div>
      </div>
    </div>`,

  // Props
  props: {
    meetup: Object
  },

  components: {
    MeetupDescription,
    MeetupInfo,
    MeetupCover,
    MeetupAgenda
  }
};
