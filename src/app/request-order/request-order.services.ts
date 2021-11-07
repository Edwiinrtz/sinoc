import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { RequestOrder } from './request-order-interfaces';

@Injectable({
  providedIn: "root"
})

export class requestOrderServices {

  private orders: RequestOrder[] = [];
  private orderUpdated = new Subject<RequestOrder[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }


  addPost(name: string, lastName: string, id:string, observations:string,  file: File) {

    console.log("data en services:: >> "
    , "\n nombre : ", name
    , "\n apellidos:", lastName
    , "\n id:", id
    , "\n observaciones:", observations
    , "\n Archivo:", file);

    const postData = new FormData();
    postData.append("nombre", name);
    postData.append("apellidos", lastName);
    postData.append("cedula", id);
    postData.append("Obervaciones", observations);
    postData.append("image", file, name);

    // this.http.post("ruta/", postData)
    //   .subscribe( responseData => {
    //     const order: RequestOrder = {
    //       id: id,
    //       name: name,
    //       lastName: lastName,
    //       observations: observations,
    //       file: "Ruta-de-la-imagen"
    //     };
    //     this.orders.push(order);
    //     this.orderUpdated.next([...this.orders]);
    //     this.router.navigate(["/"]);
    // });
  }

}
