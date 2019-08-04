import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';
import { MessageService } from './message.service';
import { AlertService } from './alert/alert.service';
import { Alert } from './alert/alert'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private alert: Alert = null;
  private disableAlert = timer(15000);
  private messageClick: HTMLElement;
  @ViewChild('openMessage', { static: true }) openMessage: ElementRef<HTMLElement>;

  constructor(
    private alertService: AlertService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    const error = { error: 'You have no items in your shopping cart yet.', status: 500 };
    this.messageService.sendErrorMessage(new HttpErrorResponse(error));

    this.getAlert();
  }

  private getAlert() {
    this.alertService.alertSubject.subscribe(alert => {
      this.alert = alert;
      
      let el: HTMLElement = this.openMessage.nativeElement;
      el.click();

      // this.disableAlert.subscribe(() => {
      //   this.removeAlert();
      // });
    })
  }

  private removeAlert() {
    this.alert = null;
  }

}
