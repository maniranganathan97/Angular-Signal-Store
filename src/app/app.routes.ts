import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MyNewComponent } from './my-new/my-new.component';
import { MyHomeComponent } from './my-home/my-home.component';

export const routes: Routes = [
  {
    path: '',
    component: MyHomeComponent
  },

  {
    path: 'new',
    component: MyNewComponent
  }
];
