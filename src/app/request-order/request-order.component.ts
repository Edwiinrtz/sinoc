import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from "./mime-type.validator";
import { requestOrderServices } from './request-order.services';

@Component({
  selector: 'app-request-order',
  templateUrl: './request-order.component.html',
  styleUrls: ['./request-order.component.css']
})
export class RequestOrderComponent implements OnInit {

  form: FormGroup;
  filePreview: string;
  selectedFile: File = null;
  nombreArchivo: string;

  constructor(private requestOrderServices: requestOrderServices) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(null,
        {validators: [Validators.required]
        }),
      'lastName': new FormControl(null,
        {validators: [Validators.required]
        }),
      'cedula': new FormControl(null,
        {validators: [Validators.required]
        }),
      'observations': new FormControl(null,
        {validators: [Validators.required]
        }),
      'archivo': new FormControl(null,
        {validators: [Validators.required]
        //,asyncValidators: [mimeType]
        })
    });
  }

  solicitarOrden() {
    if(this.form.invalid) {
      return;
    }
    console.log("enviar data components");

    this.requestOrderServices.addPost(
      this.form.value.name,
      this.form.value.lastName,
      this.form.value.cedula,
      this.form.value.observations,
      this.form.value.archivo
    );
    //this.form.reset()
  }

  onImagePicked(event: Event) {
    console.log("event:: " , event);
    this.selectedFile = <File>(event.target as HTMLInputElement).files[0];
    this.nombreArchivo = (event.target as HTMLInputElement).files[0].name;
    const file = <File>(event.target as HTMLInputElement).files[0];
    this.form.patchValue({
     archivo: file
    });
    this.form.get('archivo').updateValueAndValidity();

    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.filePreview = reader.result as string;
    // };
    // reader.readAsDataURL(file);

  }

}
