let simpleDateFilter = function() {
  return function(dateStr) {
    if (!dateStr) return "";

    return moment(new Date(dateStr)).format("MMM DD");
  };
};

export default simpleDateFilter;
