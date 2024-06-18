import { Component, OnInit } from '@angular/core';
import { MyServicioService } from '../myservicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    username: '',
    password: ''
  };
  originalUser: any = {};
  isEditing: boolean = false;

  constructor(private myServicio: MyServicioService, private router: Router) {}

  async ngOnInit() {
    await this.loadUser();
  }

  async loadUser() {
    const user = await this.myServicio.getUserFromSession();
    if (user) {
      this.user = user;
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleEdit() {
    if (this.isEditing) {
      this.user = { ...this.originalUser };
    } else {
      this.originalUser = { ...this.user };
    }
    this.isEditing = !this.isEditing;
  }

  async saveChanges() {
    await this.myServicio.updateUser(this.user);
    this.toggleEdit();
  }

  async logout() {
    await this.myServicio.logout();
    this.router.navigate(['/login']);
  }
}
