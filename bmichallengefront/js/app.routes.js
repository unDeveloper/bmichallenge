bmiApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/login');

  $stateProvider.state('home',{
    url: '/home',
    templateUrl: 'templates/homeTemplate.html',
    controller: 'HomeController',
    resolve:{
      auth: function($auth, $state){
        return $auth.validateUser();
      }
    }
  }).state('login',{
    url: '/login',
    templateUrl: 'templates/loginTemplate.html',
    controller: 'LoginController'
  }).state('register',{
    url: '/register',
    templateUrl: 'templates/registerTemplate.html',
    controller: 'RegisterController'
  });
}]);
