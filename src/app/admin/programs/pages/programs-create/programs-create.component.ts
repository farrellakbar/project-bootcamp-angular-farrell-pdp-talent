import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProgramService } from 'src/app/core/service/program.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-programs-create',
  templateUrl: './programs-create.component.html',
  styleUrl: './programs-create.component.scss'
})
export class ProgramsCreateComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  showPassword: boolean = false;
  programData: any = {
    "name-program": null,
    "price-forecasts": null,
    "is-active": true,
    "is-deleted": false,
  };
  @ViewChild('successAlert') successAlert!: SwalComponent;
  @ViewChild('errorAlert') errorAlert!: SwalComponent;
  constructor(
    private programService: ProgramService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Program', path: '/admin/programs' },
      { label: 'Create', path: '', active: true },
    ];
  };

  onSubmit(form: NgForm): void {
    this.programService.saveProgram(this.programData).subscribe({
      next: (resp: any) => {
        // Tampilkan SweetAlert jika berhasil
        this.successAlert.fire();
        this.router.navigate(['/admin/programs']);
      },
      error: (err) => {
        // Tampilkan SweetAlert jika gagal
        this.errorAlert.fire();
        console.error('Error creating user:', err);
      }
    });
  }
}
