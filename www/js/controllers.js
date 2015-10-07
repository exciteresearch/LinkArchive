angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaOauth) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // oauth opens in InAppBrowser
  $scope.oauth = function(){

    // $cordovaOauth.github(string clientId, string clientSecret, array appScope);
    $scope.oauthResponse = 'no oauth request made yet';
    $scope.oathError = 'no oath errors yet'; 
    $cordovaOauth.github('1cb7b8d7bce9299eec38', '8df36b23b717ed6c51493423a8a6998031096b0a', [])
    .then(function(results) {
        // results
        $scope.oathResponse = JSON.stringify(results);
        console.log($scope.oathResponse);
    }, function(error) {
        // error
        $scope.oauthError = error;
        console.log($scope.oauthError);
    });

    // $scope.slackResponse = 'no request made yet';
    // $scope.slackError = 'no errors yet';
    // $scope.authorize = function () {

    //   // REMEMBER TO REMOVE THE CLIENT ID AND SECRETS!!!
    //   // ***********************************************

    //   // $cordovaOauth.slack('','',[])
    //   // $cordovaOauth.github('GITHUB.clientID','GITHUB.clientSecret',[])

    //   $cordovaOauth.slack('SLACK.clientID', 'SLACK.clientSecret', ['read'], null)
    //   .then(function (result) {
    //       $scope.slackResponse = JSON.stringify(result);
    //   },
    //   function (error) {
    //       $scope.slackError = error;
    //   });
    // };


    // var options = {
    //   location: 'no',
    //   clearcache: 'yes',
    //   toolbar: 'no'
    // };
    
    // $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
      
    //   .then(function(event) {
    //     // success
    //   })
      
    //   .catch(function(event) {
    //     // error
    //   });


    //$cordovaInAppBrowser.close();

  };


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
