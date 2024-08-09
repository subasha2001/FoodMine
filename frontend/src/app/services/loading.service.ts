import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  //all the components having this class will be informed about the state of loading
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  showLoading(){
    this.isLoadingSubject.next(true);
  }

  hideLoading(){
    this.isLoadingSubject.next(true);
  }
  //by returning the subject as observable, no one can change its value from outside
  get isLoading(){
    return this.isLoadingSubject.asObservable();
  }
}
