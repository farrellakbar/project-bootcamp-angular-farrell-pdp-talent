import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GroupService } from 'src/app/core/service/group.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups-index',
  templateUrl: './groups-index.component.html',
  styleUrl: './groups-index.component.scss'
})
export class GroupsIndexComponent {
  pageTitle: BreadcrumbItem[] = [];
  records: any[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];

  @ViewChild('deleteSwal') deleteSwal!: SwalComponent;

  constructor(
      private groupService: GroupService, 
      private router: Router

  ) { }
  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Batchs', path: '', active: true }
    ];
    this._fetchData();
    this.initTableCofig();
  }
  private _fetchData() {
    this.groupService.getGroups().subscribe(
      (data) => {
        this.records = data;
        console.log(this.records);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  //OPEN INITIALIZE TABLE CONFIGURATION
    initTableCofig(): void {
      this.columns = [
        {
          name: 'nameGroup',
          label: 'Group Name',
          formatter: (record: any) => record.nameGroup,
          width: 745,
        },
        {
          name: 'users',
          label: 'Users', 
          formatter: (record: any) => {
            return record.users && record.users.length > 0
              ? record.users.map((user: any) => user.email).join(', ') 
              : 'No Users';
          },
        },
    
        {
          name: 'active',
          label: 'Active',
          formatter: (record: any) => (record.active ? 'Yes' : 'No'),
        },
        {
          name: 'actions',
          label: 'Actions',
          formatter: () => '',
        },
      ];
    }
  //CLOSE INITIALIZE TABLE CONFIGURATION
  editRecord(id: number) {
    this.router.navigate([`/unit/edit`, id]);
  }
  deleteRecord(id: number) {
    if (this.deleteSwal) {
      this.deleteSwal.fire().then((result) => {
        if (result.isConfirmed) {
          this.groupService.deleteGroup(id).subscribe({
            next: () => {
              Swal.fire('Deleted!', 'The program has been deleted.', 'success');
              this._fetchData(); // Refresh data after deletion
            },
            error: (error) => {
              Swal.fire('Error!', 'Failed to delete program.', 'error');
              console.error('Error deleting program:', error);
            }
          });
        }
      });
    } else {
      console.error('deleteSwal is undefined');
    }
  }
  
  compare(v1: string | number, v2: string | number): any {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  onSort(event: SortEvent) {
    if (event.direction === '') {
      this._fetchData();
    } else {
      this.records = [...this.records].sort((a, b) => {
        const res = this.compare(a[event.column], b[event.column]);
        return event.direction === 'asc' ? res : -res;
      });
    }
  }

  searchData(searchTerm: string) {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      this.records = this.records.filter((record) =>
        record.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
