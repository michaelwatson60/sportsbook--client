import dayjs from 'dayjs/dayjs.min';

import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fa';
import 'dayjs/locale/fr';
import 'dayjs/locale/id';
import 'dayjs/locale/it';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/pt';
import 'dayjs/locale/ru';
import 'dayjs/locale/se';
import 'dayjs/locale/th';
import 'dayjs/locale/tr';
import 'dayjs/locale/vi';
import 'dayjs/locale/zh-cn'; // Note: Day.js uses 'zh-cn' for Chinese

const capitalizeFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

export const getUpcomingDates = (lang, t) => {
  const dates = [];
  for (let i = 0; i < 8; i++) {
    const date = dayjs(Date.now() + i * 8.64e7).locale(lang); // set the locale
    const dayShort = date.format('ddd'); // ex: "dim.", "lun."

    dates.push({
      title: i ? capitalizeFirst(dayShort) : 'Today', // or t('today')
      day: date.format('DD'),
      full: date,
    });
  }

  dates.push({
    title: t('all'),
    full: 'all',
  });

  return dates;
};
