const { getSolutionPath } = require('taskbook-test-utils');
const FadeTransition = require(getSolutionPath('components/FadeTransition'))
  .default;
const FadeTransitionGroup = require(getSolutionPath(
  'components/FadeTransitionGroup',
)).default;

describe('5-module-5-task', () => {
  describe('FadeTransition', () => {
    it('FadeTransition добавлен, но требует ручной проверки', async () => {
      expect(FadeTransition).toBeDefined();
    });
  });

  describe('FadeTransitionGroup', () => {
    it('FadeTransitionGroup добавлен, но требует ручной проверки', async () => {
      expect(FadeTransitionGroup).toBeDefined();
    });
  });
});
