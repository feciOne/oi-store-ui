import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/core/services/auth/authentication.service';
import { ProductSearchService } from 'src/app/modules/core/services/product-search/product-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly destroy$$ = new Subject<void>();
  authenticated = false;

  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl('')
  });

  constructor(private authenticationService: AuthenticationService,
              private productSearchService: ProductSearchService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authenticationService.token$.pipe(
      takeUntil(this.destroy$$)
    ).subscribe((token: string) => {
      this.authenticated = token.length > 0;
      console.log('AUTH?', this.authenticated);
    });

    this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(500),
      // distinctUntilChanged(),
      takeUntil(this.destroy$$)
    ).subscribe((term) => {
      console.log(term);
      this.productSearchService.updateSearchTerm(term);
    }
    );
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
