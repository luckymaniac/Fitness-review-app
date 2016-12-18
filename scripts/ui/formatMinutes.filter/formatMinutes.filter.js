let formatMinutesFilter = function() {
  return function(minutes) {
    if (!minutes || _.isNaN(minutes)) return "0h 00m";
    const m = parseInt(minutes);

    let result = m % 60 < 10 ? `0${m % 60}` : `${m % 60}`;
    result = _.floor(m / 60) + 'h ' + result + 'm';

    return result;
  };
};

export default formatMinutesFilter;
