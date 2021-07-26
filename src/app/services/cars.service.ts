import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Car} from '../entities/car';

@Injectable()
export class CarsService {

  constructor(private db: AngularFirestore) {

  }

  getCars(): Observable<Car[]> {
    return this.db.collection<Car>('cars').valueChanges();
  }

  removeCar(id: string): Observable<void> {
    return from(this.db.collection('cars').doc(id).delete());
  }

  addCar(car: Car): Observable<void> {
    return from(this.db.collection('cars').doc(car.id).set(car));
  }


}
