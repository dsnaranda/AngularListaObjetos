import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListarComponent } from './Components/listar/listar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  // imports: [ListarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SistemaEstudiantes';
}
