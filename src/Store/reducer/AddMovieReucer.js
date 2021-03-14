


const INITIAL_STATE = {
    movieName: [
        {
          id:1,
          name: 'First Movie',
        },
        {
          id:2,
          name: 'Second Movie',
        }
      ]
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_MOVIE':
          return {
            ...state,
            movieName: [...state.movieName, action.payload]
          };
        case 'DELETE_MOVIE':
          return {
            ...state,
            movieName: state.movieName.filter((e) => e.id !== action.payload)
          };
        default:
          return state;
      }
}