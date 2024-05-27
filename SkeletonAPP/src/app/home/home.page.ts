import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyServicioService } from '../myservicio.service';
import { DatePipe } from '@angular/common';

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

  constructor(private myServicio: MyServicioService, private fb: FormBuilder, private datePipe: DatePipe) {
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
}
