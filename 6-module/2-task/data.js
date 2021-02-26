/** URL адрес API */
import { mockMeetups } from './mock-meetups';

export const API_URL = 'https://course-vue.javascript.ru/api';

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
export function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Получает список митапов с API
 * @return {Promise}
 */
export async function fetchMeetups() {
  return Promise.resolve(mockMeetups);
  // return fetch(`${API_URL}/meetups`).then((res) => res.json());
}
