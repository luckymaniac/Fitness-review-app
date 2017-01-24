let simpleDateFilter = function() {
  return function(dateStr) {
    if (!dateStr) return "";

    return moment(new Date(Date.parse(dateStr))).format("MMM DD");
  };
};

export default simpleDateFilter;
