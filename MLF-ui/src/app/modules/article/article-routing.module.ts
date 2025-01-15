import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {ArticleListComponent} from "./pages/article-list/article-list.component";
import {AddArticleComponentComponent} from "./pages/add-article-component/add-article-component.component";
import {ArticleVisualizationComponent} from "./pages/article-visualization/article-visualization.component";
import {ArchivedArticlesListComponent} from "./pages/archived-articles-list/archived-articles-list.component";
import {LearningPathComponent} from "./pages/learning-path/learning-path.component";


export const articleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [

      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'my-articles',
        component: ArticleListComponent
      },
      {
        path: 'add-article',
        component: AddArticleComponentComponent
      },
      {
        path: 'learning-path',
        component: LearningPathComponent
      },
      {
        path: 'visualize-by-topic',
        component: ArticleVisualizationComponent
      },
      {
        path: 'archived-articles',
        component: ArchivedArticlesListComponent
      },
    ]
  }
];

