import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { BoardComponent } from './board/board.component';
import { VotoComponent } from './voto/voto.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'board/:board', component: BoardComponent
  },
  {
    path: 'voto/:voto', component: VotoComponent
  },
  {
    path: ':room', component: RoomComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
