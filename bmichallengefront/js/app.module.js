var bmiApp = angular.module('bmiApp',['ng-token-auth','ui.router'])

/*******Configs init*******/
bmiApp.apiHost = "http://localhost:3000";
bmiApp.rootHost = "http://localhost:8080/bmichallenge"
bmiApp.config(function($authProvider){
  $authProvider.configure({
    apiUrl: bmiApp.apiHost,
    emailRegistrationPath: '/auth',
    emailSignInPath: '/auth/sign_in',
    passwordResetPath: '/auth/password',
    passwordUpdatePath: '/auth/password',
    storage: 'localStorage',
    confirmationSuccessUrl: bmiApp.rootHost+'/#/home'
  });
});

/*******Directives init*******/
var comparePasswords = function() {
  return {
    require: 'ngModel',
    scope: {
      otherModelValue: "=comparePasswords"
    },
    link: function(scope, element, attributes, ngModel){
      ngModel.$validators.comparePasswords = function(modelValue){
        return modelValue == scope.otherModelValue
      };

      scope.$watch("otherModelValue", function(){
        ngModel.$validate();
      });
    }
  };
};

bmiApp.directive("comparePasswords", comparePasswords);

bmiApp.run(['$rootScope','$state','$auth',function($rootScope,$state,$auth){
  $rootScope.$on('auth:login-success', function(ev, user){
    console.log("login-success");
    $state.go("home");
  });

  $rootScope.$on('auth:login-error', function(ev,user){
    console.log("login-error");
    $state.go("login");
  });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, from, fromState, fromParams, error){
    console.log("state change error");
    if(typeof error!="undefined" && error!=null){
      if(error.reason=="unauthorized"){
        // console.log("No autorizado");
        $state.go('login');
      }else{
        console.log("Reason..:"+error.reason);
      }
    }

    if(typeof fromParams!="undefined" && fromParams!=null){
      if(fromParams.reason=="unauthorized"){
        // console.log("No autorizado");
        $state.go('login');
      }else{
        console.log("Reason..:"+error.reason);
      }
    }
  });  
}]);
