import { combineReducers } from 'redux';
import AddMovieReucer from './reducer/AddMovieReucer';
import CommonReducer from './reducer/CommonReducer';
import MovieDataReducer from './reducer/MovieDataReducer';

export default combineReducers({
  CommonReducer: CommonReducer,
  MovieDataReducer: MovieDataReducer,
  AddMovieReducer: AddMovieReucer
});

