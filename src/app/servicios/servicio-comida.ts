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
    const categoriaSegura = encodeURIComponent(categoria);
    return this.http.get(this.apiUrl + 'filter.php?c=' + categoriaSegura);
  }

  getDetalleComida(id: string): Observable<any> {
    const idSeguro = encodeURIComponent(id);
    return this.http.get(this.apiUrl + 'lookup.php?i=' + idSeguro);
  }

  buscarComidaPorNombre(nombre: string): Observable<any> {
    const nombreSeguro = encodeURIComponent(nombre);
    return this.http.get(this.apiUrl + 'search.php?s=' + nombreSeguro);
  }

  buscarComidaPorIngrediente(ingrediente: string): Observable<any> {
    const ingredienteSeguro = encodeURIComponent(ingrediente);
    return this.http.get(this.apiUrl + 'filter.php?i=' + ingredienteSeguro);
  }
}