import { Component, OnInit } from '@angular/core';
import { IngresoEgreso } from '../ingreso-egreso/ingreso-egreso-model';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public ingresoEgresoService: IngresoEgresoService) {

   }

  ngOnInit() {

    this.ingresoEgresoService.initIngresoEgresoListener();
  }

}
