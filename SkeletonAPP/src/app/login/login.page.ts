import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MyServicioService } from '../myservicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private navCtrl: NavController,
    private myServicio: MyServicioService
  ) {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$'),
          Validators.minLength(3),
          Validators.maxLength(8),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{4}$')
        ],
      ],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      if (usernameControl) {
        const username = usernameControl.value;
        this.myServicio.setUsername(username);
        this.navCtrl.navigateForward('/home');
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  login() {
    console.log('Login button clicked');
  }
}
