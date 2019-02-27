const _appendLeadingZero = n => n < 10 ? `0${n}` : n

export const msToMinutesAndSeconds = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor(((ms % 60000) / 1000)).toFixed(0);
  return `${minutes}:${_appendLeadingZero(seconds)}`;
}
