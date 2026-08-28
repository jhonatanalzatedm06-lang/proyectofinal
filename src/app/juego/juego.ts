import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juego',
  imports: [],
  templateUrl: './juego.html',
  styleUrls: ['./juego.css'],
})
export class Juego implements OnInit {

  posicion: number = 0;
  posicion2: number = 0;
  contador: number = 0;
  mensajeModal: String = "";
  pasa: boolean = false;
  pasa2: boolean = false;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    while (this.posicion == this.posicion2) {
      this.posicion = Math.floor(Math.random() * 16) + 1;
      this.posicion2 = Math.floor(Math.random() * 16) + 1;
    }
    this.cd.detectChanges()

  }

  async descubrirTabla(n: number) {

    if (this.posicion == n) {

      const comida = document.getElementById("image" + n) as HTMLImageElement;
      comida.src = "https://takestwoeggs.com/wp-content/uploads/2024/03/Kimchi-Jjigae-Kimchi-Stew-Takestwoeggs-3-150x188.jpg";
      this.pasa = true;

    } else if (this.posicion2 == n) {

      const bebida = document.getElementById("image" + n) as HTMLImageElement;
      bebida.src = "https://cdn.cookmonkeys.es/recetas/medium/coctel-encuentro-sugestivo-7067.webp";
      this.pasa2 = true;

    } else {

      const equis = document.getElementById("image" + n) as HTMLImageElement;
      equis.src = "https://cdn-icons-png.flaticon.com/128/594/594598.png";
    }

    if (this.pasa == true && this.pasa2 == true) {

      const modal = new (window as any).bootstrap.Modal(document.getElementById('myModal'));
      this.mensajeModal = "Reiniciando ...";
      modal.show();

      await new Promise(resolve => setTimeout(resolve, 2500));

      this.reiniciar();
    }

  }

  reiniciar() {
    var num = 1
    while (num <= 16) {
      const negro = document.getElementById("image" + num) as HTMLImageElement;
      negro.src = "https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30455.jpg";
      num++;
    }
    this.posicion = 0;
    this.posicion2 = 0;
    this.pasa = false;
    this.pasa2 = false;
    this.ngOnInit();
  }
}






