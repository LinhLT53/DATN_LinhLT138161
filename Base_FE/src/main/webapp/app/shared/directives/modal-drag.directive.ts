import {
  Directive,
  Input,
  NgZone,
  Renderer2,
  HostListener,
  HostBinding,
  OnInit,
  ElementRef,
  OnDestroy
} from '@angular/core';

class Position {
  x: number; y: number;
  constructor(x, y) { this.x = x; this.y = y; }
};
@Directive({
  selector: '[jhiModalDrag]'
})
export class ModalDragDirective implements OnInit,OnDestroy {
  @Input() handle: HTMLElement;
  @HostBinding('style.transform') transform = 'translate3d(0,0,0)';
  private allowDrag = true;
  private moving = false;
  private origin = null;

  // for adding / detaching mouse listeners dynamically so they're not *always* listening
  private moveFunc: Function;
  private clickFunc: Function;

  constructor(private el: ElementRef,
    private zone: NgZone,
    private rend: Renderer2) { }
  ngOnInit() {

    const host = this.el.nativeElement.offsetParent.offsetParent;
    this.el.nativeElement.offsetParent.style.transform = 'translate3d(0,0,0)';
    // applies mousemove and mouseup listeners to the parent component, typically my app componennt window, I prefer doing it like this so I'm not binding to a window or document object

    this.clickFunc = this.rend.listen(host, 'mouseup', () => {
      this.moving = false;
    });

    // uses ngzone to run moving outside angular for better performance
    this.moveFunc = this.rend.listen(host, 'mousemove', ($event) => {
      if (this.moving && this.allowDrag) {
        this.zone.runOutsideAngular(() => {
          event.preventDefault();
          this.moveTo($event.clientX, $event.clientY);
        });
      }
    });
  }
  ngOnDestroy() { 
    if (this.clickFunc ) { this.clickFunc(); }
    if (this.moveFunc )  { this.moveFunc();  }
 }
 
  // parses css translate string for exact px position
  private getPosition(x:number, y:number) : Position {
    const transVal:string[] = this.el.nativeElement.offsetParent.style.transform.split(',');
    const tempX = transVal[0].replace('translate3d(','');
    const tempY = transVal[1].replace('px','')
    const newX = Number(tempX.replace('px',''));
     const newY = Number(tempY);
     return new Position(x - newX, y - newY);
  }
 
  private moveTo(x:number, y:number) : void {
     if (this.origin) {
        this.el.nativeElement.offsetParent.style.transform = this.getTranslate( (x - this.origin.x), (y - this.origin.y) );
     }
  }
 
  private getTranslate(x:number,y:number) : string{
     return 'translate3d('+x+'px,'+y+'px,0px)';
  }
 
   @HostListener('mousedown',['$event'])
   onMouseDown(event: MouseEvent) {
     if (Number(event.button) === 2 || (this.handle !== undefined && event.target !== 
    this.handle)) {
      return;
     }
     else {
      this.moving = true;
      this.origin = this.getPosition(event.clientX, event.clientY);
    }
  } 
  }
