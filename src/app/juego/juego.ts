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
    /*this.posicion=Math.floor(Math.random() * 3) + 1;*/
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
        
      }else if (this.posicion2 == n) {

        const bebida = document.getElementById("image" + n) as HTMLImageElement;
        bebida.src = "https://cdn.cookmonkeys.es/recetas/medium/coctel-encuentro-sugestivo-7067.webp";
        this.pasa2 = true;

      }else {

        const equis = document.getElementById("image" + n) as HTMLImageElement;
        equis.src = "https://cdn-icons-png.flaticon.com/128/594/594598.png";
      }

      if (this.pasa == true && this.pasa2 == true){

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


/*ngAfterViewInit() {
  const casillas = document.querySelectorAll(".casilla");

  function iniciarJuego() {
    let posiciones = Array.from(casillas);
    posiciones.sort(() => Math.random() - 0.5);

    let imgPlato = document.createElement("img");
    imgPlato.src = "https://takestwoeggs.com/wp-content/uploads/2024/03/Kimchi-Jjigae-Kimchi-Stew-Takestwoeggs-3-150x188.jpg";
    imgPlato.style.display = "none"; // 🔹 oculto al inicio
    posiciones[0].appendChild(imgPlato);

    let imgBebida = document.createElement("img");
    imgBebida.src = "https://cdn.cookmonkeys.es/recetas/medium/coctel-encuentro-sugestivo-7067.webp";
    imgBebida.style.display = "none"; // 🔹 oculto al inicio
    posiciones[1].appendChild(imgBebida);

     posiciones.slice(2).forEach(c => {
  let imgX = document.createElement("img");
  imgX.src = "https://cdn-icons-png.flaticon.com/128/594/594598.png"; // puedes cambiar este URL por el tuyo
  imgX.style.display = "none";
  c.appendChild(imgX);
});

  casillas.forEach(c => {
  c.addEventListener("click", () => {
  let img = c.querySelector("img");
  c.classList.add("volteada"); // efecto de giro
  if (img && img.style.display === "none") {
    img.style.display = "block"; // 🔹 se muestra solo al hacer clic
    verificarGanador();
  }
});
});
}

function verificarGanador() {
const imagenes = Array.from(document.querySelectorAll(".casilla img")) as HTMLImageElement[];

const platoVisible = imagenes.some(
  (img: HTMLImageElement) =>
    img.src.includes("Kimchi-Jjigae-Kimchi-Stew") && getComputedStyle(img).display === "block"
);

const bebidaVisible = imagenes.some(
  (img: HTMLImageElement) =>
    img.src.includes("coctel-encuentro-sugestivo") && getComputedStyle(img).display === "block"
);

if (platoVisible && bebidaVisible) {
const mensaje = document.getElementById("mensaje") as HTMLElement;
mensaje.textContent = "🎉 ¡Encontraste el plato y la bebida! 🎉";
mensaje.classList.add("mostrar");

const boton = document.getElementById("reiniciar") as HTMLButtonElement;
boton.style.display = "block";
boton.onclick = () => {
  casillas.forEach(c => {
    c.innerHTML = "";
    c.classList.remove("volteada");
  });
  mensaje.textContent = "";
  mensaje.classList.remove("mostrar");
  boton.style.display = "none";
  iniciarJuego();
};
}
}







  iniciarJuego();
}*/

