import { Routes } from '@angular/router';
import { RightSectionComponent } from './pages/right-section/right-section.component';
import { MessageComponent } from './pages/message/message.component';

export const routes: Routes = [
    {path:'',component:RightSectionComponent},
    {path:'message/:id',component:MessageComponent},
];
