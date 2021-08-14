import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;
  data:any;
  nameFile: string;
  docFile: FormData;

  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      register:new FormControl('', Validators.required),
      phone:new FormControl('', Validators.required),
      mail:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
    });
    this.nameFile = '';
    this.docFile = new FormData();
   }

  ngOnInit(): void {
    this.data={};
  }
  onClick(){
    this.data.name= this.registerForm.value.name;
    this.data.register= this.registerForm.value.register;
    this.data.phone= this.registerForm.value.phone;
    this.data.mail= this.registerForm.value.mail;
    this.data.password= this.registerForm.value.password;
    this.data.document= this.registerForm.value.document;
    console.log(this.data, 'AQUI');
  }

  onFileChange(evt: any, files: File[]) {
    try {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1){
        throw new Error('Cannot use multiple files.');
      }
      
      if (!target.files.item(0).type.includes('pdf')){
        throw new Error('Invalid file type, just \'pdf\' files are supported.');
      }
      if (target.files.item(0).name.includes(' ')){
        throw new Error('Invalid file name, no empty spaces are supported, use _ instead.');
      }

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const formData = new FormData();
        formData.append('file', <File>files[0]);
        this.docFile = formData;
        this.nameFile=target.files.item(0).name;;

        console.log(this.nameFile, 'file')
        console.log(target.files.item(0), 'filet')
      };
      reader.onerror = (e: any) => {
      };
      reader.onloadstart = (e: any) => {
      };
      reader.onloadend = (e: any) => {
      };
      reader.readAsBinaryString(target.files[0]);
    } catch(error){
      console.log(error)
    }
    
  }

}
