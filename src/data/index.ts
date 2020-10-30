import { existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { Storage, Top, User } from '../types/data';
import { getDate, isMorning } from '../helpers/time';
import random from '../helpers/random';

const filePath = resolve(process.cwd(), './storage/pidor.json');

if (!existsSync(filePath)) {
  writeFileSync(filePath, '{}');
}

const loadData = (): Storage => {
  const raw = readFileSync(filePath);
  let data: Storage;
  try {
    data = JSON.parse(raw.toString());
  } catch (e) {
    console.error(e);
    data = {
      users: [],
      winners: {},
      morningWinners: {},
      eveningWinners: {},
      specialWinners: [],
    };
  }

  if (!data.users) {
    data.users = [];
  }

  if (!data.winners) {
    data.winners = {};
  }

  if (!data.specialWinners) {
    data.specialWinners = [];
  }

  if (!data.morningWinners) {
    data.morningWinners = {};
  }

  if (!data.eveningWinners) {
    data.eveningWinners = {};
  }

  return data;
};

interface SaveDataAttributes<T> {
  data?: Storage;
  result: T;
}

const saveData = <T>({ data, result }: SaveDataAttributes<T>) => {
  try {
    if (data) {
      writeFileSync(filePath, JSON.stringify(data));
    }
  } catch (e) {
    console.error(e);
    return result;
  }

  return result;
};

type DataAction<T, K> = (data: Storage, arg: K) => SaveDataAttributes<T>

const wrapped = <T, K>
  (func: DataAction<T, K>) => (arg: K) => saveData(func(loadData(), arg));

export const addUser = wrapped<boolean, User>(
  (data, { id, username }): SaveDataAttributes<boolean> => {
    if (!data.users.find((i) => i.username === username && id === i.id)) {
      data.users.push({ id, username });

      return { data, result: true };
    }

    return { result: false };
  },
);

export const removeUser = wrapped<boolean, User>(
  (data, { id, username }): SaveDataAttributes<boolean> => {
    const index = data.users.findIndex((i) => i.username === username && id === i.id);
    if (index >= 0) {
      data.users = data.users.slice(0, index)
        .concat(data.users.slice(index + 1, data.users.length));

      return { data, result: true };
    }

    return { result: false };
  },
);

export const randomUser = wrapped<User, void>((data): SaveDataAttributes<User> => {
  const winner = data.users[random(0, data.users.length)];
  (isMorning() ? data.morningWinners : data.eveningWinners)[getDate()] = winner;

  return { result: winner, data };
});

export const getWinner = wrapped<User | null, void>((data) => {
  const winnersMap = isMorning() ? data.morningWinners : data.eveningWinners;
  const winner = winnersMap[getDate()];
  if (winner) {
    return { result: winner };
  }

  return { result: null };
});

export const getTop = wrapped<Top, void>((data):SaveDataAttributes<Top> => {
  const keys = Object.values(data.winners).concat(Object.values(data.morningWinners).concat(Object.values(data.eveningWinners)));
  console.log(keys);
  const top = keys.reduce((acc: Top, i) => {
    if (!acc[i.id]) {
      acc[i.id] = 0;
    }

    acc[i.id] += 1;

    return acc;
  }, {});

  return { result: top };
});

export const addSpecialWinners = wrapped<User, User[]>((data, users):SaveDataAttributes<User> => {
  const winner = users[random(0, users.length)];

  data.specialWinners.push(winner);

  return { data, result: winner };
});
