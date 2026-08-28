import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioPedido } from '../servicios/servicio-pedido';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pedido',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css',
})
export class Pedido implements OnInit {

  logoImagen: HTMLImageElement = new Image();
  mensajeModal: String = "";

  constructor(public servicioPedido: ServicioPedido) { }

  ngOnInit(): void {
    this.logoImagen.src = 'imagenes/logoManila.png';
  }

  eliminarComida(indice: number) {
    this.servicioPedido.eliminarComida(indice);
  }

  eliminarBebida(indice: number) {
    this.servicioPedido.eliminarBebida(indice);
  }

  calcularSubtotal(item: any): number {
    return this.servicioPedido.calcularSubtotal(item);
  }

  calcularTotal(): number {
    return this.servicioPedido.calcularTotal();
  }

  confirmarPedido() {
    if (!this.servicioPedido.nombreComprador || !this.servicioPedido.telefonoComprador || !this.servicioPedido.direccionComprador) {
      const modal = new (window as any).bootstrap.Modal(document.getElementById('myModal'));
      this.mensajeModal = "¡¡¡ Por favor completa tus datos personales antes de confirmar el pedido !!!";
      modal.show();
      return;
    }
    if (this.servicioPedido.listaComidas.length === 0 && this.servicioPedido.listaBebidas.length === 0) {
      const modal = new (window as any).bootstrap.Modal(document.getElementById('myModal'));
      this.mensajeModal = "¡¡¡ El pedido de esta persona ya fue despachado, vuelve a hacer otro !!!";
      modal.show();
      return;
    }
    this.generarFacturaPDF();
    const modal = new (window as any).bootstrap.Modal(document.getElementById('myModal'));
    this.mensajeModal = "¡¡¡ Pedido confirmado, muchas Gracias " + this.servicioPedido.nombreComprador + " por comprar en Manila !!!";
    modal.show();
    this.servicioPedido.vaciarPedido();

  }

  private generarFacturaPDF() {
    const doc = new jsPDF();

    doc.addImage(this.logoImagen, 'PNG', 15, 10, 25, 25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('MANILA', 105, 22, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('Factura de Compra', 105, 29, { align: 'center' });

    doc.setDrawColor(160, 130, 49); // color dorado
    doc.setLineWidth(0.5);
    doc.line(15, 40, 195, 40);

    const ahora = new Date();
    doc.setFontSize(10);
    doc.text('Fecha: ' + ahora.toLocaleDateString(), 15, 48);
    doc.text('Hora: ' + ahora.toLocaleTimeString(), 15, 54);

    // Datos del comprador
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Datos del comprador', 15, 65);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Nombre: ' + this.servicioPedido.nombreComprador, 15, 72);
    doc.text('Teléfono: ' + this.servicioPedido.telefonoComprador, 15, 78);
    doc.text('Dirección: ' + this.servicioPedido.direccionComprador, 15, 84);

    doc.line(15, 90, 195, 90);

    let y = 98;
    doc.setFont('helvetica', 'bold');
    doc.text('Producto', 15, y);
    doc.text('Cant.', 130, y);
    doc.text('Subtotal', 165, y);
    doc.setFont('helvetica', 'normal');
    y += 7;

    this.servicioPedido.listaComidas.forEach(c => {
      doc.text(String(c.nombre), 15, y);
      doc.text(String(c.cantidad), 132, y);
      doc.text('$ ' + this.calcularSubtotal(c).toLocaleString('en-US'), 165, y);
      y += 7;
    });

    this.servicioPedido.listaBebidas.forEach(b => {
      doc.text(String(b.nombre), 15, y);
      doc.text(String(b.cantidad), 132, y);
      doc.text('$ ' + this.calcularSubtotal(b).toLocaleString('en-US'), 165, y);
      y += 7;
    });

    y += 3;
    doc.line(15, y, 195, y);
    y += 10;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Total: $ ' + this.calcularTotal().toLocaleString('en-US'), 195, y, { align: 'right' });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text('¡Gracias por tu compra en Manila!', 105, 280, { align: 'center' });

    doc.save('factura_manila.pdf');
  }
}
