import 'angular';
import 'app/app.less';
import config from 'app/appConfig.json';


// register the app module with dependencies
angular.module('app', config.moduleDependencies)
  // register the app directive
  .directive('app', () => {
    return {template: require('app/app.html')}
  });

// kick angular!
angular.bootstrap(document, ['app']);
