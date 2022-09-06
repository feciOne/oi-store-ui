import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
