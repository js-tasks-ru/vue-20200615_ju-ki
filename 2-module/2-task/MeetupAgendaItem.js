import { agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item" v-if="agenda">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" v-bind:src="\`/assets/icons/icon-\${processedAgenda.defaultIcon}.svg\`" />
      </div>
      <div class="meetup-agenda__item-col" v-if="agenda.startsAt || agenda.endsAt">{{agenda.startsAt}} - {{agenda.endsAt}}</div>
      <div class="meetup-agenda__item-col">

        <h5 class="meetup-agenda__title" v-if="agenda.title"> {{agenda.title}}</h5>
        <h5 class="meetup-agenda__title" v-else>{{processedAgenda.defaultTitle}}</h5>

        <p v-if="agenda.type === 'talk' " >
          <span v-if="agenda.speaker">{{ agenda.speaker }}</span>
          <span v-if="agenda.speaker" class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang" v-if="agenda.language">{{agenda.language}}</span>
        </p>

        <p v-if="agenda.description">{{agenda.description}}</p>
      </div>
    </div>`,

  props: {
    agenda: {
      required: true,
      type: Object
    }
  },

  computed: {
    processedAgenda() {
      if(this.agenda) {
        return Object.assign({}, this.agenda, {
          defaultTitle: agendaItemTitles[this.agenda.type],
          defaultIcon: agendaItemIcons[this.agenda.type]
        })
      }
    }
  }

};
