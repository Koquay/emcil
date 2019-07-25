import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { MessageService } from './message.service';
import { AlertService } from './alert/alert.service';
import { Alert } from './alert/alert'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private alert: Alert = null;
  private disableAlert = timer(15000);

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getAlert();
  }

  private getAlert() {
    this.alertService.alertSubject.subscribe(alert => {
      this.alert = alert;

      this.disableAlert.subscribe(() => {
        this.removeAlert();
      });
    })
  }

  private removeAlert() {
    this.alert = null;
  }

}
