import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DataFormatService {

  constructor() {
  }

  moneyFormat(value) {
    return value ? Math.floor(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0';
  }

  numberFormat(value) {
    if (value === 0) {
      return '0';
    }
    return value ? parseFloat(value).toString() : '';
  }

  parseMoneyToValue(val) {
    if (typeof val === 'string') {
      return parseFloat(val.replace(/,/g, ''));
    }
    return val;
  }

  parseTimestampToDate(num) {
    return num ? moment(new Date(num)).format('DD/MM/YYYY') : '';
  }

  parseTimestampToDateString(num) {
    // 2019-Mar-12
    return num ? moment(new Date(num)).format('DD-MMM-YYYY') : '';
  }

  parseTimestampToDateBasic(num) {
    return num ? moment(new Date(num)).format('DD/MM/YYYY') : '';
  }

  parseTimestampToFullDate(num) {
    return num ? moment(new Date(num)).format('DD/MM/YYYY, HH:mm:ss') : '';
  }

  parseTimestampToHourMinute(num) {
    return num ? moment(new Date(num)).format('HH:mm') : '';
  }

  parseTimestampToYear(num) {
    return num ? moment(new Date(num)).format('YYYY') : '';
  }

  parseTimestampToFullDay(num) {
    return num ? moment(new Date(num)).format('HH:mm A DD/MM/YYYY') : '';
  }

  formatDate(date) {
    if (date) {
      let convertDate;
      if (typeof date === 'string' && date.length === 1) {
        return date;
      }
      if (typeof date === 'string' && date.includes('năm')) {
        return moment(date, 'LLL', 'vi').valueOf();
      }
      // convertDate = new Date(date);
      return convertDate ? convertDate.getTime() : '';
    }
    return '';
  }

  formatMonth(date) {
    if (date) {
      const convertDate = new Date(date);
      const formattedMonth = convertDate.getMonth() < 9 ? `0${convertDate.getMonth() + 1}` : convertDate.getMonth() + 1;
      return convertDate ? `${formattedMonth}/${convertDate.getFullYear()}` : '';
    }
    return '';
  }

  formatHoursSecond(seconds) {
    if (seconds && seconds > 0) {
      const hours = Math.floor(seconds / 3600) < 10 ? `0${Math.floor(seconds / 3600)}` : Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60) < 10 ? `0${Math.floor((seconds % 3600) / 60)}` : Math.floor((seconds % 3600) / 60);
      // const second = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
      return `${hours}:${minutes}`;
    } else if (seconds === 0) {
      return `00:00`;
    } else if (!seconds) {
      return '';
    }
  }

  convertIdToValue(selectedId: number, valueArr, selectedField?) {
    if (selectedId) {
      const matchAddress = valueArr.find(value => selectedId === value.id);
      const displayField = selectedField ? selectedField : 'value';
      return matchAddress ? matchAddress[displayField] : selectedId;
    }
    return '';
  }

  formatFilterDescription(fieldName, filterFieldArr) {
    if (fieldName) {
      const matchAddress = filterFieldArr.find(value => fieldName === value.fieldName);
      return matchAddress ? matchAddress.fieldDescription : fieldName;
    }
    return '';
  }

  formatMoney(val) {
    if (val) {
      if (typeof val === 'string') {
        let num = val.trim().replace(/,([0-9]{3})/g, '$1');
        if (parseFloat(num).toString() === num) {
          return parseFloat(num).toLocaleString();
        }
        num = val.trim().replace(/,/g, '');
        const NUMBER_REGEX = /^([0-9]*)$/g;
        if (NUMBER_REGEX.test(num)) {
          return parseFloat(num).toLocaleString();
        }
        return val;
      } else {
        const num = val.toString().replace(/,/g, '');
        return parseFloat(num) ? parseFloat(num).toLocaleString() : val;
      }
    }
    return 0;
  }

  formatQty(val) {
    if (val) {
      if (typeof val === 'string') {
        let num = val.trim().replace(/,([0-9]{1})/g, '$1');
        if (parseFloat(num).toString() === num) {
          return parseFloat(num).toLocaleString();
        }
        num = val.trim().replace(/,/g, '');
        const NUMBER_REGEX = /^([0-9]*)$/g;
        if (NUMBER_REGEX.test(num)) {
          return parseFloat(num).toLocaleString();
        }
        return val;
      } else {
        const num = val.toString().replace(/,/g, '');
        return parseFloat(num) ? parseFloat(num).toLocaleString() : val;
      }
    }
    return null;
  }

  formatMoneyForm(form: FormGroup, field) {
    form.controls[field].setValue(this.formatMoney(form.controls[field].value));
  }

  convertToDate(fromType, date) {
    if (fromType === 'dd/mm/yyyy') {
      const temp = date.split(/\//);
      if (temp.length < 3) {
        return '';
      } else if (temp.length === 3) {
        const newDate = new Date(([temp[1], temp[0], temp[2]]).join('/'));
        newDate.setHours(12);
        return newDate;
      }
    }
  }

  before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
      ? false : one.day < two.day : one.month < two.month : one.year < two.year;

  equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

  after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
      ? false : one.day > two.day : one.month > two.month : one.year > two.year;


}
