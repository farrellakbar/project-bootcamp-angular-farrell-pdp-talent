import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinancialService } from 'src/app/core/service/financial.service';
import { ScheduleService } from 'src/app/core/service/schedule.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-financials-detail',
  templateUrl: './financials-detail.component.html',
  styleUrl: './financials-detail.component.scss'
})
export class FinancialsDetailComponent implements OnInit{
  pageTitle: BreadcrumbItem[] = [];
  scheduleDetail: any = null;
  scheduleId: number = 0;

  userColumns = [
    {
      name: 'email',
      label: 'User Email',
      formatter: (record: any) => record.email,
    },
    {
      name: 'costPerUser',
      label: 'Cost Per User',
      formatter: (record: any) => record.costPerUser.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private scheduleService: FinancialService
  ) {}
  ngOnInit(): void {
    this.scheduleId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchScheduleDetail(this.scheduleId);
    
    this.pageTitle = [
      { label: 'Financials', path: '/admin/financials' },
      { label: 'Detail', path: '', active: true },
    ];
  }

  fetchScheduleDetail(id: number): void {
    this.scheduleService.getScheduleDetail(id).subscribe({
      next: (data) => {
        this.scheduleDetail = data; // Simpan data detail
      },
      error: (err) => {
        console.error('Error fetching schedule details:', err);
      },
    });
  }

}
