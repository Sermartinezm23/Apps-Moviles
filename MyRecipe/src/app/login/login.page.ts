import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServicioService } from '../myservicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private myServicio: MyServicioService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    const { username, password } = this.loginForm.value;
    const user = await this.myServicio.getUser(username, password);
    if (user) {
      this.router.navigate(['/home']);
    } else {
      console.log('Usuario o contraseña incorrectos');
    }
  }
}
