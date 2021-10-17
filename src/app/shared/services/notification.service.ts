import { Injectable } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) { }
  showNotification(type: string, message: string, notificationId?: string) {
    if (notificationId) {
      this.notifier.notify(type, message, notificationId);  
    } else {
      this.notifier.notify(type, message);
    }
  }

  hideNotification(type: string, notificationId?: string) {
    if (notificationId) {
      this.notifier.hide(notificationId);  
    } else if (type === 'newest') {
      this.notifier.hideNewest();
    } else if (type === 'oldest') {
      this.notifier.hideOldest();
    } else {
      this.notifier.hideAll();
    }
  }

  // showModalLoadingSpinner() {
  //   this.spinner.show();
  // }

  // hideModalLoadingSpinner() {
  //   this.spinner.hide();
  // }
}
