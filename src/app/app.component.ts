import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  palabraIntroducida: string = '';
  palabra: string = '';

  letra: string = '';
  intentos: number = 0;

  acertada: boolean = false;
  palabraEnJuego: boolean = false;


  empezarJuego(event: Event) {
    event.preventDefault();

    if (!this.validarPalabraIndroducita()) {
      alert('Por favor, ingresa solo letras.');
      return;
    }

    this.palabraIntroducida = this.palabraIntroducida.toLowerCase();

    // Rellena 'palabra' de '*' los cuales se usarán para controlar si el Usuario ha acertado la palabra.
    this.palabra = this.palabra.padEnd(this.palabraIntroducida.length, '*');

    this.palabraEnJuego = true;
  }

  comprobarLetra(event: Event) {
    event.preventDefault();

    if (!this.validarLetra()) {
      alert('Por favor, ingresa solo letras. (minimo 2)');
      return;
    }

    // Manejamos todos los caracteres en minusculas.
    this.letra = this.letra.toLowerCase();

    if (this.palabraIntroducida.includes(this.letra)) {
      for (let i = 0; i < this.palabra.length; i++) {
        // Introduce la letra acertada en 'palabra' en las posiciones correspondientes.
        if (this.palabraIntroducida.charAt(i) == this.letra) {
          this.palabra = this.palabra.substring(0, i) + this.letra + this.palabra.substring(i + 1);
        }
        // Comprueba si se han terminado los '*'
        if (!this.palabra.includes('*')) {
          this.acertada = true;
        }
      }

    } else {
      this.intentos++;
    }

    this.letra = '';
  }

  volverAJugar(event: Event) {
    event.preventDefault();

    this.palabraIntroducida = '';
    this.palabra = '';
    this.letra = '';
    this.intentos = 0;
    this.acertada = false;
    this.palabraEnJuego = false;
  }

  validarPalabraIndroducita(): boolean {
    const patron = /^[a-zA-Z]{2,}$/;
    return patron.test(this.palabraIntroducida);
  }

  validarLetra(): boolean {
    const patron = /^[a-zA-Z]+$/;
    return patron.test(this.letra);
  }

}
