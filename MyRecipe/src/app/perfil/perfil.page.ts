import { Component, OnInit } from '@angular/core';
import { MyServicioService } from '../myservicio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = 'Desconocido';

  constructor(private myServicio: MyServicioService) { }

  async ngOnInit() {
  }
}
