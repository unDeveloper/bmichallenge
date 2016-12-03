bmiApp.controller('LoginController',['$scope','$auth','$state', function($scope,$auth,$state){

  $scope.loginForm = null
  $scope.initForm = function(){
    $scope.loginForm = {};
  };

  $scope.userLogin = function(valid){
    if(valid){
      $auth.submitLogin($scope.loginForm).then(function(resp){
        console.log("goood");
        $state.go("home");
      }).catch(function(resp){
        // Notification.error("Invalid user name or password");
      });
    }else{
      // Notification.error("Please, fill both fields");
      alert("Please, fill both fields");
    }
  };
}]);
