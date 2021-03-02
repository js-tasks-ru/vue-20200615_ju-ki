<template>
  <form class="form meetup-form" @submit.prevent="onSubmit" >
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="meetup_.title"/>
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="meetup_.date"/>
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="meetup_.place"/>
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea class="form-control" rows="3" v-model="meetup_.description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label" >Изображение</label>
          <image-uploader v-model="meetup_.imageId"/>
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
       <meetup-agenda-item-form class="mb-3"
          v-for="(agendaItem, idx) in meetup_.agenda"
          :agenda-item="agendaItem"
          :key="agendaItem.id"
          @remove="removeAgendaItem(idx)"
          @update:agendaItem="updateAgendaItem(idx, $event)"
       />

      <div class="form-section_append">
        <button type="button"
        @click="addAgendaItem"
        >
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          ref="cancelButton"
          @click="$emit('cancel', 'cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit">
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';
import deepClone from '../lodash.clonedeep.min';

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      required: true,
      type: Object
    },
    submitText: String
  },

  data() {
    return {
      meetup_: deepClone(this.meetup)
    }
  },

  // computed: {
  //   meetup_() {
  //     return deepClone(this.meetup)
  //   },
  //   processedMeetup() {
  //     return Object.assign({}, this.meetup_, {
  //       date: new Date(this.meetup_.date).toLocaleString('af-ZA')
  //     });
  //   },
  // },

  methods: {
    onSubmit() {
      this.$emit('submit', deepClone(this.meetup_))
    },

    addAgendaItem() {
      const newAgendaItem = buildAgendaItem();
      if (this.meetup_.agenda.length > 0) {
        newAgendaItem['startsAt'] = this.meetup_.agenda[this.meetup_.agenda.length - 1].endsAt;
      }
      this.meetup_.agenda.push(newAgendaItem);
    },

    removeAgendaItem(idx) {
      if (this.meetup_.agenda.length > 0) {
        this.meetup_.agenda.splice(idx, 1)
      }
    },

    updateAgendaItem(idx, newItem) {
      this.meetup_.agenda.splice(idx, 1, newItem);
    },

  }

};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
