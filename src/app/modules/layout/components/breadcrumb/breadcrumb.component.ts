import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbService, MenuItem } from 'src/app/modules/core/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.breadcrumbService.menuItems$.subscribe(items => {
      this.menuItems = items;

      this.cdRef.detectChanges();
    });
  }
}
