import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UnitService } from 'src/app/core/service/unit.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-units-create',
  templateUrl: './units-create.component.html',
  styleUrl: './units-create.component.scss'
})
export class UnitsCreateComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  showPassword: boolean = false;
  unitData: any = {
    "name-unit": null,
    "location": null,
    "division": null,
    "is-active": true,
    "is-deleted": false,
  };
  @ViewChild('successAlert') successAlert!: SwalComponent;
  @ViewChild('errorAlert') errorAlert!: SwalComponent;
  constructor(
    private unitService: UnitService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Unit', path: '/admin/units' },
      { label: 'Create', path: '', active: true },
    ];
  }

  onSubmit(form: NgForm): void {
    this.unitService.saveUnit(this.unitData).subscribe({
      next: (resp: any) => {
        // Tampilkan SweetAlert jika berhasil
        this.successAlert.fire();
        this.router.navigate(['/admin/units']); // Navigasi setelah alert
      },
      error: (err) => {
        // Tampilkan SweetAlert jika gagal
        this.errorAlert.fire();
        console.error('Error creating unit:', err);
      }
    });
  }
}
