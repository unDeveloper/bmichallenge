// bmiApp.controller('RegisterController',['$scope','$http','Notification',function($scope,$http,Notification){
bmiApp.controller('RegisterController',['$scope','$http',function($scope,$http){

  console.log("RegisterController");
  $scope.registerForm = null;
  $scope.initForm = function(){
    $scope.registerForm = {};
  };

  $scope.submitRegister = function(valid){
    console.log("submitUser function");
    $scope.registerForm.confirm_success_url = bmiApp.rootHost+"/#/home";
    if(valid){
      $http.post(bmiApp.apiHost+"/auth",$scope.registerForm).then(function successCallback(response){
        console.log("register");
      }, function errorCallback(error){
        console.log("error");
      })
    }else{
      alert("Please check the register form");
    }
  };
}]);
