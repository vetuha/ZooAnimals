class HttpInterceptor {
    constructor() {
        ['request', 'requestError', 'response', 'responseError']
            .forEach((method) => {
                if (this[method]) {
                    this[method] = this[method].bind(this);
                }
            });
    }
}

class ApiCallInterceptor extends HttpInterceptor
    implements ng.IHttpInterceptor {

    static factory($q: ng.IQService, $injector: angular.auto.IInjectorService): ApiCallInterceptor {
        return new ApiCallInterceptor($q, $injector);
    }

    public static $inject = ['$q', '$injector'];

    constructor(private $q: ng.IQService, $injector: angular.auto.IInjectorService) {
        super();
    }


    public ShowNotification(message: string, type: string): void {        

    }

    request(config: ng.IRequestConfig): ng.IRequestConfig {
        return config;
    };

    response<T>(response: ng.IHttpPromiseCallbackArg<T>): ng.IPromise<T> {
        return this.$q.when(response);
    };

    responseError<T>(error: ng.IHttpPromiseCallbackArg<T>): ng.IPromise<T> {
        this.ShowNotification('An error occurred with status code ' + error.status + " (" + error.statusText + "), while requesting to " + error.config.url, "error");
        return this.$q.reject(error);
    };
}

let httpConfig = ($httpProvider: ng.IHttpProvider) => {
    $httpProvider.interceptors.push(ApiCallInterceptor.factory);
};

angular.module('FitsMe.Common').config(httpConfig);