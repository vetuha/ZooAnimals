module FitsMe.Common {
    "use strict";

    export interface INotificationService {
        ShowNotification(message: string, type: string, delay?: number):void;
    }

    export class NotificationService implements INotificationService{

        constructor() { }
        
        public ShowNotification(message: string, type: string, delay?:number):void {
            var self = this;
            var flashDiv:any = $('#notification');

            if (!flashDiv.length) {
                flashDiv = $("<div id='notification' class='notifications top-right'></div>");
                $("body").append(flashDiv);
            }

            flashDiv.notify({
                message: { html: message },
                type: self.getType(type),
                fadeOut: { enabled: true, delay: (delay || 5000) }
            }).show();
        }

        private getType(className):string {
            var type;
            switch (className) {
                case 'info':
                    type = 'info';
                    break;
                case 'warning':
                    type = 'warning';
                    break;
                case 'error':
                    type = 'danger';
                    break;
                case 'message':
                    type = 'success';
                    break;
                default:
                    type = 'info';
                    break;
            }
            return type;
        }
    }

    angular
        .module('FitsMe.Common')
        .service('FitsMe.Common.NotificationService', NotificationService);
}