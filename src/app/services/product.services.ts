import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private dataUrl = 'assets/data.json';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.dataUrl);
    }

    getProductById(id: number): Observable<Product | undefined> {
  return this.getProducts().pipe(
    map(list => list.find(p => p.id === id))
  );
}
}