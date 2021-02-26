const { getSolutionPath } = require('taskbook-test-utils');
const MeetupsView = require(getSolutionPath('components/MeetupsView')).default;
import { shallowMount } from '@vue/test-utils';
import { mockMeetups } from '../mock-meetups';
import MeetupsList from '../components/MeetupsList';
import FormCheck from '../components/FormCheck';
import MeetupsCalendar from '../components/MeetupsCalendar';
import PageTabs from '../components/PageTabs';
require('./mock-date');

describe('6-module-2-task', () => {
  describe('MeetupsView', () => {});
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MeetupsView, {
      propsData: {
        meetups: mockMeetups,
        options: {
          view: 'list',
          date: 'all',
          participation: 'all',
          search: '',
        },
      },
    });
  });

  it('MeetupsView должен иметь параметры meetups (Array) и options (Object)', () => {
    expect(wrapper.vm.$options.props.meetups).toBeTruthy();
    expect(wrapper.vm.$options.props.meetups.type).toBe(Array);
    expect(wrapper.vm.$options.props.options).toBeTruthy();
    expect(wrapper.vm.$options.props.options.type).toBe(Object);
  });

  it('MeetupsView должен по умолчанию выводить список митапов через MeetupsList', async () => {
    expect(wrapper.findComponent(MeetupsList).props('meetups')).toEqual(
      mockMeetups,
    );
  });

  it('MeetupsView должен выводить ожидаемые митапы, в которых участвует пользователь и есть подстрока "Москва" через MeetupsCalendar при соответствующих изменениях параметров', async () => {
    Date.mockNow(new Date('2020-05-01'));
    await wrapper.setProps({
      options: {
        view: 'calendar',
        date: 'future',
        participation: 'attending',
        search: 'Москва',
      },
    });
    expect(wrapper.findComponent(MeetupsCalendar).exists()).toBe(true);
    expect(wrapper.findComponent(MeetupsCalendar).props('meetups')).toEqual([
      mockMeetups[0],
    ]);
  });

  it('MeetupsView должен порождать события обновления параметров при их изменении', async () => {
    const date = 'old';
    const view = 'calendar';
    const search = 'Москва';

    await wrapper.findComponent(FormCheck).vm.$emit('change', date);
    await wrapper.findComponent(PageTabs).vm.$emit('update:selected', view);
    await wrapper.find('#filters-panel__search').setValue(search);

    const emittedUpdateOptions = wrapper.emitted()['update:options'];

    expect(emittedUpdateOptions).toHaveLength(3);
    expect(emittedUpdateOptions[0]).toHaveLength(1);
    expect(emittedUpdateOptions[0][0].date).toBe(date);
    expect(emittedUpdateOptions[1]).toHaveLength(1);
    expect(emittedUpdateOptions[1][0].view).toBe(view);
    expect(emittedUpdateOptions[2]).toHaveLength(1);
    expect(emittedUpdateOptions[2][0].search).toBe(search);
  });
});
