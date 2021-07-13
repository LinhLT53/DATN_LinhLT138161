import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingRoomApi } from 'app/core/services/booking-room-api/booking-room-api';
import { RoomApiServiceService } from 'app/core/services/room-api/room-api-service.service';
import { ServiceService } from 'app/core/services/service/service.service';
import { HeightService } from 'app/shared/services/height.service';
import { ToastService } from 'app/shared/services/toast.service';
import { of, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'jhi-add-book-room',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  @Input() type;
  @Input() id: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() partId: any;
  @Input() status: any;
  @Input() dataRoom: any;
  form: FormGroup;
  height: number;
  title: String;
  searchHuman;
  debouncer5: Subject<string> = new Subject<string>();
  listServiceShow;
  listServiceR = [];
  checkNul = [];
  listServiceDefule = [];
  unitList = [];
  dataIdListConvet = [];
  listServiceTest = [];
  dataShow;
  constructor(
    private heightService: HeightService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private serviceService: ServiceService,
    public activeModal: NgbActiveModal,
    public bookingRoomApi: BookingRoomApi,
    protected router: Router,
    private roomApiService: RoomApiServiceService,
    public datepipe: DatePipe
  ) {}

  async ngOnInit() {
    this.getListService();
    this.buildForm();
  }

  private buildForm() {
    this.title = 'Thêm dịch vụ';
    this.form = this.formBuilder.group({
      id: [this.id],
      code: [],
      status: [1],
      creatDate: [],
      note: [],
      nameHummer: [],
      approvedDate: [],
      listService: this.formBuilder.array([]),
      reason: [],
      bookingroomId: [this.id]
    });
    // this.id=1;
    if (this.id) {
      this.getDetail(this.id);
    } else {
      this.form.get('creatDate').setValue(new Date());
      // this.setCountries(this.listServiceTest)
    }
  }
  getDetail(id) {
    console.log(this.dataRoom);

    this.roomApiService.getInfoBooking(id).subscribe(
      res => {
        if (res) {
          console.log(res.data.listService);
          this.listServiceTest = res.data.listService;
          this.setCountries(this.listServiceTest);
        }
      },
      err => {
        this.toastService.openErrorToast('Error from server');
      }
    );
    this.roomApiService.getPayBooking(id).subscribe(res => {
      if (res) {
        this.dataShow = res;
        console.log(this.dataShow);
      }
    });
  }
  get formControl() {
    return this.form.controls;
  }

  setCountries(data) {
    console.log(this.listServiceShow);

    this.onResize();
    for (const c of data) {
      console.log(c);
      for (const t of this.checkNul) {
        if (!t) {
          return;
        }
        this.onResize();
      }

      this.checkNul.push(true);
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      (<FormArray>this.form.get('listService')).push(
        this.formBuilder.group({
          serviceId: c.serviceId,
          price: c.price,
          quantity: c.quantity,
          total: c.total,
          bookingroomServiceId: c.bookingroomServiceId,
          bookingId: this.id
        })
      );
    }

    setTimeout(() => {
      for (const c of data) {
        for (const p of this.listServiceShow) {
          if (p.serviceId === c.serviceId) {
            p.disabled = true;
          }
        }
      }
    }, 100);

    // this.form.controls["listDeviceR"].setValue(data)
    this.listServiceR = data;
  }

  onResize() {
    this.height = this.heightService.onResizeWithoutFooter();
  }

  displayFieldHasError(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }
  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }
  trimSpace(element) {
    const value = this.getValueOfField(element);
    if (value) {
      this.setValueToField(element, value.trim());
    }
  }
  setValueToField(item, data) {
    this.form.get(item).setValue(data);
  }

  getValueOfField(item) {
    return this.form.get(item).value;
  }
  onCancel() {
    this.activeModal.dismiss();
  }
  onCancelModal(conten) {}
  onSubmit() {
    let data = this.form.value;
    console.log(data);

    this.bookingRoomApi.addService(data).subscribe(
      value => {
        this.toastService.openSuccessToast('Xác nhận phiếu yêu nhập kho thành công !');

        this.router.navigate(['system-categories/book-room']);
        this.activeModal.dismiss();
      },
      error => {
        this.toastService.openErrorToast('Xác nhận phiếu yêu nhập kho thất bại !');
        this.activeModal.dismiss();
      }
    );
  }
  saveDevice(i) {
    this.checkNul[i] = !this.checkNul[i];
    this.xetTrueFal(this.form.get('listService').value);
  }
  xetTrueFal(data1) {
    console.log(data1);

    if (data1.length === 0) {
      for (const p of this.listServiceDefule) {
        p.disabled = false;
      }
    } else {
      for (const p of this.listServiceShow) {
        p.disabled = false;
      }
      for (const c of data1) {
        for (const p of this.listServiceShow) {
          if (p.serviceId === c.serviceId) {
            p.disabled = true;
          }
        }
      }
    }
  }
  xetGia(event, i) {
    console.log(event.target.value);
    this.listServiceR[i].quantity = event.target.value;
    this.listServiceR[i].total = event.target.value > 0 ? this.listServiceR[i].price * event.target.value : null;
    this.form.controls['listService'].setValue(this.listServiceR);
  }
  getPrice(event, i) {
    console.log(event);
    console.log(i);
    console.log(this.checkNul);
    if (event !== undefined) {
      this.listServiceR[i].serviceId = event.serviceId ? event.serviceId : null;
      this.listServiceR[i].price = event.price ? event.price : null;
      this.listServiceR[i].quantity = event.quantity;
      this.listServiceR[i].total = event.quantity > 0 ? event.price * event.quantity : null;
      this.form.controls['listService'].setValue(this.listServiceR);
    } else {
      this.listServiceR[i].price = null;
      this.listServiceR[i].quantity = null;
      this.listServiceR[i].total = null;
      this.listServiceR[i].serviceId = null;
      this.form.controls['listService'].setValue(this.listServiceR);
    }
    this.xetTrueFal(this.form.controls['listService'].value);
  }

  onSearHuman(event) {
    this.searchHuman = event.term;
    const term = event.term;
    if (term !== '') {
      this.debouncer5.next(term);
    } else {
      this.listServiceShow = of([]);
    }
  }

  getListService() {
    this.serviceService.getAllService().subscribe(
      res => {
        if (res) {
          this.listServiceShow = res.data;
          console.log(this.listServiceShow);
        } else {
          this.listServiceShow = [];
        }
      },
      err => {
        this.listServiceShow = [];
      }
    );
  }

  onSearchHuman() {
    if (!this.form.value.parentName) {
      this.listServiceShow = of([]);
      this.searchHuman = '';
    }
  }

  customSearchHunan(term: string, item: any): any {
    term = term.toLocaleLowerCase().trim();
    return (
      (item.servicename ? item.servicename.toLocaleLowerCase().indexOf(term) > -1 : ''.indexOf(term)) ||
      (item.servicecode ? item.servicecode.toLocaleLowerCase().indexOf(term) > -1 : ''.indexOf(term))
    );
  }

  onClearHuman() {
    this.listServiceShow = of([]);
    this.searchHuman = '';
  }

  addService(value) {
    for (const t of this.checkNul) {
      if (!t) {
        return;
      }
      this.onResize();
    }

    this.checkNul.push(value);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    (<FormArray>this.form.get('listService')).push(
      this.formBuilder.group({
        serviceId: [],
        price: [],
        quantity: [0],
        total: [],
        bookingId: this.id,
        bookingroomServiceId: 0
      })
    );
    this.listServiceR = this.form.get('listService').value;
  }
  deleteDevice(i) {
    this.checkNul.splice(i, 1);
    console.log('vao day');

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    (<FormArray>this.form.get('listService')).removeAt(i);
    this.listServiceR = this.form.get('listService').value;
    this.xetTrueFal(this.form.get('listService').value);
  }

  addDevice(i) {}

  xetDataDefile(event, i) {
    if (event !== undefined) {
      this.listServiceR[i].unit = event.unit ? this.xetUntit(event.unit) : null;
      this.listServiceR[i].idGroup = event.id;
      this.listServiceR[i].size = event.sizeWarhous ? event.sizeWarhous : null;
      this.listServiceR[i].unit = event.unit ? event.unit : null;

      this.form.controls['listDevice'].setValue(this.listServiceR);
      this.xetTrueFal(this.form.controls['listDevice'].value);
    } else {
      this.listServiceR[i].unit = null;
      this.listServiceR[i].idGroup = null;
      this.listServiceR[i].size = null;

      this.form.controls['listDevice'].setValue(this.listServiceR);
    }
  }

  xetUntit(unit) {
    const c = this.unitList.filter(function(value) {
      return value.id === unit;
    });
    return c[0].name;
  }
}
