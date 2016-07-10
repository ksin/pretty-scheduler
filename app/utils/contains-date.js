export default function(dates, date) {
  for (let m of dates) {
    if (m.isSame(date)) { return true; }
  }
  return false;
}
