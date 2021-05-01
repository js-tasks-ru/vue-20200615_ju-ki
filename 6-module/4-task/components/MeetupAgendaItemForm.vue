<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="remove($event)">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
<!--      На select v-model-->
<!--      v-model это :prop="value" @event="value = $event"-->
<!--      когда есть только change, то только обрабатывается выбор значения в селекте, и обновляются данные при выборе значения.-->
<!--      Но при этом текущий выбранный элемент в селекте никак не связан с данными-->
      <select class="form-control" title="Тип" v-model="agendaItem_.type" >
        <option
        v-for="type in agendaItemTypes"
        :key="type.value"
        :value="type.value">
          {{ type.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="agendaItem_.startsAt"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="agendaItem_.endsAt"/>
        </div>
      </div>
    </div>

    <template v-if="agendaItem_.type === 'talk'">
      <div class="form-group">
        <label class="form-label">Тема</label>
        <input class="form-control" v-model="agendaItem_.title"/>
      </div>

      <div class="form-group">
        <label class="form-label">Докладчик</label>
        <input class="form-control" v-model="agendaItem_.speaker"/>
      </div>

      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea class="form-control" v-model="agendaItem_.description"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Язык</label>
        <!--      @change="$emit('update:agendaItem' не обязательно, можно использовать  v-model-->
        <select class="form-control" v-model="agendaItem_.language">
          <option
            v-for="lang in agendaTalkLanguages"
            :value="lang.value"
            :key="lang.id">
            {{ lang.text }}
          </option>
        </select>
      </div>
    </template>

    <template v-else-if="agendaItem_.type === 'other'">
      <div class="form-group">
        <label class="form-label">Заголовок</label>
        <input class="form-control" v-model="agendaItem_.title"/>
      </div>

      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea class="form-control" v-model="agendaItem_.description"></textarea>
      </div>
    </template>

    <template v-else>
      <div class="form-group">
        <label class="form-label">Нестандартный текст (необязательно)</label>
        <input class="form-control" v-model="agendaItem_.title"/>
      </div>
    </template>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация'},
  { value: 'opening', text: 'Открытие'},
  { value: 'break', text: 'Перерыв'},
  { value: 'coffee', text: 'Coffee Break'},
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty'},
  { value: 'talk', text: 'Доклад'},
  { value: 'other', text: 'Другое'},
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано', id: Math.random()  },
  { value: 'RU', text: 'RU', id: Math.random()  },
  { value: 'EN', text: 'EN', id: Math.random() },
];

const getTimeInMs = ([hours, minutes]) => (hours * 3600 + minutes * 60) * 1000;
const getTimeInMsFromString = (str) => getTimeInMs(str.split(':'));

export default {
  name: 'MeetupAgendaItemForm',

  props: {
    agendaItem: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      agendaItem_: {
        ...this.agendaItem
      },
      agendaItemTypes: getAgendaItemTypes(),
      agendaTalkLanguages: getTalkLanguages()
    }
  },

  watch: {
    agendaItem: {
      deep: true,
      handler(newValue) {
        this.agendaItem_ = newValue
      }
    },

    agendaItem_: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', newValue);
      }
    },

    startsAt: {
      handler(newValue, oldValue) {
        let newStartsAtMinutes = this.makeMinutesFromData(newValue);
        let oldStartAtMinutes = this.makeMinutesFromData(oldValue);
        let differenceStartAtMinutes = newStartsAtMinutes - oldStartAtMinutes;

        let oldEndsAtMinutes = this.makeMinutesFromData(this.agendaItem_.endsAt);
        let newEndsAtMinutes = (oldEndsAtMinutes + differenceStartAtMinutes + 24 * 60) % (24 * 60);
        let newMinutes = newEndsAtMinutes % 60;

        let newEndsAtHour = (newEndsAtMinutes / 60).toFixed(0);

        newEndsAtHour < 10
          ? (newEndsAtHour = `0${newEndsAtHour}`)
          : newEndsAtHour;

        newMinutes < 10 ? (newMinutes = `0${newMinutes}`) : newMinutes;

        this.agendaItem_.endsAt = `${newEndsAtHour}:${newMinutes}`;
      }
    }
  },

  computed: {
    startsAt() {
      return this.agendaItem_.startsAt;
    }
  },

  methods: {
    remove($event) {
      this.$emit('remove', $event.target.value)
    },

    //parse the agendaItem_ Date format and make a minutes from it
    makeMinutesFromData(strData) {
      let timeMinAndSec = strData.split(':');
      let splitData = timeMinAndSec.map((x) => {
        return parseInt(x, 10);
      });
      let hours = splitData[0];
      let minutes = splitData[1];

      return hours * 60 + minutes;
    }
  }

};
</script>

<style></style>
