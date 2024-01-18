import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  palabraIntroducida: string = '';
  palabra: string = '';
  intentos: number = 0;

  acertada: boolean = false;


  setPalabraIntroducida(palabraIntroducida: string) {
    this.palabraIntroducida = palabraIntroducida;

    // Rellena 'palabra' de '*' los cuales se usarán para controlar si el Usuario ha acertado la palabra.
    this.palabra = this.palabra.padEnd(palabraIntroducida.length, '*');
  }

  comprobarLetra(letra: string) {

    if (this.palabraIntroducida.includes(letra)) {
      for (let i = 0; i < this.palabra.length; i++) {
        // Introduce la letra acertada en 'palabra' en las posiciones correspondientes.
        if (this.palabraIntroducida.charAt(i) == letra) {
          this.palabra = this.palabra.substring(0, i) + letra + this.palabra.substring(i + 1);
        }
        // Comprueba si se han terminado los '*'
        if (!this.palabra.includes('*')) {
          this.acertada = true;
        }
      }

    } else {
      this.intentos++;
    }

  }

}
