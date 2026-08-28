import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 
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

  private crearComida(datosApi: any): Comida {
    const nuevaComida = new Comida();
    nuevaComida.id = Number(datosApi.idMeal);
    nuevaComida.nombre = datosApi.strMeal;
    nuevaComida.categoria = datosApi.strCategory ? datosApi.strCategory : '';
    nuevaComida.imagen = datosApi.strMealThumb;
    nuevaComida.ingredientes = this.extraerNombresIngredientes(datosApi);
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
      const comidasBasicas = data.meals;
      this.comidas = [];

      comidasBasicas.forEach((m: any) => {
        this.servicioComida.getDetalleComida(m.idMeal).subscribe(detalle => {
          const nuevaComida = this.crearComida(detalle.meals[0]);
          this.comidas.push(nuevaComida);
          this.cd.detectChanges();
        });
      });
    });
  }

  buscarNombre() {
    if (!this.textoNombre.trim()) {
      this.comidas = [];
      return;
    }
    this.textoIngrediente = '';

    this.servicioComida.buscarComidaPorNombre(this.textoNombre).subscribe(data => {
      this.comidas = data.meals ? data.meals.map((m: any) => this.crearComida(m)) : [];
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
      const comidas = data.meals;
      this.comidas = [];
      if (!comidas) return;

      comidas.forEach((m: any) => {
        this.servicioComida.getDetalleComida(m.idMeal).subscribe(detalle => {
          const nuevaComida = this.crearComida(detalle.meals[0]);
          this.comidas.push(nuevaComida);
          this.cd.detectChanges();
        });
      });
    });
  }

  verIngredientes(id: string) {
    this.servicioComida.getDetalleComida(id).subscribe(data => {
      this.detalleComida = this.crearComida(data.meals[0]);
      this.cd.detectChanges();
    });
  }

  agregarComida(comida: Comida) {
    // Hacemos una copia para que si luego cambias la cantidad en la tarjeta,
    // no se altere lo que ya quedó guardado en el pedido
    const copia: Comida = { ...comida };
    this.servicioPedido.agregarComida(copia);

    const modal = new (window as any).bootstrap.Modal(document.getElementById('myModal'));
    this.mensajeModal = comida.nombre + " fue agregada correctamente al pedido (cant: " + comida.cantidad + ")";
    modal.show();
  }
}
