define(['angular'], function(angular) {
    var ngModule = angular.module('cockpit.plugin.case-instance-plugin', []);

    var CaseInteractionController = ["$scope", 'camAPI', "$http","Uri", function($scope, camAPI, $http,Uri) {

        $scope.closeCase = function() {
            $http.post(Uri.appUri("plugin://case-instance-plugin/:engine/caseInstanceControl/" + $scope.instance.id + "/close"))
                .success(function(data) {
                    console.log("closed");
                });
        };

        $scope.manualStart = function() {
            $http.post(Uri.appUri("plugin://case-instance-plugin/:engine/caseInstanceControl/" + $scope.instance.id + "/activate"))
                .success(function(data) {
                    console.log("started manually");
                });
        };

    }];

    var Configuration = ['ViewsProvider', function(ViewsProvider) {

        ViewsProvider.registerDefaultView('cockpit.caseInstance.tab', {
            id: 'cmmn-instance-control',
            label: 'CMMN Instance Conrol',
            url: 'plugin://case-instance-plugin/static/app/control.html',
            dashboardMenuLabel: 'CMMN Instance Conrol',
            controller: CaseInteractionController,


            // make sure we have a higher priority than the default plugin
            priority: 12
        });
    }];



    ngModule.config(Configuration);

    return ngModule;
});