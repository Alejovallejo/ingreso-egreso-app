import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  title = 'ingresoEgresoApp';

  constructor(public auth: AuthService){



  }


  ngOnInit(){

    this.auth.initAuthListener()
    
  } 
  


}
