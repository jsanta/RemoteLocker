angular.module('app.controllers', [])
  
.controller('remoteLockFromHellCtrl', function($scope, $window, $http, $ionicPopup, $ionicLoading) {
    var rlCtrl = this;
    
    var generated = false;
    var generateCode = function () {
        var code, alpha = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
        code = alpha.map(function(){ return alpha[Math.floor(Math.random()*(alpha.length-1))]; });
        code = code.splice(0, 6);
        generated = true;
        
        return code.join('');
    }
    
    rlCtrl.code = $window.localStorage.getItem('lockCode');
    rlCtrl.code = (!!!rlCtrl.code)?generateCode():rlCtrl.code;
    
    if(generated){
        $window.localStorage.setItem('lockCode', rlCtrl.code);
    }
    
    rlCtrl.ip = $window.localStorage.getItem('lockIP');
    rlCtrl.ip = (!!!rlCtrl.ip)?undefined:rlCtrl.ip;
    
    var hideLoading = function(){
        $ionicLoading.hide();
    }
    
    rlCtrl.lock = function () {
        console.log('Doing remote lock!');
        var storedIp = $window.localStorage.getItem('lockIP');
        if(rlCtrl.ip !== storedIp){
            $window.localStorage.setItem('lockIP', rlCtrl.ip);
        }
        
        $ionicLoading.show({
          template: 'Please wait...'
        });      
        
        $http({
            method: 'POST',
            url: 'http://' + rlCtrl.ip + ':8666/lock', 
            data: { lockCode: rlCtrl.code }
        })
        .then(function (res) {  
                hideLoading();
                $ionicPopup.alert({
                    template: '<h2 class="text-center">' + res.data.lockMsg + '</h2>',
                    okType: 'button-assertive'
                });
            }, 
             function (error) {
                console.error(error);
                hideLoading();
            });
    }
})
 