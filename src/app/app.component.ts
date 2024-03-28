import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kibra';
  users= signal<{id: number, name: string}[]>([])
  adding = signal(false);
/*   form = new FormGroup({name: new FormControl('', Validators.required)});
  name= new FormControl(''); */

  form: FormGroup;
  name: FormControl;

  constructor() {
    this.name = new FormControl('');
    this.form = new FormGroup({
      name: this.name
    });
  }

  ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(this.users.set);
  }

  save(){
    this.users.update(old=>
      [...old, { id: 1, name: this.form.value.name ?? '' }]);    
  }
}
