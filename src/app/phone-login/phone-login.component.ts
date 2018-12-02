import { Component, OnInit  } from '@angular/core';
import {WindowService} from '../../services/window.service';
import * as firebase from 'firebase/app';
import {environment} from '../../environments/environment';



export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // formnat phone number as E.164 format
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})



export class PhoneLoginComponent implements OnInit {

  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode : string;
  user: any;
  display: any;
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : any = Math.random().toString(36).substring(7);
  check : any ;
  newcheck: boolean = false;

  constructor(private win: WindowService) {   
  }

  barcodeCheck() {
    if (this.check == this.value){
      this.newcheck = true;
      console.log(this.newcheck)

    }
  }


  ngOnInit() {
    // this.windowRef = this.win.windowRef
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    // this.windowRef.recaptchaVerifier.render()
    this.windowRef = this.win.windowRef
    const new_fire = firebase.initializeApp(environment.firebase)
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
    
    
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num , appVerifier)
                .then(result => {
                  this.windowRef.confirmationResult = result;
                })
                .catch(error=> console.log(error));
                
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then(result => {
                    this.user = result.user;
                  })
                  .catch(
                    error =>{console.log(error)})
  }

}
