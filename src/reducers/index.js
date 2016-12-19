import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import articlesReducer from './articles_reducer';
import activeArticle from './active_article_reducer';
import sourcesReducer from './sources_reducer';

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  articles: articlesReducer,
  activeArticle: activeArticle,
  sources: sourcesReducer
});

export default rootReducer;
