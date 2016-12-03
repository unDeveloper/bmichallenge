bmiApp.controller('HomeController',['$scope','$http','$auth','$state', function($scope, $http,$auth,$state){
  console.log("HomeController");

  $scope.calculateBMI = function(){
    $scope.disableSave = false;
    $scope.bmi = ($scope.input.mass/(Math.pow($scope.input.height,2))).toFixed(2);
    if($scope.bmi < 15){
      $scope.bmiClass = 1;
    }else if ($scope.bmi>=15 && $scope.bmi<16) {
      $scope.bmiClass = 2;
    }else if ($scope.bmi>=16 && $scope.bmi<18.5) {
      $scope.bmiClass = 3;
    }else if ($scope.bmi>=18.5 && $scope.bmi<25) {
      $scope.bmiClass = 4;
    }else if ($scope.bmi>=25 && $scope.bmi<30) {
      $scope.bmiClass = 5;
    }else if ($scope.bmi>=30 && $scope.bmi<35) {
      $scope.bmiClass = 6;
    }else if ($scope.bmi>=35 && $scope.bmi<40) {
      $scope.bmiClass = 7;
    }else if ($scope.bmi>=40) {
      $scope.bmiClass = 8;
    }
  };

  $scope.initScreen = function(){
    $scope.bmi = 0;
    $scope.bmiClass = 0;
    $scope.disableSave=true;
    $scope.useremail = $auth.user.email;
    $scope.input={
      mass: 0,
      height: 0
    };
    $scope.getLastFive();
  };

  $scope.saveResult = function(){
    var data = {
      bmi_info:{
        bmi: $scope.bmi,
        bmi_class: $scope.bmiClass
      }
    };
    $http.post(bmiApp.apiHost+"/save_info",data).then(function succesCallback(resp){
      if(!resp.data.error){
        $scope.getLastFive();
        $scope.disableSave = true;
      }
    }, function errorCallback(resp){

    })
  };

  $scope.getLastFive = function(){
    $http.get(bmiApp.apiHost+"/get_five").then(function succesCallback(resp){
      if(resp.data != null){
        $scope.lastFive = resp.data
      }
    }, function errorCallback(resp){

    });
  };

  $scope.signOutUser = function(){
    $auth.signOut().then(function successCallback(resp){
      $state.go("login");
    }, function errorCallback(err){

    })
  };
}]);
