import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Alert } from 'selenium-webdriver';
import { ThrowStmt } from '@angular/compiler';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;
  
  constructor(private router: Router,
              private service: AuthService,
              private Afauth: AngularFireAuth,
              private store: Store<AppState>) { }



  ngOnInit() {
    
    this.subscription = this.store.select('ui')
    .subscribe(ui => {
      this.cargando = ui.isLoading
    });
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
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
