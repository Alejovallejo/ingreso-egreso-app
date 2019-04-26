import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Afauth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore) {


   }

   initAuthListener(){

    this.Afauth.authState.subscribe( (fbUser: firebase.User  )=> {
      console.log(fbUser)
    });

   }


   crearUsuario(nombre: string, email: string, password: string){

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

        });


      
    })
    .catch(error => {
      Swal.fire("Error al iniciar al autenticar",error.Message, "error");
      console.error(error);
    });
   };



   login(email: string, password: string){

    this.Afauth.auth.signInWithEmailAndPassword(email,password )
    .then( resp => {
        this.router.navigateByUrl('/DashboardComponent')
    })
    .catch(error => {
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

  
