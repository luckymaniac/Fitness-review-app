function PressEnter() {

  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.pressEnter);
        });

        event.preventDefault();
      }
    });
  };
}

export default PressEnter;
