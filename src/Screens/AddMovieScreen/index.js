import React, { useState } from 'react';
import {View, TextInput, Text, Button, SafeAreaView} from 'react-native'
import { addMovieAction } from '../../Store/action/AddMovieAction';
import { useDispatch , useSelector} from 'react-redux';
import { deleteMovieAction } from '../../Store/action/AddMovieAction';
import normalize from '../../Common/FontSize';

const AddMovieScreen = () => {
  const [movie, setMovie] = useState('');
  const [id, setId] = useState(3);
  const dispatch = useDispatch();

  const addMovieName = (tex) => dispatch(addMovieAction(tex));

  const {movieName } = useSelector(state => ({
    movieName: state.AddMovieReducer.movieName,
  }));

  const deleteMovie = (id) => dispatch(deleteMovieAction(id));

  const onChange = (text) => {
    setMovie(text);
  };


  const onSubmit = () => {
    setId(id + 1 )
    if (movie.trim() === '') return;
    addMovieName({
      id:id,
      name: movie,
    });
    setMovie('');
  };

  return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <View style={{marginHorizontal:normalize(20)}}>
                  <Text style={{fontSize:normalize(30),textAlign:'center'}} >
                    Local Movie
                  </Text>
                </View>

         <View style={{margin:normalize(20)}}>

         <View style={{borderWidth:1, borderColor:'black',}}>
             <TextInput 
              value={movie} 
              onChangeText={onChange} placeholder="Add movie name"/>
            </View>

          <Button title ="Add" onPress={onSubmit}></Button>

          <View style={{marginTop:normalize(10)}}>
            {movieName.map((e) => (
            <View key={e.id} >
              <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:normalize(5)}}>
                  <Text style={{fontSize:normalize(20)}}>{e.name} </Text>
                    <Button state={{width:'30%'}} onPress={deleteMovie.bind(null, e.id)} title="Delete"></Button>
                  </View>
                  <View style={{borderWidth:1, borderColor:'black', height:1,}} />
                  </View>
              ))}
          </View>
          </View>
        </SafeAreaView>
  );
};

export default AddMovieScreen;
