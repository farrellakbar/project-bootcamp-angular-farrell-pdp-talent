import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { catchError } from 'rxjs';
import { BatchService } from 'src/app/core/service/batch.service';
// import { AdvancedTable } from 'src/app/pages/tables/advance/advance.model';
// import { tableData } from 'src/app/pages/tables/advance/data';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-batchs-index',
  templateUrl: './batchs-index.component.html',
  styleUrl: './batchs-index.component.scss'
})
export class BatchsIndexComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  records: any[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];

  batchs: any[] = [];

  @ViewChild('deleteSwal') deleteSwal!: SwalComponent;
  constructor(private batchService: BatchService, private router: Router) {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Batch', path: '', active: true },
    ];
    this.initTableConfig();
    this._fetchData();
    console.log('aaa'+this._fetchData());

  }
  private _fetchData(): void {
    this.batchService.getBatches().subscribe(
      (data) => {
        this.records = data;
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }
  //OPEN INITIALIZE TABLE CONFIGURATION
    initTableConfig(): void {
      this.columns = [
        {
          name: 'nameBatch',
          label: 'Name Batch',
          formatter: (record: any) => record.nameBatch,
          width: 245,
        },
        {
          name: 'totalBudget',
          label: 'Total Budget',
          formatter: (record: any) => record.totalBudget,
        },
        {
          name: 'allocatedBudget',
          label: 'Allocated Budget',
          formatter: (record: any) => record.allocatedBudget,
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
    this.router.navigate([`/batch/edit`, id]);
  }
  deleteRecord(id: number): void {
    if (this.deleteSwal) {
      this.deleteSwal.fire().then((result) => {
        if (result.isConfirmed) {
          this.batchService.deleteBatch(id).subscribe({
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
  onSort(event: SortEvent): void {
    if (event.direction === '') {
      this._fetchData();
    } else {
      this.records = [...this.records].sort((a, b) => {
        const res = this.compare(a[event.column], b[event.column]);
        return event.direction === 'asc' ? res : -res;
      });
    }
  }

  //OPEN SEARCH DATA TABLE
    searchData(searchTerm: string): void {
      if (searchTerm === '') {
        this._fetchData();
      }
      else {
        this.records = this.records.filter((record) =>
          record.nameBatch.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
  //CLOSE SEARCH DATA TABLE
}
