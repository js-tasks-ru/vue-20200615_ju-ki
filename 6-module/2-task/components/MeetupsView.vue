<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          :options="dateFilterOptions"
          v-model="options.date"
        ></form-check>
      </div>

      <div class="filters-panel__col">
        <div class="form-group form-group_inline">
          <div class="input-group input-group_icon input-group_icon-left">
            <input
              id="filters-panel__search"
              class="form-control form-control_rounded form-control_sm"
              type="text"
              placeholder="Поиск"
              v-model="options.search"
            />
          </div>
        </div>
        <div class="form-group form-group_inline">
          <page-tabs :selected.sync="options.view"></page-tabs>
        </div>
      </div>
    </div>

    <transition
      v-if="filteredMeetups && filteredMeetups.length"
      name="fade"
      mode="out-in"
    >
      <meetups-list
        v-if="options.view === '' || options.view === 'list'"
        :meetups="filteredMeetups"
        key="list"
      ></meetups-list>
      <meetups-calendar
        v-else-if="options.view === 'calendar'"
        :meetups="filteredMeetups"
        key="calendar"
      ></meetups-calendar>
    </transition>
    <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
  </div>
</template>

<script>
import MeetupsList from './MeetupsList';
import MeetupsCalendar from './MeetupsCalendar';
import PageTabs from './PageTabs';
import FormCheck from './FormCheck';
import AppEmpty from './AppEmpty';

export default {
  name: 'MeetupsView',

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    FormCheck,
    AppEmpty,
  },

  props: {
    meetups: Array,
    options: {
      type: Object
    }
  },

  watch: {
    options: {
      view: {
        handler(newValue) {
          this.$emit('update:view', newValue)
        }
      },
      date: {
        handler(newValue) {
          this.$emit('update:date', newValue)
        }
      },
      participation: {
        handler(newValue) {
          this.$emit('update:participation', newValue)
        }
      },
      search: {
        handler(newValue) {
          this.$emit('update:search', newValue)
        }
      },
    }
  },

  data() {
    return {
      dateFilterOptions: [
        { text: 'Все', value: 'all' },
        { text: 'Прошедшие', value: 'past' },
        { text: 'Ожидаемые', value: 'future' },
      ],
    };
  },

  computed: {
    filteredMeetups() {
      let filteredMeetups = this.meetups;

      if (this.options.date === 'past') {
        filteredMeetups = filteredMeetups.filter(
          (meetup) => new Date(meetup.date) <= new Date(),
        );
      } else if (this.options.date === 'future') {
        filteredMeetups = filteredMeetups.filter(
          (meetup) => new Date(meetup.date) > new Date(),
        );
      }

      if (this.options.participation === 'organizing') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.organizing);
      } else if (this.options.participation === 'attending') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.attending);
      }

      if (this.options.search) {
        const concatMeetupText = (meetup) =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer]
            .join(' ')
            .toLowerCase();
        filteredMeetups = filteredMeetups.filter((meetup) =>
          concatMeetupText(meetup).includes(this.options.search.toLowerCase()),
        );
      }

      return filteredMeetups;
    },
  },
};
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}

@media all and (max-width: 480px) {
  #filters-panel__search {
    width: calc(100% - 112px);
  }

  #filters-panel__search >>> .form-control {
    max-width: 100%;
  }
}
</style>
