import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-error-display',
  templateUrl: './common-error-display.component.html',
  styleUrls: ['./common-error-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonErrorDisplayComponent implements OnInit {
  @Input() error: any;
  @Input() showError!: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
