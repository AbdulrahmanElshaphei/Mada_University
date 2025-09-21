import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VisionMissionComponent } from './pages/vision-mission/vision-mission.component';
import { TeamComponent } from './pages/team/team.component';
import { CredentialingComponent } from './pages/credentialing/credentialing.component';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'vision_Mission', component: VisionMissionComponent },
    { path: 'team', component: TeamComponent },
    { path: 'credentialing', component: CredentialingComponent },
    { path: "notFound", component: NotFoundComponent },



    { path: "**", component: NotFoundComponent },
];
