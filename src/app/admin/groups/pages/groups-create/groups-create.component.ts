import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GroupService } from 'src/app/core/service/group.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-groups-create',
  templateUrl: './groups-create.component.html',
  styleUrl: './groups-create.component.scss'
})
export class GroupsCreateComponent implements OnInit  {
  pageTitle: BreadcrumbItem[] = [];
  showPassword: boolean = false;
  groupData: any = {
    "name-group": null,
    "is-active": true,
    "is-deleted": false,
  };
  @ViewChild('successAlert') successAlert!: SwalComponent;
  @ViewChild('errorAlert') errorAlert!: SwalComponent;
  constructor(
    private groupService: GroupService, 
    private router: Router
  ) { }
  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Program', path: '/admin/programs' },
      { label: 'Create', path: '', active: true },
    ];
  }

  onSubmit(form: NgForm): void {
    this.groupService.saveGroup(this.groupData).subscribe({
      next: (resp: any) => {
        this.successAlert.fire();
        this.router.navigate(['/admin/groups']);
      },
      error: (err) => {
        this.errorAlert.fire();
        console.error('Error creating group:', err);
      }
    });
  }
}
