import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUSerAction } from './auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscripcion: Subscription = new Subscription();

  constructor(private Afauth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) {


   }

   initAuthListener(){



    this.userSubscripcion = this.Afauth.authState.subscribe( (fbUser: firebase.User  )=> {
      
      if(fbUser){
        this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().
        subscribe((usuarioObj: any) => {

              const newUser = new User( usuarioObj );
              this.store.dispatch(new SetUSerAction(newUser))

        });
      }else{
        this.userSubscripcion.unsubscribe();
      }
    });

   }


   crearUsuario(nombre: string, email: string, password: string){

    //ActivarLoading
    this.store.dispatch(new ActivarLoadingAction());


    this.Afauth.auth.createUserWithEmailAndPassword(email,password )
    .then( resp => {

        const user: User = {
            uid: resp.user.uid,
            nombre: nombre,
            email: resp.user.email
        };

        this.afDB.doc(`${ user.uid }/usuario`)
        .set( user )
        .then( () => {
          
          this.router.navigate(['/']);
          this.store.dispatch(new DesactivarLoadingAction());

        });


      
    })
    .catch(error => {
      
      Swal.fire("Error al autenticar",error.Message, "error");
      console.error(error);
    });
   };



   login(email: string, password: string){

    this.store.dispatch(new ActivarLoadingAction()); 
    this.Afauth.auth.signInWithEmailAndPassword(email,password)
    .then( resp => {


      this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
        
    })
    .catch(error => {
      this.store.dispatch(new DesactivarLoadingAction());
      Swal.fire("Error al autenticar",error.Message, "error");
      console.error(error);
    });
   }

   logout(){
     this.router.navigate(['/login']);
     this.Afauth.auth.signOut();

   }


   isAuth(){
      return this.Afauth.authState
      .pipe(
        map(fbUser => {
          if(fbUser === null){
            this.router.navigate(['/login']);
            Swal.fire("Error al autenticar")
            }
          return fbUser != null})
      );
   }
}

  
