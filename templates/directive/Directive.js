export default angular.module('<%= moduleName %>', [])
  .directive('<%= name %>', <%= name %>);

function <%= name %>() {
  return {
    restrict: '<%= restrict %>',
    controller: <%= name %>Controller,
    controllerAs: '<%= controllerAs %>',
    template: require('<%= moduleName %>/<%= moduleName %>.html')
  }
}

class <%= name %>Controller {

  constructor($element, $interval, $window, $scope) {
  }

}

<%= name %>Controller.$inject=['$element', '$interval', '$window', '$scope'];
