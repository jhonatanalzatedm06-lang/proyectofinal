import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioBebidas } from '../servicios/servicio-bebida';
import { Bebida } from '../entidades/bebida';
import { ServicioPedido } from '../servicios/servicio-pedido';

@Component({
  selector: 'app-bebidas',
  imports: [CommonModule, FormsModule],
  templateUrl: './bebidas.html',
  styleUrl: './bebidas.css',
})
export class Bebidas implements OnInit {

  categorias: any[] = [];
  bebidas: Bebida[] = [];
  detalleBebida: Bebida = new Bebida();

  textoNombre: string = '';
  textoIngrediente: string = '';
  mensajeModal: String = ""

  tipoSeleccionado: string = '';
  categoriaSeleccionada: string = '';

  private preciosCache: Map<number, number> = new Map();

  constructor(private servicioBebida: ServicioBebidas, private servicioPedido: ServicioPedido, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.servicioBebida.getCategorias().subscribe(data => {
      this.categorias = data.drinks ? data.drinks.slice(0, 6).map((c: any) => ({
        strCategory: c.strCategory,
        strCategoryThumb: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1441552346.jpg'
      })) : [];
      this.cd.detectChanges();
    });
  }

  // MÉTODO OPTIMIZADO: Crea la bebida con los datos que ya vienen
  private crearBebidaBasica(datosApi: any): Bebida {
    const nuevaBebida = new Bebida();
    nuevaBebida.id = Number(datosApi.idDrink);
    nuevaBebida.nombre = datosApi.strDrink;
    nuevaBebida.imagen = datosApi.strDrinkThumb;
    nuevaBebida.categoria = datosApi.strCategory ? datosApi.strCategory : '';
    
    // Si la búsqueda trajo ingredientes (búsqueda avanzada), los procesamos
    // Si no (búsqueda por categoría), ponemos un texto base.
    nuevaBebida.ingredientes = datosApi.strIngredient1 ? this.extraerNombresIngredientes(datosApi) : ['Ver detalles para ingredientes...'];
    
    nuevaBebida.cantidad = 1;
    nuevaBebida.precio = this.calcularPrecio(nuevaBebida.id);
    return nuevaBebida;
  }

  private extraerNombresIngredientes(datosApi: any): string[] {
    const ingredientes: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const ing = datosApi['strIngredient' + i];
      if (ing && ing.trim() !== '') {
        ingredientes.push(ing.trim());
      }
    }
    return ingredientes;
  }

  private calcularPrecio(id: number): number {
    if (this.preciosCache.has(id)) {
      return this.preciosCache.get(id)!;
    }
    const nuevoPrecio = Math.floor(Math.random() * (50 - 15 + 1) + 15) * 1000;
    this.preciosCache.set(id, nuevoPrecio);
    return nuevoPrecio;
  }

  // MÉTODO CORREGIDO: Evita el bucle forEach de peticiones
  verBebidas(categoria: string) {
    this.textoNombre = '';
    this.textoIngrediente = '';
    this.tipoSeleccionado = '';

    this.servicioBebida.getBebidasPorCategoria(categoria).subscribe(data => {
      this.bebidas = data.drinks ? data.drinks.map((b: any) => this.crearBebidaBasica(b)) : [];
      this.cd.detectChanges();
    });
  }

  buscarNombre() {
    if (!this.textoNombre.trim()) {
      this.bebidas = [];
      return;
    }
    this.textoIngrediente = '';
    this.tipoSeleccionado = '';
    this.categoriaSeleccionada = '';

    // La búsqueda por nombre SÍ trae ingredientes, así que se mostrarán solos
    this.servicioBebida.buscarBebidaPorNombre(this.textoNombre).subscribe(data => {
      this.bebidas = data.drinks ? data.drinks.map((b: any) => this.crearBebidaBasica(b)) : [];
      this.cd.detectChanges();
    });
  }

  // MÉTODO CORREGIDO: Evita el bucle forEach de peticiones
  buscarIngrediente() {
    if (!this.textoIngrediente.trim()) {
      this.bebidas = [];
      return;
    }
    this.textoNombre = '';
    this.tipoSeleccionado = '';
    this.categoriaSeleccionada = '';

    this.servicioBebida.buscarBebidaPorIngrediente(this.textoIngrediente).subscribe(data => {
      this.bebidas = data.drinks ? data.drinks.map((b: any) => this.crearBebidaBasica(b)) : [];
      this.cd.detectChanges();
    });
  }

  verIngredientes(id: string) {
    this.servicioBebida.getDetalleBebida(id).subscribe(data => {
      this.detalleBebida = this.crearBebidaBasica(data.drinks[0]);
      this.cd.detectChanges();
    });
  }

  agregarBebida(bebida: Bebida) {
    const copia: Bebida = { ...bebida };
    this.servicioPedido.agregarBebida(copia);

    const modal = new (window as any).bootstrap.Modal(document.getElementById('myModal'));
    this.mensajeModal = bebida.nombre + " fue agregada correctamente al pedido (cant: " + bebida.cantidad + ")";
    modal.show();
  }

  // MÉTODO CORREGIDO: Evita el bucle forEach de peticiones
  filtrarPorTipo() {
    this.textoNombre = '';
    this.textoIngrediente = '';
    this.categoriaSeleccionada = '';

    if (!this.tipoSeleccionado) {
      this.bebidas = [];
      return;
    }

    this.servicioBebida.getBebidasPorTipo(this.tipoSeleccionado).subscribe(data => {
      this.bebidas = data.drinks ? data.drinks.map((b: any) => this.crearBebidaBasica(b)) : [];
      this.cd.detectChanges();
    });
  }

  filtrarPorCategoria() {
    this.tipoSeleccionado = '';
    if (!this.categoriaSeleccionada) {
      this.bebidas = [];
      return;
    }
    this.verBebidas(this.categoriaSeleccionada);
  }
}