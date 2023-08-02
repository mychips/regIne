import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ContribuyenteIne } from 'src/app/models/contribuyente.model';
import { CloudFireService } from 'src/app/services/cloud-fire.service';
import { RegService } from 'src/app/services/reg.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent  implements OnInit {

  loading: any;
  private path = 'Personas/';

  constructor( private regService: RegService, 
               public loadingController: LoadingController,
               public alertController: AlertController,
               public toastController: ToastController,
               public menuController: MenuController,
               public cloudFireService: CloudFireService ) { }

  // listaRegistros: ContribuyenteIne[]=[];
  personas: ContribuyenteIne[] = [];

  ngOnInit() {
    this.menuController.toggle('main');
    // this.presentLoading();
    this.listarRegistros();
    // this.loading.dismiss();
  }

  listarRegistros(){
    this.cloudFireService.getCollection<ContribuyenteIne>( this.path ).subscribe( res => {
      console.log(res);
      this.personas = res;
    });
    // this.regService.listarRegistros().subscribe( res=>{
    //   console.log(res);
    //   this.listaRegistros = [];
// 
    //   res.forEach((element: any) => {
    //     this.listaRegistros.push({
    //       id:element.payload.doc.id, 
    //       ...element.payload.doc.data()
    //     })
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
    //   });
      // console.log(this.listaRegistros);
    // })
  }

  async borrarRegistro( id: any ){
      const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Advertencia!',
        message: '¿Desea borrar el registro?!!!',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'normal',
            handler: (blah) => {
              console.log('Confirm Okay');
            }
          }, {
            text: 'OK',
            handler: () => {
              this.regService.eliminarRegistro( id ).then( () => {
                this.presentToast('Registro eliminado de la BD');
                this.alertController.dismiss();
              }, error => {
                this.presentToast('No se pudo eliminar');
                  console.log(error);
              })
            }
          }
        ]
      });
      await alert.present();
  }

  editarRegistro( registro: ContribuyenteIne ) {
    this.regService.editarRegistro(registro);
    
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
