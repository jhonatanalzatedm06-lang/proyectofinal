import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioBebidas } from '../servicios/servicio-bebida';
import { Bebida } from '../entidades/bebida'; // Asegúrate de tener esta clase
import { ServicioPedido } from '../servicios/servicio-pedido';

@Component({
  selector: 'app-bebidas',
  imports: [CommonModule, FormsModule],
  templateUrl: './bebidas.html',
  styleUrl: './bebidas.css', // O el archivo CSS que uses
})
export class Bebidas implements OnInit {

  categorias: any[] = [];
  bebidas: Bebida[] = [];              
  detalleBebida: Bebida = new Bebida(); 

  textoNombre: string = '';
  textoIngrediente: string = '';

  tipoSeleccionado: string = '';        // 🔹 NUEVO: para el select "Tipo de Bebida"
  categoriaSeleccionada: string = '';

  private preciosCache: Map<number, number> = new Map();

  constructor(private servicioBebida: ServicioBebidas, private servicioPedido: ServicioPedido, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.servicioBebida.getCategorias().subscribe(data => {
      // TheCocktailDB no trae imágenes de categoría, mapeamos una por defecto
      this.categorias = data.drinks ? data.drinks.slice(0, 6).map((c: any) => ({
        strCategory: c.strCategory,
        strCategoryThumb: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1441552346.jpg' // Imagen genérica de cóctel
      })) : [];
      this.cd.detectChanges();
    });
  }

  private crearBebida(datosApi: any): Bebida {
    const nuevaBebida = new Bebida();
    nuevaBebida.id = Number(datosApi.idDrink); // Cambió idMeal por idDrink
    nuevaBebida.nombre = datosApi.strDrink;    // Cambió strMeal por strDrink
    nuevaBebida.categoria = datosApi.strCategory ? datosApi.strCategory : '';
    nuevaBebida.imagen = datosApi.strDrinkThumb; // Cambió strMealThumb por strDrinkThumb
    nuevaBebida.ingredientes = this.extraerNombresIngredientes(datosApi);
    nuevaBebida.cantidad = 1;
    nuevaBebida.precio = this.calcularPrecio(nuevaBebida.id);
    return nuevaBebida;
  }

  private extraerNombresIngredientes(datosApi: any): string[] {
    const ingredientes: string[] = [];
    for (let i = 1; i <= 15; i++) { // TheCocktailDB tiene hasta 15 ingredientes
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

  verBebidas(categoria: string) {
    this.textoNombre = '';
    this.textoIngrediente = '';
    this.tipoSeleccionado = ''; 

    this.servicioBebida.getBebidasPorCategoria(categoria).subscribe(data => {
      const bebidasBasicas = data.drinks; // Cambió meals por drinks
      this.bebidas = [];

      if (!bebidasBasicas) return;

      bebidasBasicas.forEach((b: any) => {
        this.servicioBebida.getDetalleBebida(b.idDrink).subscribe(detalle => {
          const nuevaBebida = this.crearBebida(detalle.drinks[0]);
          this.bebidas.push(nuevaBebida);
          this.cd.detectChanges();
        });
      });
    });
  }

  buscarNombre() {
    if (!this.textoNombre.trim()) {
      this.bebidas = [];
      return;
    }
    this.textoIngrediente = '';
    this.tipoSeleccionado = '';        // 👈 nuevo
  this.categoriaSeleccionada = '';  

    this.servicioBebida.buscarBebidaPorNombre(this.textoNombre).subscribe(data => {
      this.bebidas = data.drinks ? data.drinks.map((b: any) => this.crearBebida(b)) : [];
      this.cd.detectChanges();
    });
  }

  buscarIngrediente() {
    if (!this.textoIngrediente.trim()) {
      this.bebidas = [];
      return;
    }
    this.textoNombre = '';
    this.tipoSeleccionado = '';        // 👈 nuevo
  this.categoriaSeleccionada = '';  

    this.servicioBebida.buscarBebidaPorIngrediente(this.textoIngrediente).subscribe(data => {
      const bebidasData = data.drinks;
      this.bebidas = [];
      if (!bebidasData) return;

      bebidasData.forEach((b: any) => {
        this.servicioBebida.getDetalleBebida(b.idDrink).subscribe(detalle => {
          const nuevaBebida = this.crearBebida(detalle.drinks[0]);
          this.bebidas.push(nuevaBebida);
          this.cd.detectChanges();
        });
      });
    });
  }

  verIngredientes(id: string) {
    this.servicioBebida.getDetalleBebida(id).subscribe(data => {
      this.detalleBebida = this.crearBebida(data.drinks[0]);
      this.cd.detectChanges();
    });
  }

    agregarBebida(bebida: Bebida) {
    const copia: Bebida = { ...bebida };
    this.servicioPedido.agregarBebida(copia);
    alert(bebida.nombre + ' fue agregada al pedido');
  }

  filtrarPorTipo() {
    this.textoNombre = '';
    this.textoIngrediente = '';
    this.categoriaSeleccionada = ''; // limpiamos el otro filtro para no confundir

    if (!this.tipoSeleccionado) {
      this.bebidas = [];
      return;
    }

    this.servicioBebida.getBebidasPorTipo(this.tipoSeleccionado).subscribe(data => {
      const bebidasBasicas = data.drinks;
      this.bebidas = [];
      if (!bebidasBasicas) return;

      bebidasBasicas.forEach((b: any) => {
        this.servicioBebida.getDetalleBebida(b.idDrink).subscribe(detalle => {
          const nuevaBebida = this.crearBebida(detalle.drinks[0]);
          this.bebidas.push(nuevaBebida);
          this.cd.detectChanges();
        });
      });
    });
  }

  filtrarPorCategoria() {
    this.tipoSeleccionado = ''; // limpiamos el otro filtro

    if (!this.categoriaSeleccionada) {
      this.bebidas = [];
      return;
    }

    this.verBebidas(this.categoriaSeleccionada); // reutilizamos el método que ya tenías
  }
}

