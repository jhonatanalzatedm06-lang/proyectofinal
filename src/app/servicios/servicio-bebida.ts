import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServicioBebidas {

    private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

    constructor(private http: HttpClient) { }

    getCategorias(): Observable<any> {
        return this.http.get(this.apiUrl + 'list.php?c=list');
    }

    getBebidasPorCategoria(categoria: string): Observable<any> {
        return this.http.get(this.apiUrl + 'filter.php?c=' + categoria);
    }

    getDetalleBebida(id: string): Observable<any> {
        return this.http.get(this.apiUrl + 'lookup.php?i=' + id);
    }

    buscarBebidaPorNombre(nombre: string): Observable<any> {
        return this.http.get(this.apiUrl + 'search.php?s=' + nombre);
    }

    buscarBebidaPorIngrediente(ingrediente: string): Observable<any> {
        return this.http.get(this.apiUrl + 'filter.php?i=' + ingrediente);
    }

    getBebidasPorTipo(tipo: string): Observable<any> {
        return this.http.get(this.apiUrl + 'filter.php?a=' + tipo);
    }
}