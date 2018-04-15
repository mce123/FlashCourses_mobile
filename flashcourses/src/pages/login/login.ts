import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ToastOptions } from 'ionic-angular/components/toast/toast-options'
import { FlashtabsPage } from '../flashtabs/flashtabs';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginModel } from './LoginModel';
import { TokenModel } from './TokenModel';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[ApiProvider]
})
export class LoginPage {

  Token:TokenModel;
  loginModel = new LoginModel();
  toastOptions:ToastOptions;


constructor(public navCtrl: NavController, public navParams: NavParams, private api_service:ApiProvider,
  private _toast:ToastController,public loadingCtrl: LoadingController,private storage: Storage) {
  this.toastOptions = {message : 'Please verify your credentials', duration:2000}
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLoginSuccesful(token:string){
    this.navCtrl.push(FlashtabsPage);
    this.storage.set('usertoken', token);/*.then(()=>
  this.navCtrl.remove(0, this.navCtrl.getActive().index));
    console.log(token);*/
  }

  login(){
    let loader = this.loadingCtrl.create({
      content: "Flashcourses is validating your information...",
    });
    loader.present().then(() => {
      this.api_service.login({"username":this.loginModel.username,"password":this.loginModel.password})
    .subscribe(token =>{this.Token = token,this.onLoginSuccesful(this.Token.access)},
    ()=><any>this._toast.create(this.toastOptions).present().then(
      () =>{loader.dismiss();})
    )});
    loader.dismiss();
  }
}