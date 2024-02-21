export const formatDateAndTime = (data: string) => {
  const dateTime = new Date(data);

  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}
