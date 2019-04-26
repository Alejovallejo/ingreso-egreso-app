import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Alert } from 'selenium-webdriver';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private service: AuthService,
              private Afauth: AngularFireAuth) { }

  ngOnInit() {
  }

  login(){
  
  }

  VerificacionDatos(data: any){
    if(data.email==="" || data.password===""){
        alert("Los campos estan vacios valida, porfavor.")
    }else{
      this.service.login(data.email,data.password);
    }
  }

}
