import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgreso } from '../../ingreso-egreso/ingreso-egreso-model';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  email: string;
  subscription: Subscription = new Subscription();


  constructor(public router: Router,
              public auth: AuthService,
              private store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter(data => data.user != null)
    ).subscribe(data => {
        this.nombre = data.user.nombre
        this.email = data.user.email
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  cerrarSesion(){
    this.auth.logout();
    this.ingresoEgresoService.cancelarSubs();
  }

}
