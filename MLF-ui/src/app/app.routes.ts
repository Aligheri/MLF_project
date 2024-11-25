import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {HomeComponent} from "./modules/pages/home/home.component";
import {AboutComponent} from "./modules/pages/about/about.component";
import {ArticleListComponent} from "./modules/pages/article-list/article-list.component";

// export const routes: Routes = [
//   {path: 'login', component: LoginComponent},
//   {path: 'register', component: RegisterComponent},
//   {path: 'activate-account', component: ActivateAccountComponent},
//   {path: 'home', component: HomeComponent},
//   {path: 'about', component: AboutComponent},
//   {path: 'my-articles', component:ArticleListComponent},
//   {path: 'article', loadChildren: () => import('./modules/article/article.module')
//       .then(m => m.ArticleModule)}
// ];
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
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
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'my-articles',
        component: ArticleListComponent
      },
      {
        path: 'article',
        loadChildren: () => import('./modules/article/article.module')
          .then(m => m.ArticleModule)
      }
    ]
  }
];




