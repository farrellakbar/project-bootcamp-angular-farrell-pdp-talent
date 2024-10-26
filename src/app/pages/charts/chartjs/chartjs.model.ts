import { ChartOptions, ChartTypeRegistry } from 'chart.js';

export interface ChartjsOptions<TType extends keyof ChartTypeRegistry> {
    type: TType;
    chartLabels?: string[];
    datasets?: any[];
    chartOptions?: ChartOptions<TType>;
}