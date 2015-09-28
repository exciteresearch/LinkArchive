angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
  $scope.values = [ { greeting:'Hello!',
                    appearance: 'slides blue' },
                    { greeting: 'Bonjour!',
                    appearance: 'slides red' },
                    { greeting: 'Hi!',
                    appearance: 'slides yellow' } ];

  $scope.cardDestroyed = function(index) {
    // $scope.values.splice(index, 1);
  };

  $scope.cardSwiped = function(index) {
    // var newCard = { greeting: 'Ohayo!', appearance: 'slides purple' };// new card data
    // $scope.values.push(newCard);
  };
  $scope.onSwipeRight = function (index) {
    // $scope.values.splice(index, 1);
    // $ionicSlideBoxDelegate.update();
    // $ionicSlideBoxDelegate.slide(index);
    // $scope.values.push({ greeting: 'Swipe right works!', 
    //                      appearance: 'slides purple' });
  };
});
