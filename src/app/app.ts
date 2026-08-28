import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navegacion } from "./navegacion/navegacion";
import { Footer } from "./footer/footer";
import { Banner } from './banner/banner';
import { Informacion } from "./informacion/informacion";
import { Comidas } from './comidas/comidas';
import { Bebidas } from './bebidas/bebidas';
import { Juego } from './juego/juego';

import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navegacion, Footer, Banner, Informacion, Comidas, Bebidas, Juego],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyectoFinal');
  private router = inject(Router);
  esRutaInicio = true;
  
  constructor() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        this.esRutaInicio = event.urlAfterRedirects === '/' ;
      });
  }
}
