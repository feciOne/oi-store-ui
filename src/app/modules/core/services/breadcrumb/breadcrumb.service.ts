import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';

export interface MenuItem {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  static ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';
  private menuItems$$ = new BehaviorSubject<MenuItem[]>([]);
  menuItems$!: Observable<MenuItem[]>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.menuItems$ = this.menuItems$$.asObservable();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuItems$$.next(this.createBreadcrumbs(this.route.root));
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbService.ROUTE_DATA_BREADCRUMB];
      console.log(label);

      if (label) {
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return [];
  }
}
