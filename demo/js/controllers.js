angular.module('starter.controllers', []).controller('HomeCtrl', function ($scope, $state) {
  $scope.doRemoteSearch = function () {
    $state.go('search-demo-remote');
  };

  $scope.doLocalSearch = function () {
    $state.go('search-demo-local');
  };
}).controller('RemoteSearchCtrl', function ($scope, $ionicFilterBar) {
  var filterBarInstance;
  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      doSearch: function (filterText) {
        $scope.searchKey = filterText;
        // ajax请求实现
      }
    });
  };

  $scope.$on('$destroy', function () {
    if (filterBarInstance) {
      filterBarInstance();
      filterBarInstance = null;
    }
  });
}).controller('LocalSearchCtrl', function ($scope, $ionicFilterBar) {
  var filterBarInstance;

  function getItems () {
    var items = [];
    for (var x = 1; x < 100; x++) {
      items.push({title: 'This is item number ' + x + ' which is an ' + (x % 2 === 0 ? 'EVEN' : 'ODD') + ' number.'});
    }
    $scope.items = items;
  }

  getItems();

  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      localSearch: true,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

  $scope.$on('$destroy', function () {
    if (filterBarInstance) {
      filterBarInstance();
      filterBarInstance = null;
    }
  });
});
