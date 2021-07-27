import {Injectable, NgZone} from '@angular/core';
import {User} from '../entities/user';
import firebase from 'firebase/app';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | undefined>;

  static checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      // @ts-ignore
      if (user.roles && user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(undefined);
          }
        })
      ));
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user !== null && user !== '' && JSON.parse(user);
  }

  get loggedInUser$(): Observable<User | undefined> {
    return this.user$;
  }

  get loggedInUser(): any {
    const user = localStorage.getItem('user');

    if (user !== null && user !== '') {
      return JSON.parse(user);
    }
  }

  googleAuth(): Promise<void> {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider: any): Promise<void> {
    return firebase.auth().signInWithPopup(provider)
      .then((result) => {
        this.setUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['cars']);
        });
      }).catch((error) => {
        window.alert(error);
      });
  }

  setUserData(user: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: {
        subscriber: true
      }
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  signOut(): Promise<void> {
    return firebase.auth().signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  canRead(user: User | undefined): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return user !== undefined && AuthService.checkAuthorization(user, allowed);
  }

  canEdit(user: User | undefined): boolean {
    const allowed = ['admin', 'editor'];
    return user !== undefined && AuthService.checkAuthorization(user, allowed);
  }

  canDelete(user: User | undefined): boolean {
    const allowed = ['admin'];
    return user !== undefined && AuthService.checkAuthorization(user, allowed);
  }


}
