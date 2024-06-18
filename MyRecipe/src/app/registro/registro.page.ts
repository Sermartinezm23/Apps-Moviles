import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServicioService } from '../myservicio.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private myServicio: MyServicioService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.minLength(3),
        Validators.maxLength(8)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$')
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit() { }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      form.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      delete user.confirmPassword;
      await this.myServicio.addUser(user);
      this.router.navigate(['/login']);
    }
  }
}