import random from './random';

export default (phrases: Array<string>): string => {
  return phrases[random(0, phrases.length)];
};
