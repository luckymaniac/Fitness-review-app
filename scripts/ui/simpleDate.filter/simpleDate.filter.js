let simpleDateFilter = function() {
  return function(dateStr, local) {
    if (!dateStr) return "";
    if (local) {
      return moment(new Date(dateStr)).format("MMM DD");
    } else {
      return moment.utc(new Date(dateStr)).format("MMM DD");
    }
  };
};

export default simpleDateFilter;
