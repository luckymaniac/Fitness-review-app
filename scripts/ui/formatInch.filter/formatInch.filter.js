let formatInchFilter = function() {
  return function(inch) {
    if (!inch || _.isNaN(inch)) return `0"`;
    const h = parseInt(inch);

    return `${_.floor(h / 12)}'  ${h % 12}"`;
  };
};

export default formatInchFilter;
