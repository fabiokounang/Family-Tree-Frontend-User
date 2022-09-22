import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.css']
})
export class CalendarEventComponent implements OnInit {
  events: any[] = [];
  constructor (@Inject(MAT_DIALOG_DATA) private data: any, private apiService: ApiService, private dialogRef: MatDialogRef<any>) {}


  ngOnInit(): void {
    this.events = this.data;
  }

}
