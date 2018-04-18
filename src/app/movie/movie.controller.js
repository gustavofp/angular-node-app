export default class MovieCtrl {


    constructor($scope, MovieService) {
        this.$scope = $scope;
        this.service = MovieService
    }

}

MovieCtrl.$inject = ['$scope', 'MovieService']