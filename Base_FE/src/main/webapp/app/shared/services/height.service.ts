import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeightService {

  setMenuHeight() {
    return window.innerHeight - 100;
  }

  onResizeWithoutFooter() {
    return window.innerHeight - 120;
  }
  onResizeWithoutLeft() {
    return window.innerWidth - 120;
  }

  onResizeHeight170Px() {
    return window.innerHeight - 170;
  }

  onResize() {
    return window.innerHeight - 200;
  }

  onResizeTab() {
    return window.innerHeight - 230;
  }

  onResizeHeight280Px() {
    return window.innerHeight - 280;
  }

  onResizeHeight310Px() {
    return window.innerHeight - 310;
  }
  onResizeHeight20Px() {
    return window.innerHeight - 120;
  }
  onResizeHeight360Px() {
    return window.innerHeight - 360;
  }

  onResizeHeight380Px() {
    return window.innerHeight - 380;
  }

  onResizeHeight400Px() {
    return window.innerHeight - 400;
  }

}
