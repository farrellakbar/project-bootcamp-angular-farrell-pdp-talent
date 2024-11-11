import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProgramService } from 'src/app/core/service/program.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programs-index',
  templateUrl: './programs-index.component.html',
  styleUrl: './programs-index.component.scss'
})
export class ProgramsIndexComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  records: any[] = [];
  columns: Column[] = [];

  pageSizeOptions: number[] = [10,25, 50,100];

  @ViewChild('deleteSwal') deleteSwal!: SwalComponent;
  constructor(
    private programService: ProgramService, 
    private router: Router
) { }
  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Program', path: '', active: true },
    ];
    this.initTableConfig();
    this._fetchData();
  }

  private _fetchData() {
    this.programService.getPrograms().subscribe(
      (data) => {
        this.records = data;
        console.log(this.records);
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

    initTableConfig() {
      this.columns = [
        {
          name: 'nameProgram',
          label: 'Name Program',
          formatter: (record: any) => record.nameProgram,
          width: 700,
        },
        {
          name: 'priceForecasts',
          label: 'Price Forecasts',
          formatter: (record: any) => "Rp. " + record.priceForecasts,
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
    this.router.navigate([`/unit/edit`, id]);
  }
  deleteRecord(id: number) {
    if (this.deleteSwal) {
      this.deleteSwal.fire().then((result) => {
        if (result.isConfirmed) {
          this.programService.deleteProgram(id).subscribe({
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
          record.nameBatch.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
}
