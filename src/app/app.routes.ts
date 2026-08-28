import { Routes } from '@angular/router';
import { Bebidas } from './bebidas/bebidas';
import { Comidas } from './comidas/comidas';
import { Juego } from './juego/juego';
import { Pedido } from './pedido/pedido';

export const routes: Routes = [
    { path: 'comidas', component: Comidas},
    { path: 'bebidas', component: Bebidas},
    { path: 'pedido', component: Pedido},
    { path: 'juego', component: Juego},
    { path: '**', redirectTo: '' }
];
