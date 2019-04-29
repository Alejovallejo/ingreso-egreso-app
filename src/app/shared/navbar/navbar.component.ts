import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { database } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription: Subscription = new Subscription();


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    
    this.subscription = this.store.select('auth')
    .pipe(
      filter(data => data.user != null)
    )
    .subscribe(data => {
        this.nombre = data.user.nombre
    });
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
