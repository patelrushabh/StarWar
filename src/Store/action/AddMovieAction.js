export const addMovieAction = (movie) => ({
    type: 'ADD_MOVIE',
    payload: movie
  });

  export const deleteMovieAction = (movId) => ({
    type: 'DELETE_MOVIE',
    payload: movId
  });
  