import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-informacion',
  imports: [CommonModule],
  templateUrl: './informacion.html',
  styleUrl: './informacion.css',
})
export class Informacion {

  nombrePlatoEstrella: string = "Gingerbread Waffles";
  imagenPlatoEstrella: string = "https://www.themealdb.com/images/media/meals/0wmns51784837949.jpg";
  descripcionPlatoEstrella: string = 'Esponjosos waffles horneados con especias de jengibre y canela, bañados en un dulce almíbar dorado. La combinación perfecta entre el calor de las especias orientales y la dulzura de una mañana especial.';

  nombreBebidaEstrella: string = "Old Fashioned";
  imagenBebidaEstrella: string = "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg";
  descripcionBebidaEstrella: string = 'Clásico cóctel de bourbon con un toque de angostura y azúcar, adornado con cáscara de naranja y cereza confitada. El equilibrio perfecto entre la elegancia occidental y el espíritu culinario de Manila.';
}