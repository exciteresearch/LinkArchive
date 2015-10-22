angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaOauth, secretsFactory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // ./www/js/factories.js is in .gitignore because of secretsFactory.keys
  $scope.SLACK = secretsFactory.SLACK();
  $scope.AWS_COGNITO = secretsFactory.AWS_COGNITO();

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
    //   // REMEMBER TO REMOVE THE CLIENT ID AND SECRETS!!!
    //   // ***********************************************

    $scope.oauthResponse = 'no oauth request made yet';
    $scope.oathError = 'no oath errors yet'; 

    // $cordovaOauth.slack('SLACK.clientID', 'SLACK.clientSecret', [])
    $cordovaOauth.slack($scope.SLACK.clientID, $scope.SLACK.clientSecret, [])
    .then(function(results) {
        // results
        $scope.oathResponse = JSON.stringify(results);
        console.log($scope.oathResponse);
    }, function(error) {
        // error
        $scope.oauthError = error;
        console.log($scope.oauthError);
    });


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

  // awsCognito from aws-sdk
  $scope.awsCognito = function(){
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = $scope.AWS_COGNITO.region; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: $scope.AWS_COGNITO.IdentityPoolId,
    });

    console.log('AWS.config.region=',AWS.config.region,
      'AWS.config.credentials=',AWS.config.credentials);

    // Initialize the Cognito Sync client
    // AWS.config.credentials.get(function(){

    //    var syncClient = new AWS.CognitoSyncManager();

    //    syncClient.openOrCreateDataset('myDataset', function(err, dataset) {

    //       dataset.put('myKey', 'myValue', function(err, record){

    //          dataset.synchronize({

    //             onSuccess: function(data, newRecords) {
    //                   console.log('data=',data,
    //                         'newRecords=',newRecords);

    //             }

    //          });

    //       });
         
    //    });

    // });

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
