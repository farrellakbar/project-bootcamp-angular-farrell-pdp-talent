import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AccessService } from 'src/app/core/service/access.service';
import { BatchService } from 'src/app/core/service/batch.service';
import { UserService } from 'src/app/core/service/user.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.scss'
})
export class UsersCreateComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  showPassword: boolean = false;
  userData: any = {
    "email": null,
    "password": null,
    "is-active": true,
    "is-deleted": false,
    "id-batch": 0,
    "id-access": 0 
  };
  batchOptions: any[] = [];
  accessOptions: any[] = [];

  @ViewChild('successAlert') successAlert!: SwalComponent;
  @ViewChild('errorAlert') errorAlert!: SwalComponent;
  constructor(
    private userService: UserService, 
    private batchService: BatchService, 
    private accessService: AccessService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Program', path: '/admin/programs' },
      { label: 'Create', path: '', active: true },
    ];
    this.loadBatchOptions();
    this.loadAccessOptions();
  }

  loadBatchOptions(): void {
    this.batchService.getBatchesActive().subscribe(
      (data) => {
        this.batchOptions = data;
      },
      (error) => {
        console.error('Error loading batch options:', error);
      }
    );
  }

  loadAccessOptions(): void {
    this.accessService.getAccessesActive().subscribe(
      (data) => {
        this.accessOptions = data;
      },
      (error) => {
        console.error('Error loading access options:', error);
      }
    );
  }

  onSubmit(form: NgForm): void {
    this.userService.saveUser(this.userData).subscribe({
      next: (resp: any) => {
        // Tampilkan SweetAlert jika berhasil
        this.successAlert.fire();
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        // Tampilkan SweetAlert jika gagal
        this.errorAlert.fire();
        console.error('Error creating user:', err);
      }
    });
  }

}
