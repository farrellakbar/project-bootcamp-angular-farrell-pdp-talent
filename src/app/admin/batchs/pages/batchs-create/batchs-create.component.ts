import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { BatchService } from 'src/app/core/service/batch.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-batchs-create',  
  templateUrl: './batchs-create.component.html',
  styleUrl: './batchs-create.component.scss'
})
export class BatchsCreateComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  showPassword: boolean = false;

  batchData: any = {
    "name-batch": '',
    "total-budget": null,
    "allocated-budget": null,
    "is-active": true,
    "is-deleted": false,
    "talent": { "id": 1 }
  };
  @ViewChild('successAlert') successAlert!: SwalComponent;
  @ViewChild('errorAlert') errorAlert!: SwalComponent;
  constructor(private batchService: BatchService, private router: Router) {}
 

  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Bacth', path: '/admin/batchs' },
      { label: 'Create', path: '', active: true },
    ];
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.batchService.saveBatch(this.batchData).subscribe({
        next: (resp: any) => {
          // Tampilkan SweetAlert jika berhasil
          this.successAlert.fire();
          this.router.navigate(['/admin/batchs']); // Navigasi setelah alert
        },
        error: (err) => {
          // Tampilkan SweetAlert jika gagal
          this.errorAlert.fire();
          console.error('Error creating batch:', err);
        }
      });
    } else {
      // Alert warning untuk validasi form
      this.errorAlert.fire();
    }
  }

  
}
