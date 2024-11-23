import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FinancialService } from 'src/app/core/service/financial.service';
import { ScheduleService } from 'src/app/core/service/schedule.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-financials-index',
  templateUrl: './financials-index.component.html',
  styleUrl: './financials-index.component.scss'
})
export class FinancialsIndexComponent {
  pageTitle: BreadcrumbItem[] = [];
  records: any[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];
  //Ini tuh form simpan is done
  selectedRecordId: number | null = null; 
  allocatedBudget: number = 0;

  @ViewChild('deleteSwal') deleteSwal!: SwalComponent;


  constructor(
      private modalService: NgbModal,
      private scheduleService: ScheduleService, 
      private financialService: FinancialService, 
      private router: Router

  ) { }
  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Financials', path: '', active: true }
    ];
    this._fetchData();
    this.initTableCofig();
  }
  private _fetchData() {
    this.scheduleService.getSchedulesActive().subscribe(
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
          name: 'nameProgram',
          label: 'Program Name',
          formatter: (record: any) => record.respProgramDTO.nameProgram,
        },
        {
          name: 'startDate',
          label: 'Start Date',
          formatter: (record: any) => record.dateStart,
        },
        {
          name: 'endDate',
          label: 'End Date',
          formatter: (record: any) => record.dateEnd,
        },
        {
          name: 'duration',
          label: 'Duration',
          formatter: (record: any) => record.duration,
        },
        {
          name: 'actions',
          label: 'Actions',
          formatter: () => '',
        },
      ];
    }
  //CLOSE INITIALIZE TABLE CONFIGURATION
  detailRecord(id: number) {
    this.router.navigate([`detail`, id]);
  }
  openCalculateModal(modal: any, recordId: number) {
    this.selectedRecordId = recordId; // Simpan ID record yang dipilih
    this.modalService.open(modal, { centered: true });
  }

  saveAllocatedBudget(modal: any) {
    if (this.selectedRecordId === null) return;

    const payload = {
      'allocated-budget': this.allocatedBudget,
    };

    this.scheduleService.doneSchedule(this.selectedRecordId, payload).subscribe({
      next: () => {
        this.modalService.dismissAll(); 
        this._fetchData(); 
        Swal.fire('Success!', 'Allocated budget updated successfully.', 'success');
      },
      error: (err) => {
        console.error('Error updating allocated budget:', err);
        Swal.fire('Error!', 'Failed to update allocated budget.', 'error');
      }
    });
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
