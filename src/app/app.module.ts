import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
// import { SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { VotoComponent } from './voto/voto.component';
import { BoardComponent } from './board/board.component';
import { RoomComponent } from './room/room.component';
import { HomeComponent } from './home/home.component';
import { DrawComponent } from './draw/draw.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule} from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';

import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HomeComponent,
    DrawComponent,
    BoardComponent,
    VotoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSortModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatDividerModule,
        MatMenuModule,
        MatRadioModule,
        DragDropModule,
    // SocketIoModule
    SocketIoModule.forRoot(config)

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
