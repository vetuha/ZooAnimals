var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HttpInterceptor = (function () {
    function HttpInterceptor() {
        var _this = this;
        ['request', 'requestError', 'response', 'responseError']
            .forEach(function (method) {
            if (_this[method]) {
                _this[method] = _this[method].bind(_this);
            }
        });
    }
    return HttpInterceptor;
}());
var ApiCallInterceptor = (function (_super) {
    __extends(ApiCallInterceptor, _super);
    function ApiCallInterceptor($q, $injector) {
        _super.call(this);
        this.$q = $q;
    }
    ApiCallInterceptor.factory = function ($q, $injector) {
        return new ApiCallInterceptor($q, $injector);
    };
    ApiCallInterceptor.prototype.ShowNotification = function (message, type) {
    };
    ApiCallInterceptor.prototype.request = function (config) {
        return config;
    };
    ;
    ApiCallInterceptor.prototype.response = function (response) {
        return this.$q.when(response);
    };
    ;
    ApiCallInterceptor.prototype.responseError = function (error) {
        this.ShowNotification('An error occurred with status code ' + error.status + " (" + error.statusText + "), while requesting to " + error.config.url, "error");
        return this.$q.reject(error);
    };
    ;
    ApiCallInterceptor.$inject = ['$q', '$injector'];
    return ApiCallInterceptor;
}(HttpInterceptor));
var httpConfig = function ($httpProvider) {
    $httpProvider.interceptors.push(ApiCallInterceptor.factory);
};
angular.module('FitsMe').config(httpConfig);
//# sourceMappingURL=Interceptor.js.map