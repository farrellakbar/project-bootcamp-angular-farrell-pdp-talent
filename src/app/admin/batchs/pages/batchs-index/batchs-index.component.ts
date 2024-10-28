import { Component, OnInit } from '@angular/core';
import { AdvancedTable } from 'src/app/pages/tables/advance/advance.model';
import { tableData } from 'src/app/pages/tables/advance/data';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-batchs-index',
  templateUrl: './batchs-index.component.html',
  styleUrl: './batchs-index.component.scss'
})
export class BatchsIndexComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  records: AdvancedTable[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];

  ngOnInit(): void {
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Batchs', path: '', active: true }
    ];
    this._fetchData();
    this.initTableCofig();
  }
    _fetchData(): void {
      this.records = tableData;
    }
  //OPEN INITIALIZE TABLE CONFIGURATION
    initTableCofig(): void {
      this.columns = [
        {
          name: 'name',
          label: 'Name',
          formatter: (record: AdvancedTable) => record.name,
          width: 245,
        },
        {
          name: 'position',
          label: 'Position',
          formatter: (record: AdvancedTable) => record.position,
          width: 360,
        },
        {
          name: 'office',
          label: 'Office',
          formatter: (record: AdvancedTable) => record.office,
          width: 180
        },
        {
          name: 'age',
          label: 'Age',
          formatter: (record: AdvancedTable) => record.age,
        },
        {
          name: 'date',
          label: 'Date',
          formatter: (record: AdvancedTable) => record.date,
        },
        {
          name: 'salary',
          label: 'Salary',
          formatter: (record: AdvancedTable) => record.salary,

        }
      ];
    }
  //CLOSE INITIALIZE TABLE CONFIGURATION
  compare(v1: string | number, v2: string | number): any {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
  onSort(event: SortEvent): void {
    if (event.direction === '') {
      this.records = tableData;
    } else {
      this.records = [...this.records].sort((a, b) => {
        const res = this.compare(a[event.column], b[event.column]);
        return event.direction === 'asc' ? res : -res;
      });
    }
  }
  matches(row: AdvancedTable, term: string) {
    return row.name.toLowerCase().includes(term)
      || row.position.toLowerCase().includes(term)
      || row.office.toLowerCase().includes(term)
      || String(row.age).includes(term)
      || row.date.toLowerCase().includes(term)
      || row.salary.toLowerCase().includes(term);
  }

  //OPEN SEARCH DATA TABLE
    searchData(searchTerm: string): void {
      if (searchTerm === '') {
        this._fetchData();
      }
      else {
        let updatedData = tableData;

        //  filter
        updatedData = updatedData.filter(record => this.matches(record, searchTerm));
        this.records = updatedData;
      }
    }
  //CLOSE SEARCH DATA TABLE
}
