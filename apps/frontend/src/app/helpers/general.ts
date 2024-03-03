export function formatDate(dateString: string) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [day, monthIndex, year] = dateString.split('.');
  const monthName = months[parseInt(monthIndex, 10) - 1];
  return `${day} ${monthName} ${year}`;
}
