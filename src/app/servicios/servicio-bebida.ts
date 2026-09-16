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
        // Codificamos el texto para que la barra '/' y los espacios no rompan la URL
        const categoriaSegura = encodeURIComponent(categoria);
        return this.http.get(this.apiUrl + 'filter.php?c=' + categoriaSegura);
    }

    getDetalleBebida(id: string): Observable<any> {
        const idSeguro = encodeURIComponent(id);
        return this.http.get(this.apiUrl + 'lookup.php?i=' + idSeguro);
    }

    buscarBebidaPorNombre(nombre: string): Observable<any> {
        const nombreSeguro = encodeURIComponent(nombre);
        return this.http.get(this.apiUrl + 'search.php?s=' + nombreSeguro);
    }

    buscarBebidaPorIngrediente(ingrediente: string): Observable<any> {
        const ingredienteSeguro = encodeURIComponent(ingrediente);
        return this.http.get(this.apiUrl + 'filter.php?i=' + ingredienteSeguro);
    }

    getBebidasPorTipo(tipo: string): Observable<any> {
        const tipoSeguro = encodeURIComponent(tipo);
        return this.http.get(this.apiUrl + 'filter.php?a=' + tipoSeguro);
    }
}