import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AccessService } from 'src/app/core/service/access.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accesses-index',
  templateUrl: './accesses-index.component.html',
  styleUrl: './accesses-index.component.scss'
})
export class AccessesIndexComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  records: any[] = [];
  columns: Column[] = [];

  pageSizeOptions: number[] = [10, 25, 50, 100];

  @ViewChild('deleteSwal') deleteSwal!: SwalComponent;
  constructor(
              private accessService: AccessService, 
              private router: Router
            ) {}
  ngOnInit() {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Access', path: '', active: true },
    ];
    this.initTableConfig();
    this._fetchData();
  }

  private _fetchData() {
    this.accessService.getAccesses().subscribe(
      (data) => {
        this.records = data;
        console.log(this.records);
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }

    initTableConfig() {
      this.columns = [
        {
          name: 'nameAccess',
          label: 'Name Access',
          formatter: (record: any) => record.nameAccess,
          width: 700,
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

  editRecord(id: number) {
    this.router.navigate([`/access/edit`, id]);
  }
  deleteRecord(id: number) {
    if (this.deleteSwal) {
      this.deleteSwal.fire().then((result) => {
        if (result.isConfirmed) {
          this.accessService.deleteAccess(id).subscribe({
            next: () => {
              Swal.fire('Deleted!', 'The batch has been deleted.', 'success');
              this._fetchData(); // Refresh data after deletion
            },
            error: (error) => {
              Swal.fire('Error!', 'Failed to delete batch.', 'error');
              console.error('Error deleting batch:', error);
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
          record.nameBatch.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
}
