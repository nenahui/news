import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

export const formatDate = (date: string, type: 'default' | 'v2' = 'default'): string => {
  const parsedDate = dayjs(date);
  const currentYear = dayjs().year();

  const now = dayjs();

  if (type === 'v2') {
    const diffInMinutes = now.diff(parsedDate, 'minute');
    const diffInHours = now.diff(parsedDate, 'hour');
    const diffInDays = now.diff(parsedDate, 'day');
    const diffInYears = now.diff(parsedDate, 'year');

    if (diffInMinutes < 60) {
      return `${diffInMinutes}min`;
    } else if (diffInHours < 12) {
      return `${diffInHours}h`;
    } else if (diffInHours < 24) {
      return `Yesterday в ${parsedDate.format('hh:mm A')}`;
    } else if (diffInDays < 365) {
      return parsedDate.format('DD, MMM hh:mm A');
    } else if (diffInYears >= 1) {
      return parsedDate.format('DD, MMM, YYYY');
    }
  }

  const formatString = parsedDate.year() !== currentYear ? 'DD MMMM, YYYY hh:mm A' : 'DD MMMM hh:mm A';
  return parsedDate.format(formatString);
};
