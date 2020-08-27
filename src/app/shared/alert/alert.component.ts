import { Component, OnInit ,Input, Output} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
@Input() message :string
@Output() Cleared =new Subject<boolean>()
  constructor() { }

  ngOnInit(): void {
  }
  onConfirm()
  {
  this.Cleared.next(true)
  }
  onCancel()
  {
    this.Cleared.next(false)
  }
}
