import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso-model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';
import { SetItemsActions, UnSetItemsActions } from './ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription =  new Subscription();  

  constructor(private afDB: AngularFirestore,
              private authservice: AuthService,
              private store: Store<AppState>) {  

  }

  initIngresoEgresoListener(){

    this.ingresoEgresoListenerSubscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    ) .subscribe(auth =>  this.ingresoEgresoItems(auth.user.uid));
  }

  cancelarSubs(){
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch(new UnSetItemsActions());

  }

  private ingresoEgresoItems(uid: string){
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( docData => {

        return docData.map(doc => {

          return{
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };

        });

      })
    )
    .subscribe((collecion: any[]) => {

        this.store.dispatch(  new SetItemsActions(collecion));
    });
    
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){

    const user = this.authservice.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso( uid: string){
    const user = this.authservice.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`)
    .delete();
  }


}
