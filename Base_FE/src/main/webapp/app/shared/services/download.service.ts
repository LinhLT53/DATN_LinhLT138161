import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastService} from 'app/shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private translateService: TranslateService,
    private toastService: ToastService
  ) {
  }

  downloadFile(data) {
    if (!data || !data.body) {
      this.toastService.openWarningToast(this.translateService.instant('common.toastr.messages.info.noDataToExport'));
      return;
    }
    const fileName = data.headers.get('File');
    const link = document.createElement('a');
    const url = URL.createObjectURL(data.body);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
