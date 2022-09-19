import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { Observable } from 'rxjs';
import { ProductListItem } from '../core/models/product.model';
import { ProductService } from '../home/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // productDetail$!: Observable<ProductListItem>;

  productDetails!: ProductListItem;
  serverUrl = environment.server.url;

  constructor(
    @Optional() private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* const id = this.route.snapshot.paramMap.get('id');
    this.productDetail$ = this.productService.getProduct(id ? +id : 0); */

    this.route.data.subscribe(({ productDetails }) => this.productDetails = productDetails);

    // Store like solution: Use selector or observables to get data which is already written
    // this.productDetails = this.productService.currentProductDetail ? this.productService.currentProductDetail : {} as ProductListItem;
  }
}
