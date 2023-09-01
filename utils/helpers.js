const dayjs = require('dayjs');

module.exports = {
  format_date: (date) => {
    return dayjs(date).format('M/D/YYYY');
  }
};
