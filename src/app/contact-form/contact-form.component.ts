import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export default class ContactFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.contactService.get(parseInt(id))
      .subscribe(contact => {
        console.log('c', contact);
      })
    }   // min: 2:12:40

  }

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });

  create() {
    const contact = this.form.value; 
    this.contactService.create(contact)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
