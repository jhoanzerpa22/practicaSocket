import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, Inject, ViewChild, Input, NgZone,ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { SocketWebService } from '../services/socket-web.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  
  board: string;
  
  private tablero: any = [];
  tablero2: any = [];

  public filteredTablero: ReplaySubject<[]> = new ReplaySubject<[]>(1);

  private _onDestroy = new Subject<void>();

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.writeBoard();
  }

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private socketWebService: SocketWebService
  ) {
    this.socketWebService.outEven.subscribe(res => {
      console.log('escucha',res);
      const { tablero } = res;
      this.readBoard(tablero, false);
    });
   }

  ngOnInit(): void {
    
    this.tablero.push({'title': 'Tablero 1', "data": ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']});
    this.tablero.push({'title': 'Tablero 2', "data": ['Get to work2', 'Pick up groceries2', 'Go home2', 'Fall asleep2']});
    this.tablero2 = JSON.stringify(this.tablero);
    this.filteredTablero.next(this.tablero.slice());
    this.board = this.route.snapshot.paramMap.get('board');
    this.cookieService.set('board', this.board)
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private setInitialValue() {
    this.filteredTablero
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
      });
  }

  private writeBoard(){
    console.log('writeBoard');
    this.socketWebService.emitEvent({tablero: JSON.stringify(this.tablero)});
  }

  private readBoard(tablero: any, emit: boolean){
    const data = JSON.parse(tablero);
    console.log('data',data);
    this.tablero = [];
    for(let c in data){
      this.tablero.push({'title': data[c].title, "data": data[c].data});
    }
    console.log('tablero_all', this.tablero);
    this.tablero2 = JSON.stringify(this.tablero);
    
    this.filteredTablero.next(this.tablero.slice());
  }

}
