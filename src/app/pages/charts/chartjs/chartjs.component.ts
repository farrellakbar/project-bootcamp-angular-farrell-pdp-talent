import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ChartjsOptions } from './chartjs.model';
import { BARCHART, DONUTCHART, LINECHART, PIECHART, POLARCHART, RADARCHART } from './data';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  DoughnutController,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js'
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  LineElement,
  BarController,
  DoughnutController,
  ArcElement,
  PolarAreaController,
  RadialLinearScale,
  PieController,
  RadarController
)
@Component({
  selector: 'app-charts-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  //chart config
  lineChartOptions!: ChartjsOptions<'line'>;
  barChartOptions!: ChartjsOptions<'bar'>;
  pieChartOptions!: ChartjsOptions<'pie'>;
  donutChartOptions!: ChartjsOptions<'doughnut'>;
  polarChartOptions!: ChartjsOptions<'polarArea'>;
  radarChartOptions!: ChartjsOptions<'radar'>;


  @ViewChild('barChart', { static: true }) barChart!: ElementRef;

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Charts', path: '/' }, { label: 'Chartjs', path: '/', active: true }];
    this.initCharts();
  }

  /**
   * initialize charts
   */
  initCharts(): void {
    this.lineChartOptions = LINECHART;

    // create gradient
    const ctx = this.barChart.nativeElement.getContext('2d');
    var gradientStroke = ctx.createLinearGradient(0, 500, 0, 150);
    gradientStroke.addColorStop(0, "#fa5c7c");
    gradientStroke.addColorStop(1, "#727cf5");

    this.barChartOptions = BARCHART;
    this.barChartOptions.datasets![0].backgroundColor = gradientStroke;
    this.barChartOptions.datasets![0].borderColor = gradientStroke;
    this.barChartOptions.datasets![0].hoverBackgroundColor = gradientStroke;
    this.barChartOptions.datasets![0].hoverBorderColor = gradientStroke;

    this.pieChartOptions = PIECHART;
    this.donutChartOptions = DONUTCHART;
    this.polarChartOptions = POLARCHART;
    this.radarChartOptions = RADARCHART;

  }

}
