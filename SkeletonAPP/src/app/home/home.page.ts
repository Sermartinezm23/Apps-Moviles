import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyServicioService } from '../myservicio.service';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  form: FormGroup;
  showDatePicker: boolean = false;
  selectedDate: string = '';

  constructor(
    private myServicio: MyServicioService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private alertController: AlertController
  ) {
    this.form = this.fb.group({
      nombre: [''],
      apellido: [''],
      nivelEducacion: [''],
      fechaNacimiento: ['']
    });
  }

  ngOnInit() {
    const username = this.myServicio.getUsername();
    if (username) {
      this.username = username;
    }
  }

  openDatePicker() {
    this.showDatePicker = true;
  }

  closeDatePicker() {
    this.showDatePicker = false;
  }

  onDateChange(event: CustomEvent) {
    const formattedDate = this.datePipe.transform(event.detail.value, 'dd/MM/yyyy');
    this.form.controls['fechaNacimiento'].setValue(formattedDate);
  }

  limpiarCampos() {
    this.form.reset();
  }

  async mostrarDatos() {
    const nombre = this.form.get('nombre')?.value || '';
    const apellido = this.form.get('apellido')?.value || '';
    const nivelEducacion = this.form.get('nivelEducacion')?.value || '';
    const fechaNacimiento = this.form.get('fechaNacimiento')?.value || '';

    const alert = await this.alertController.create({
      message: `Su nombre es: ${nombre} ${apellido}`,
      buttons: ['SI']
    });

    await alert.present();
  }
}


