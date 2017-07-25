'use strict';

angular.module('my-app')
    .provider('alert', function () {
        var defaultOption = {
            // showTitle: true,
            title: '����ȷ��',
            type: 'confirm',//tip,operate,confirm
            theme: 'normal',//danger
            reverse: false,
            template: false,
            timer: false,
            oktext: 'ȷ��',
            canceltext: 'ȡ��',
            size: 'sm'
        };
        return {
            setDefaultOption: function (option) {
                defaultOption = angular.merge({}, defaultOption, option);
            },
            $get: function ($uibModal, $timeout,dialogModalConfig) {
                return function (option) {
                    var option = option || null;
                    var modalInstance = $uibModal.open(angular.extend({},dialogModalConfig,{//dialogModalConfigΪ�Լ�����һ����ֹ��������ⲿ�رյ��������
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
