import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioComidas } from '../servicios/servicio-comida';
import { Comida } from '../entidades/comida';
import { ServicioPedido } from '../servicios/servicio-pedido';

@Component({
  selector: 'app-comidas',
  imports: [CommonModule, FormsModule],
  templateUrl: './comidas.html',
  styleUrl: './comidas.css',
})
export class Comidas implements OnInit {

  categorias: any[] = [];
  comidas: Comida[] = [];
  detalleComida: Comida = new Comida();

  mensajeModal: String = "";
  textoNombre: string = '';
  textoIngrediente: string = '';

  private preciosCache: Map<number, number> = new Map();

  constructor(private servicioComida: ServicioComidas, private servicioPedido: ServicioPedido, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.servicioComida.getCategorias().subscribe(data => {
      this.categorias = data.categories ? data.categories.slice(0, 6) : [];
      this.cd.detectChanges();
    });
  }

  // MÉTODO OPTIMIZADO: Evita saturar la API con un bucle de 50 peticiones
  private crearComidaBasica(datosApi: any): Comida {
    const nuevaComida = new Comida();
    nuevaComida.id = Number(datosApi.idMeal);
    nuevaComida.nombre = datosApi.strMeal;
    nuevaComida.categoria = datosApi.strCategory ? datosApi.strCategory : '';
    nuevaComida.imagen = datosApi.strMealThumb;
    
    // Si la API trae ingredientes directamente, los extraemos. Si no, ponemos un texto base
    nuevaComida.ingredientes = datosApi.strIngredient1 ? this.extraerNombresIngredientes(datosApi) : ['Ver detalles para ingredientes...'];
    
    nuevaComida.cantidad = 1;
    nuevaComida.precio = this.calcularPrecio(nuevaComida.id);
    return nuevaComida;
  }

  private extraerNombresIngredientes(datosApi: any): string[] {
    const ingredientes: string[] = [];
    for (let i = 1; i <= 20; i++) {
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

  verComidas(categoria: string) {
    this.textoNombre = '';
    this.textoIngrediente = '';

    this.servicioComida.getComidasPorCategoria(categoria).subscribe(data => {
      this.comidas = data.meals ? data.meals.map((m: any) => this.crearComidaBasica(m)) : [];
      this.cd.detectChanges();
    });
  }

  buscarNombre() {
    if (!this.textoNombre.trim()) {
      this.comidas = [];
      return;
    }
    this.textoIngrediente = '';

    this.servicioComida.buscarComidaPorNombre(this.textoNombre).subscribe(data => {
      this.comidas = data.meals ? data.meals.map((m: any) => this.crearComidaBasica(m)) : [];
      this.cd.detectChanges();
    });
  }

  buscarIngrediente() {
    if (!this.textoIngrediente.trim()) {
      this.comidas = [];
      return;
    }
    this.textoNombre = '';

    this.servicioComida.buscarComidaPorIngrediente(this.textoIngrediente).subscribe(data => {
      this.comidas = data.meals ? data.meals.map((m: any) => this.crearComidaBasica(m)) : [];
      this.cd.detectChanges();
    });
  }

  verIngredientes(id: string) {
    this.servicioComida.getDetalleComida(id).subscribe(data => {
      this.detalleComida = this.crearComidaBasica(data.meals[0]);
      this.cd.detectChanges();
    });
  }

  agregarComida(comida: Comida) {
    const copia: Comida = { ...comida };
    this.servicioPedido.agregarComida(copia);

    const modal = new (window as any).bootstrap.Modal(document.getElementById('myModal'));
    this.mensajeModal = comida.nombre + " fue agregada correctamente al pedido (cant: " + comida.cantidad + ")";
    modal.show();
  }
}