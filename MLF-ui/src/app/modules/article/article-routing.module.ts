import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {ArticleListComponent} from "./pages/article-list/article-list.component";
import {AddArticleComponentComponent} from "./pages/add-article-component/add-article-component.component";
import {TopicVisualizationComponent} from "./pages/topic-visualization/topic-visualization.component";
import {ArchivedArticlesListComponent} from "./pages/archived-articles-list/archived-articles-list.component";
import {LearningPathComponent} from "./pages/learning-path/learning-path.component";
import {authGuard} from "../../services/guard/auth.guard";


export const articleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'about',
        component: AboutComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-articles',
        component: ArticleListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add-article',
        component: AddArticleComponentComponent,
        canActivate: [authGuard]
      },
      {
        path: 'learning-path',
        component: LearningPathComponent,
        canActivate: [authGuard]
      },
      {
        path: 'visualize-by-learningPath',
        component: TopicVisualizationComponent,
        canActivate: [authGuard]
      },
      {
        path: 'archived-articles',
        component: ArchivedArticlesListComponent,
        canActivate: [authGuard]
      },
    ]
  }
];

