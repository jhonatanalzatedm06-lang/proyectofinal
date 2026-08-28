import { Component } from '@angular/core';
import { Comidas } from '../comidas/comidas';
import { Bebidas } from '../bebidas/bebidas';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Juego } from '../juego/juego';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
