const { getSolutionPath } = require('taskbook-test-utils');
const { LINK } = require(getSolutionPath('index'));

describe('6-module-5-task', () => {
  test('Файл index.js должен содержать ссылку на репозиторий с проектом с основами всех страниц', () => {
    expect(LINK).toBeTruthy();
  });
});
