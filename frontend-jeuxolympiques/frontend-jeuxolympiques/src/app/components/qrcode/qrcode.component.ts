import {Component, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {Router} from "@angular/router";
import {AsyncPipe, CommonModule, NgFor} from "@angular/common";
import {QrCodeModule} from "ng-qrcode";
import {Payment} from "../../models/payment";
import {Observable} from "rxjs";

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [CommonModule, QrCodeModule, NgFor, AsyncPipe],
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.css'
})
export class QrcodeComponent implements OnInit{
  payment$!:Observable<Payment[]>
  key= localStorage.getItem('bearer');

constructor(private data:DataService, private route: Router){}

  ngOnInit() {

  }

  generateQrCode(){
    let idKey = localStorage.getItem('idKey');
    let valueIdNumber = Number(idKey);
    this.payment$ = this.data.getPaymentById(valueIdNumber);
  }
}
