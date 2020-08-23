import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  private baseUrl = 'https://murmuring-beach-44839.herokuapp.com/api/products';

  private categoryUrl = 'https://murmuring-beach-44839.herokuapp.com/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProducts> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin' + ':' + 'gsRkWYKNkQSZ6huw') });

    const searchUrl =  `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl, {headers});
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl =  `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl =  `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(page: number, pageSize: number, theKeyword: string): Observable<GetResponseProducts> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin' + ':' + 'gsRkWYKNkQSZ6huw') });

    const searchUrl =  `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl, {headers});
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin' + ':' + 'gsRkWYKNkQSZ6huw') });

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl, {headers}).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(productId: number): Observable<Product> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin' + ':' + 'gsRkWYKNkQSZ6huw') });
    
    // build URL based on product ID
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl, {headers});
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin' + ':' + 'gsRkWYKNkQSZ6huw') });

    return this.httpClient.get<GetResponseProducts>(searchUrl, {headers}).pipe(map(response => response._embedded.products));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
} 

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}















