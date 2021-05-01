<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="remove($event)">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <dropdown-button title="Тип" :options="$options.agendaItemTypes" v-model="agendaItem_.type" />
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <app-input type="time" placeholder="00:00" v-model="agendaItem_.startsAt" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <app-input type="time" placeholder="00:00" v-model="agendaItem_.endsAt" />
        </div>
      </div>
    </div>

<!--    в v-for итерация по одному типу из fieldSpecifications определенного выбранного типа из dropdown-->
<!--    каждый тип из fieldSpecifications - массив, "комплект полей", принадлежащие этому типу (talk, other, ...).-->
<!--    каждое поле - это описание конкретного компонента и его параметров-->
    <template v-for="specificationItem in $options.fieldSpecifications[agendaItem_.type]" >
      <div class="form-group" :key="specificationItem.title">
        <label class="form-label">{{specificationItem.title}}</label>
        <component
          :is="specificationItem.component"
          v-model="agendaItem_[specificationItem.field]"
          v-bind="{
             multiline: specificationItem.props.multiline,
             options: specificationItem.props.options,
             title: specificationItem.props.title
          }"
        />
      </div>
    </template>

  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import {
  getAgendaItemLanguageOptions,
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton },

  agendaItemTypes: getAgendaItemTypes(),
  agendaTalkLanguages: getAgendaItemLanguageOptions(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

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
      }
    }
  },

  watch: {
    agendaItem: {
      deep: true,
      handler(newValue) {
        this.agendaItem_ = newValue;
      }
    },

    agendaItem_: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', newValue)
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
