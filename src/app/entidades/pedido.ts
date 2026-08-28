import { Comida } from "./comida";
import { Bebida } from "./bebida";

export class Pedido {
    id : number = 0;
    nombre : String = "";
    precio : number = 0;
    cantidad : number = 0;
    subtotal : number = 0;
    listaComida : Comida = new Comida;
    listaBebida : Bebida = new Bebida;
}
