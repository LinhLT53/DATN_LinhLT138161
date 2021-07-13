import { Component, OnInit } from '@angular/core';
import { SearchChart } from 'app/core/models/chart/searchChart';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HeightService } from 'app/shared/services/height.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'app/shared/services/common.service';
import { BookingRoomApi } from 'app/core/services/booking-room-api/booking-room-api';

@Component({
  selector: 'jhi-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.scss']
})
export class ChartComponentComponent implements OnInit {
  // @ViewChild('chart', {static: true}) chart: ElementRef<HTMLDivElement>;
  date: any;
  object: {
    nam: number;
    quy: number[];
  };
  nam = [
    { value: 2000 },
    { value: 2011 },
    { value: 2012 },
    { value: 2013 },
    { value: 2014 },
    { value: 2015 },
    { value: 2016 },
    { value: 2017 },
    { value: 2018 },
    { value: 2019 },
    { value: 2020 },
    { value: 2021 },
    { value: 2022 },
    { value: 2023 },
    { value: 2024 },
    { value: 2025 },
    { value: 2026 },
    { value: 2027 }
  ];
  maxsize: number;
  quy: number;
  form: FormGroup;
  searchForm: any;
  dataRespone: SearchChart[];
  data: any[];
  title = '<div>Company Hiring Report</div>';
  type = 'ColumnChart';
  dataQuy = [
    { id: 1, name: ' Quý 1' },
    { id: 2, name: 'Quý 2' },
    { id: 3, name: 'Quý 3' },
    {
      id: 4,
      name: 'Quý  4'
    }
  ];
  dataquy1 = [];

  options = {
    // explorer: {axis: 'horizontal', keepInBounds: true},
  };
  /////////test
  columns123 = [
    { type: 'string', label: 'Tên dự án', p: { html: true } },
    { type: 'number', label: 'Tiền Phòng' },
    { type: 'string', role: 'tooltip' },
    { type: 'number', label: 'Tiền Dịch Vụ' },
    { type: 'string', role: 'tooltip' },
    { type: 'number', label: 'Tổng Thu' },
    { type: 'string', role: 'tooltip' }
  ];
  width;
  height;
  withsize = window.innerWidth - 50;
  heighsize = window.innerHeight;
  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private heightService: HeightService,
    private spinner: NgxSpinnerService,
    private bookingRoomApi: BookingRoomApi
  ) {
    this.height = this.heightService.onResizeWithoutFooter();
    $('.page-container').css('background-color', '#ffffff');
    // $('text[text-anchor="middle"]').css('background-color',"#00FF00")
    $('');
  }

  ngOnInit() {
    this.getInit();
    this.buidForm();
    this.form.controls.lstMajorId.setValue([this.quy]);
    this.form.controls.nam.setValue([this.object.nam]);
    this.form.controls.lstQuy.setValue(new Date().getFullYear());
    // this.width = this.chart.nativeElement.clientWidth;
    this.getDataChart();
    this.height = this.height > 500 ? this.height : 500;
    this.data = [
      ['London', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['New York', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['Paris', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['Berlin', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['London', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['New York', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['Paris', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['Berlin', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['London', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['New York', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['Paris', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['Berlin', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['London', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['New York', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['Paris', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa'],
      ['Berlin', 8136000, 'aaa', 8136000, 'aaa', 8136000, 'aaa']
    ];
  }
  private buidForm() {
    this.form = this.formBuilder.group({
      lstMajorId: [],
      nam: Number,
      lstQuy: Number
    });
  }
  getDataChart() {
    let quyNam = this.form.get('lstMajorId').value;
    console.log(this.form.get('lstQuy').value);

    let data = {
      nam: this.form.get('lstQuy').value[0] ? this.form.get('lstQuy').value[0] : this.form.get('lstQuy').value,
      quy: this.form.get('lstMajorId').value.sort()
    };
    this.bookingRoomApi.getChart(data).subscribe(
      res => {
        this.convent(res);
      },
      err => {}
    );
  }
  convent(data) {
    this.data = [];
    data.forEach(element => {
      let row = [
        element.month,
        element.sumService,
        'Tiền dịch vụ : ' + element.sumService,
        element.sumbook,
        'Tiền phòng : ' + element.sumbook,
        element.sum,
        'Tiền thu được : ' + element.sum
      ];
      this.data.push(row);
    });
  }
  getInit() {
    this.object = { nam: 0, quy: [] };
    this.date = new Date();
    this.object.nam = this.date.getFullYear();
    if (this.date.getMonth() < 2) {
      this.quy = 1;
      this.object.quy.push(1);
    }
    if (this.date.getMonth() <= 5 && this.date.getMonth() > 2) {
      this.object.quy.push(2);
      this.quy = 2;
    }
    if (this.date.getMonth() <= 8 && this.date.getMonth() > 5) {
      this.object.quy.push(3);
      this.quy = 3;
    }
    if (this.date.getMonth() <= 11 && this.date.getMonth() > 8) {
      this.object.quy.push(4);
      this.quy = 4;
    }
  }

  ngOnDestroy(): void {
    console.warn('closed');
  }

  button() {
    // this.width = this.chart.nativeElement.clientWidth;
    this.height = this.height > 500 ? this.height : 500;
  }

  onResize() {
    this.heighsize = window.innerHeight - 50;
    this.button();
  }

  next() {
    this.form.controls.lstQuy.setValue(this.form.get('lstQuy').value + 1);
    this.getDataChart();
  }
  xetQuy() {
    let c = '';
    for (let j of this.form.get('lstMajorId').value) {
      if (c !== '') {
        c = c + ',' + j;
      } else {
        c = c + j;
      }
    }
    return c;
  }
  back() {
    this.form.controls.lstQuy.setValue(this.form.get('lstQuy').value - 1);
    this.getDataChart();
  }
  handleClickNam() {
    this.getDataChart();
  }
}
