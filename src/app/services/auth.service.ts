import {Injectable, NgZone} from '@angular/core';
import {User} from '../entities/user';
import firebase from 'firebase/app';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {combineLatest, from, Observable, of} from 'rxjs';
import {first, mergeMap, switchMap} from 'rxjs/operators';
import {UsersService} from './users.service';

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
    public ngZone: NgZone,
    public usersService: UsersService
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

  googleAuth(): void {
    this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider: any): void {
    from(firebase.auth().signInWithPopup(provider))
      .pipe(first(), mergeMap((firebaseUserCredential: firebase.auth.UserCredential) => {
        return combineLatest(
          of(firebaseUserCredential),
          firebaseUserCredential.user ? this.usersService.getUserById(firebaseUserCredential.user.uid) : of(undefined));
      }), mergeMap(([firebaseUserCredential, userResultWrapper]) => {
        this.setUserData(firebaseUserCredential.user, userResultWrapper);
        this.ngZone.run(() => {
          this.router.navigate(['cars']);
        });
        return of(true);
      })).subscribe();
  }

  setUserData(firebaseUser: any, user: User | undefined): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${firebaseUser.uid}`);
    const userData: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      roles: user !== undefined ? user.roles : {subscriber: true}
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
