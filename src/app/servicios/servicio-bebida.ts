import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioBebidas {
  // Cambio a la URL de TheCocktailDB
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) {}

  // Todas las categorías (TheCocktailDB usa list.php para categorías en vez de categories.php)
  getCategorias(): Observable<any> {
    return this.http.get(this.apiUrl + 'list.php?c=list');
  }

  // Bebidas por categoría
  getBebidasPorCategoria(categoria: string): Observable<any> {
    return this.http.get(this.apiUrl + 'filter.php?c=' + categoria);
  }

  // Detalle de una bebida por ID
  getDetalleBebida(id: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lookup.php?i=' + id);
  }

  // Buscar por nombre del cóctel/bebida
  buscarBebidaPorNombre(nombre: string): Observable<any> {
    return this.http.get(this.apiUrl + 'search.php?s=' + nombre);
  }

  // Buscar por ingrediente principal
  buscarBebidaPorIngrediente(ingrediente: string): Observable<any> {
    return this.http.get(this.apiUrl + 'filter.php?i=' + ingrediente);
  }

  getBebidasPorTipo(tipo: string): Observable<any> {
  return this.http.get(this.apiUrl + 'filter.php?a=' + tipo);
}
}