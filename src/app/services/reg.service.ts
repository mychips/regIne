import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ContribuyenteIne } from '../models/contribuyente.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegService {

  private registro$ = new Subject<any>

  constructor( public firebase: AngularFirestore) { }

  guardarRegistro( registro: ContribuyenteIne ): Promise<any> {
    // console.log('Registro realizado');
    return this.firebase.collection('registros').add(registro);
  }

  listarRegistros(): Observable<any> {
    return this.firebase.collection('registros').snapshotChanges();
  }
  
  eliminarRegistro( id: string ) : Promise<any> {
    return this.firebase.collection('registros').doc(id).delete();
  }

  editarRegistro( registro: ContribuyenteIne) {
    this.registro$.next(registro);
  }

  getRegistro(): Observable<ContribuyenteIne> {
    return this.registro$.asObservable();
  }
  
}
