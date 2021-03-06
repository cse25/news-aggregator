import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import articlesReducer from './articles_reducer';
import activeArticle from './active_article_reducer';
import sourcesReducer from './sources_reducer';
import generalSourcesReducer from './sources_general_reducer';
import technologySourcesReducer from './sources_technology_reducer';
import sportSourcesReducer from './sources_sport_reducer';
import businessSourcesReducer from './sources_business_reducer';
import entertainmentSourcesReducer from './sources_entertainment_reducer';
import scienceAndNatureSourcesReducer from './sources_science-and-nature_reducer';
import gamingSourcesReducer from './sources_gaming_reducer';
import musicSourcesReducer from './sources_music_reducer';
import favorites from './sources_favorites_reducer';
import storeSelectedSourceReducer from './store_selected_source';

const appReducer = combineReducers({
  form: form,
  auth: authReducer,
  articles: articlesReducer,
  activeArticle: activeArticle,
  sources: sourcesReducer,
  favorites: favorites,
  generalSources: generalSourcesReducer,
  technologySources: technologySourcesReducer,
  sportSources: sportSourcesReducer,
  businessSources: businessSourcesReducer,
  entertainmentSources: entertainmentSourcesReducer,
  scienceAndNatureSources: scienceAndNatureSourcesReducer,
  gamingSources: gamingSourcesReducer,
  musicSources: musicSourcesReducer,
  selectedSource: storeSelectedSourceReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'unauth_user') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
