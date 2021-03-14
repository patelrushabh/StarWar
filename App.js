import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger  from 'redux-logger'
import ReduxThunk from 'redux-thunk';
import MainReducer from './src/Store/MainReducer';
import MainRouteConfig from './src/Navigation'
import Loader from './src/Components/Loader/Loader';

export const store = createStore(
  MainReducer,
  applyMiddleware(ReduxThunk, logger),
);


export default function App() {
  return (
    <Provider store={store}>
     <SafeAreaView style={{ flex: 1}}>
       <Loader/>
       <MainRouteConfig  store={store}/>
     </SafeAreaView>
  </Provider>
  )
}
