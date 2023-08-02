import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ContribuyenteIne } from 'src/app/models/contribuyente.model';
import { CloudFireService } from 'src/app/services/cloud-fire.service';
import { RegService } from 'src/app/services/reg.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {

  forms: FormGroup;
  loading: any;
  titulo = 'Agregar Registro';
  private path = 'Personas/'

  constructor( private fb: FormBuilder, 
               private regService: RegService,
               public cloudFireService: CloudFireService,
               public loadingController: LoadingController,
               public toastController: ToastController,
               public menucontroller: MenuController) { 
    

    this.forms = this.fb.group({
      nombres:    [ '', Validators.required ],
      apellidos:  [ '', Validators.required ],
      domicilio:  [ '', Validators.required ],
      claveIne:   [ '', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      curp:       [ '', [Validators.required, Validators.minLength(18), Validators.maxLength(18)] ],
      fechaNac:   [ '', Validators.required ],
      estado:     [ '', Validators.required ],
      municipio:  [ '', Validators.required ],
      seccion:    [ '', [Validators.required, Validators.minLength(4), Validators.maxLength(4)] ],
      emision:    [ '', [Validators.required, Validators.minLength(4), Validators.maxLength(4)] ],
      vigencia:   [ '', Validators.required ]
    })
  }

  crearRegistro(){

    // console.log(this.forms);

    const contribuyente: ContribuyenteIne = {
      nombres:    this.forms.value.nombres,
      apellidos:  this.forms.value.apellidos,
      domicilio:  this.forms.value.domicilio,
      claveIne:   this.forms.value.claveIne,
      curp:       this.forms.value.curp,
      fechaNac:   this.forms.value.fechaNac,
      estado:     this.forms.value.estado,
      municipio:  this.forms.value.municipio,
      seccion:    this.forms.value.seccion,
      emision:    this.forms.value.emision,
      vigencia:   this.forms.value.vigencia
    }

    const id = this.cloudFireService.getId();
    this.cloudFireService.createDoc(contribuyente, this.path, id);
    // this.presentLoading();
    // this.regService.guardarRegistro(contribuyente).then(()=>{
    //   this.loading.dismiss();
    //   this.presentToast('Registro creado y guardado en BD');
      // console.log('Registro Creado');
    //   this.forms.reset();
    // }, error =>{
    //     this.presentToast('No se pudo guardar porque no hay conexión a internet'); 
    //     console.log(error);
    // })
  }

  ngOnInit(): void {
    this.menucontroller.toggle('main');
    this.regService.getRegistro().subscribe( res => {
      this.titulo = 'Edite';
      this.forms.patchValue({ 
        nombres: res.nombres,
        apellidos: res.apellidos,
        domicilio: res.domicilio,
        claveIne: res.claveIne,
        curp: res.curp,
        fechaNac: res.fechaNac,
        estado: res.estado,
        municipio: res.municipio,
        seccion: res.seccion,
        emision: res.emision,
        vigencia: res.vigencia
      })
      console.log(res);
    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
     const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000
    });
    toast.present();
  }

}
