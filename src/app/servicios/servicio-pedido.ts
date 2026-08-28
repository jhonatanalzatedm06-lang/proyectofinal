import { Injectable } from '@angular/core';
import { Comida } from '../entidades/comida';
import { Bebida } from '../entidades/bebida';

@Injectable({
    providedIn: 'root'
})
export class ServicioPedido {

    listaComidas: Comida[] = [];
    listaBebidas: Bebida[] = [];

    nombreComprador: string = '';
    telefonoComprador: string = '';
    direccionComprador: string = '';

    agregarComida(comida: Comida) {
        this.listaComidas.push(comida);
    }

    agregarBebida(bebida: Bebida) {
        this.listaBebidas.push(bebida);
    }

    eliminarComida(indice: number) {
        this.listaComidas.splice(indice, 1);
    }

    eliminarBebida(indice: number) {
        this.listaBebidas.splice(indice, 1);
    }

    calcularSubtotal(item: any): number {
        return item.precio * item.cantidad;
    }

    calcularTotal(): number {
        let total = 0;
        this.listaComidas.forEach(c => total += this.calcularSubtotal(c));
        this.listaBebidas.forEach(b => total += this.calcularSubtotal(b));
        return total;
    }

    vaciarPedido() {
        this.listaComidas = [];
        this.listaBebidas = [];
    }
}
