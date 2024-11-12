import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AccessService } from 'src/app/core/service/access.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-accesses-create',
  templateUrl: './accesses-create.component.html',
  styleUrl: './accesses-create.component.scss'
})
export class AccessesCreateComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  showPassword: boolean = false;
  accessData: any = {
    "name-access": '',
    "is-active": true,
    "is-deleted": false,
  };
  @ViewChild('successAlert') successAlert!: SwalComponent;
  @ViewChild('errorAlert') errorAlert!: SwalComponent;
  constructor(private accessService: AccessService, private router: Router) {}
  ngOnInit() {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Access', path: '/admin/accesses' },
      { label: 'Create', path: '', active: true },
    ];
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.accessService.saveAccess(this.accessData).subscribe({
        next: (resp: any) => {
          // Tampilkan SweetAlert jika berhasil
          this.successAlert.fire();
          this.router.navigate(['/admin/accesses']);
        },
        error: (err) => {
          // Tampilkan SweetAlert jika gagal
          this.errorAlert.fire();
          console.error('Error creating access:', err);
        }
      });
    } else {
      // Alert warning untuk validasi form
      this.errorAlert.fire();
    }
  }
}
