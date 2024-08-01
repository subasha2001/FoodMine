import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
    {component:HomeComponent, path: ''},
    {path: 'search/:searchTerm', component: HomeComponent}
];
