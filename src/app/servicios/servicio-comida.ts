import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioComidas {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(this.apiUrl + 'categories.php');
  }

  getComidasPorCategoria(categoria: string): Observable<any> {
    return this.http.get(this.apiUrl + 'filter.php?c=' + categoria);
  }

  getDetalleComida(id: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lookup.php?i=' + id);
  }

  buscarComidaPorNombre(nombre: string): Observable<any> {
    return this.http.get(this.apiUrl + 'search.php?s=' + nombre);
  }

  buscarComidaPorIngrediente(ingrediente: string): Observable<any> {
    return this.http.get(this.apiUrl + 'filter.php?i=' + ingrediente);
  }
}
