import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Encuestas } from 'src/app/models/encuesta.model';
import { CloudFireService } from 'src/app/services/cloud-fire.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent  implements OnInit {

  newEncuesta: Encuestas = {
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: '',
    pregunta5: '',
  };

  private path = 'Encuestas/';

  constructor( public menucontroller: MenuController,
               public cloudFireService: CloudFireService ) { }

  ngOnInit() {}

  guardarEncuesta(){
    const id = this.cloudFireService.getId();
    this.cloudFireService.createDoc(this.newEncuesta, this.path, id)
  }

}
