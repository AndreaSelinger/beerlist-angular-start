app.controller('mainController', function($scope, beerFactory) {
    $scope.beers = [];
    
    $scope.addBeer = function(newBeer) {
        
        beerFactory.addBeer(newBeer)
          .then(function(beer) {
            $scope.beers.push(beer);
          })
          .catch(function(error) {
            console.log(error)
          });
      }
    
      $scope.removeBeer = function(beer) {
        var beerId = beer._id
        beerFactory.removeBeer(beerId)
          .then(function(beer) {
            for (var i = 0; i < $scope.beers.length; i++) {
              if ($scope.beers[i]._id === beer._id) {
                $scope.beers.splice(i, 1);
                break;
              }
            }
         })
         .catch(function(error) {
            console.log(error)
         });
      }
    
      beerFactory.getBeers()
      .then(function(beers) {
        $scope.beers = beers;
      })
      .catch(function(error) {
        console.log(error)
      });
});



