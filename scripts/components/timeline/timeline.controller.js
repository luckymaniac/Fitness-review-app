class TimelineController {
  constructor($scope, GoalRecord) {
    this._$scope = $scope;
    this._GoalRecord = GoalRecord;
  }

  $onChanges(changes) {
    this.load();
  }

  load() {
    if (!this.client) {
      return;
    }

    this._GoalRecord.timeline(this.client.id)
      .then(res => {
        this.convert(res.goal_records);
      });
  }

  convert(goal_records) {
    let prev = null;
    let days = {
      fat_loss: 0,
      non_fat_loss: 0
    };

    goal_records = goal_records.reverse().map(goal_record => {
      let d = 0;
      if (prev) {
        d = moment(goal_record.created_at).diff(moment(prev.created_at), 'days');
      }

      if (prev && prev.goal == 'Fat Loss') days.fat_loss += d;
      else if (prev && prev.goal != 'Training Room') days.non_fat_loss += d;

      if (goal_record.goal == 'Fat Loss') goal_record.time_in_goal = days.fat_loss + 1;
      else if (goal_record.goal == 'Training Room') goal_record.time_in_goal = 1;
      else goal_record.time_in_goal = days.non_fat_loss + 1;

      prev = goal_record;
      
      goal_record.date = moment(goal_record.created_at).format('M/D/YYYY');
      return goal_record;
    });

    const results = {};
    for (var i = 0; i < goal_records.length; i++) {
      results[goal_records[i].date] = goal_records[i];
    }

    this.goal_records = _.values(results);
  }

}

TimelineController.$inject = ['$scope', 'GoalRecord'];

export default TimelineController;
