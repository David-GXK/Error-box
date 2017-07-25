'use strict';

angular.module('my-app')
    .provider('alert', function () {
        var defaultOption = {
            // showTitle: true,
            title: '操作确认',
            type: 'confirm',//tip,operate,confirm
            theme: 'normal',//danger
            reverse: false,
            template: false,
            timer: false,
            oktext: '确定',
            canceltext: '取消',
            size: 'sm'
        };
        return {
            setDefaultOption: function (option) {
                defaultOption = angular.merge({}, defaultOption, option);
            },
            $get: function ($uibModal, $timeout,dialogModalConfig) {
                return function (option) {
                    var option = option || null;
                    var modalInstance = $uibModal.open(angular.extend({},dialogModalConfig,{//dialogModalConfig为自己建的一个防止点击弹框外部关闭弹框的配置
                        templateUrl: 'confirm.html',
                        animation: true,
                        controller: function ($scope) {
                            $scope.option = angular.merge({}, defaultOption, option);
                            if ($scope.option.timer) {
                                $timeout(function () {
                                    $scope.$close();
                                }, $scope.option.timer)
                            }
                        },
                        resolve: {

                        }
                    }));
                    return modalInstance.result
                }

            }
        }
    })
