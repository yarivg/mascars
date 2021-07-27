import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {User} from '../entities/user';
import {first} from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(private db: AngularFirestore) {
  }

  getUserById(id: string): Observable<User| undefined> {
    return from(this.db.collection<User>('users').doc(id).valueChanges()).pipe(first());
  }
}
