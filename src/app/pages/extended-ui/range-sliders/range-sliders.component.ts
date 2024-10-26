import { Component, OnInit } from "@angular/core";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { SLIDERVARIANTS } from "./data";
import { SliderItem } from "./rangeslider.model";
import { Options } from "@angular-slider/ngx-slider";
@Component({
  selector: "app-extended-ui-range-sliders",
  templateUrl: "./range-sliders.component.html",
  styleUrls: ["./range-sliders.component.scss"],
})
export class RangeSlidersComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  rangeSliders: SliderItem[] = [];
  sliderVariants: SliderItem[] = SLIDERVARIANTS;

  constructor() {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Extended UI", path: "/" },
      { label: "Range Slider", path: "/", active: true },
    ];

    this.initializeSliders();
  }

  initializeSliders(): void {
    this.sliderVariants.forEach((slider) => {
      if (slider.minValue === undefined && slider.default !== undefined) {
        slider.minValue = slider.default;
      } else if (slider.minValue === undefined) {
        slider.minValue = 0;
      }

      if (slider.maxValue === undefined) {
        slider.maxValue = slider.default !== undefined ? slider.default : 0;
      }

      if (slider.default === undefined) {
        slider.default = 0;
      }
    });
  }
}
