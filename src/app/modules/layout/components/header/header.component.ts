import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/core/services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly destroy$$ = new Subject<void>();
  authenticated = false;

  constructor(private authenticationService: AuthenticationService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authenticationService.token$.pipe(
      takeUntil(this.destroy$$)
    ).subscribe((token: string) => {
      this.authenticated = token.length > 0;
      console.log('AUTH?', this.authenticated);
    });
  }

  doLogout(): void {
    this.authenticationService.logout();
    this.authenticated = false;
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
      this.destroy$$.next();
      this.destroy$$.complete();
  }
}
