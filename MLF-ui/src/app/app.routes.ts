import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
export const routes: Routes = [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'activate-account',
        component: ActivateAccountComponent
      },
      {
        path: 'article',
        loadChildren: () => import('./modules/article/article-routing.module')
          .then(m => m.articleRoutes)
      }
];




