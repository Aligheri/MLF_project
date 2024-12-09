import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {HomeComponent} from "./modules/article/pages/home/home.component";
import {AboutComponent} from "./modules/article/pages/about/about.component";
import {ArticleListComponent} from "./modules/article/pages/article-list/article-list.component";
import {AddArticleComponentComponent} from "./modules/article/pages/add-article-component/add-article-component.component";
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




