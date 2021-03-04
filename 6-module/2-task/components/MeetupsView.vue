<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          :options="dateFilterOptions"
          v-model="options_.date"
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
              v-model="options_.search"
            />
          </div>
        </div>
        <div class="form-group form-group_inline">
          <page-tabs :selected.sync="options_.view"></page-tabs>
        </div>
      </div>
    </div>

    <transition
      v-if="filteredMeetups && filteredMeetups.length"
      name="fade"
      mode="out-in"
    >
      <meetups-list
        v-if="options_.view === '' || options_.view === 'list'"
        :meetups="filteredMeetups"
        key="list"
      ></meetups-list>
      <meetups-calendar
        v-else-if="options_.view === 'calendar'"
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
    options_: {
      deep: true,
      handler(newValue) {
        this.$emit('update:options', newValue)
      }
    },

    // если входной параметр будет обновлён (родитель отправит новое значение), компонент об этом не узнает (ничего не произойдёт)
    // Требуется локальное состояние получать не только на момент инициализации в data, но всегда, когда обновляются options
    options: {
      deep: true,
      handler(newValue) {
        this.options_ = newValue
      }
    }
  },

  data() {
    return {
      dateFilterOptions: [
        { text: 'Все', value: 'all' },
        { text: 'Прошедшие', value: 'past' },
        { text: 'Ожидаемые', value: 'future' },
      ],
      options_: {
        ...this.options
      }
    };
  },

  computed: {
    filteredMeetups() {
      let filteredMeetups = this.meetups;

      if (this.options_.date === 'past') {
        filteredMeetups = filteredMeetups.filter(
          (meetup) => new Date(meetup.date) <= new Date(),
        );
      } else if (this.options_.date === 'future') {
        filteredMeetups = filteredMeetups.filter(
          (meetup) => new Date(meetup.date) > new Date(),
        );
      }

      if (this.options_.participation === 'organizing') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.organizing);
      } else if (this.options_.participation === 'attending') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.attending);
      }

      if (this.options_.search) {
        const concatMeetupText = (meetup) =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer]
            .join(' ')
            .toLowerCase();
        filteredMeetups = filteredMeetups.filter((meetup) =>
          concatMeetupText(meetup).includes(this.options_.search.toLowerCase()),
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
