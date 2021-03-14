import React, { useState, useEffect, useRef ,useCallback} from 'react'
import { View, Text, FlatList, StyleSheet,Dimensions, SafeAreaView,TouchableOpacity, TextInput, RefreshControl, } from 'react-native'
import { useSelector , useDispatch } from 'react-redux'
import { GetDataAction } from '../../Store/action/MovieDataAction'
import normalize from '../../Common/FontSize'
import COLORS from '../../assets/Colors'
import { FETCH_LISTING_FETCH } from '../../Common/StoreActionTypes'
import AppNavKeys from '../../Common/AppNavKeys'
const { width, height } = Dimensions.get('screen');

function HomeScreen(props) {

    const dispatch = useDispatch()
    const [movies, setMovies] = useState([])
     const [search, setSearch] = useState("");
    const [searchMovie, setSearchMovie] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const {CommonReducer, MovieDataReducer , loader , message} = useSelector(state => ({
      CommonReducer: state.CommonReducer,
      MovieDataReducer: state.MovieDataReducer.data,
      loader: state.CommonReducer.isLoading,
      message: state.MovieDataReducer.message,
    }));


    const isFirstRun = useRef(true);
    useEffect(() => {

      if (isFirstRun.current) {
        isFirstRun.current = false;

        dispatch(GetDataAction())
      } else {

        if (CommonReducer.isLoading) {
          return
        }

        if (message && CommonReducer.api_type) {
          alert(message);
          return
        }
  
        switch (CommonReducer.api_type) {

          case FETCH_LISTING_FETCH :
            if ( MovieDataReducer) {
              var response =  MovieDataReducer.results
              setMovies(response);
            }
            break
          default: break
        }
      }
      return () => {
      }
    }, [CommonReducer,  MovieDataReducer, message])

    useEffect(() => {
      setSearchMovie(
        movies.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [movies, search]);


    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      if (searchMovie) {
        setSearch('')
        setRefreshing(false)
      }
      else{
        setRefreshing(false)
      }
    }, []);
  
    const renderItem = ({ item, index }) => {
          return (
            <View style={{ marginHorizontal:normalize(20)}}>
                <View style={styles.boxMovie}>

                    <Text style={{fontSize:normalize(14)}}>Title: {item.title}</Text>
                    <Text style={{fontSize:normalize(14)}}>Episode: {item.episode_id}</Text>
                    <Text numberOfLines={1} style={{fontSize:normalize(14)}}>Opening Crawl: {item.opening_crawl}</Text>
                    <Text numberOfLines={1} style={{fontSize:normalize(14)}}>Director Name: {item.director}</Text>
                    <Text numberOfLines={1} style={{fontSize:normalize(14)}}>Producer Name: {item.producer}</Text>
                    <Text style={{fontSize:normalize(14)}}>Release Date: {item.release_date}</Text>
                 
                 <TouchableOpacity style={{marginTop:normalize(5), justifyContent:'center' ,backgroundColor:'blue', width:'30%', height:normalize(30) }}
                      onPress={() => props.navigation.navigate(AppNavKeys.Character, { data: item.characters })}
                 >
                     <Text style={{color:'white',textAlign:'center', fontSize:normalize(14)}}>CharacterList</Text>
                 </TouchableOpacity>
                </View>
            </View>
          );
        };

    return (
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:normalize(20)}}>
                  <Text style={{fontSize:normalize(30),textAlign:'center'}} >
                    Home
                  </Text>
                  <TouchableOpacity style={{width:'50%',justifyContent:'center', backgroundColor:'blue', height:normalize(50)}}
                    onPress={() => props.navigation.navigate(AppNavKeys.AddMovie)}
                    >
                    <Text style={{fontSize:normalize(20), textAlign:'center', color:'white'}}>Local Movie list</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginHorizontal:normalize(20),marginTop:normalize(10), borderWidth:1, borderColor:'black',}}>
                  <TextInput
                    value={search}
                    placeholder="Search Movie"
                    style={styles.searchBox}
                    onChangeText={text => setSearch(text)}
                  />
                </View>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  alwaysBounceVertical={false}
                  contentContainerStyle={{ paddingBottom: normalize(20) }}
                  style={{ paddingTop: normalize(10), backgroundColor: COLORS.white }}
                  data={searchMovie}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />

            </SafeAreaView>
        )
    }

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    },
    searchBox:{
      backgroundColor:'white',
      height: normalize(38),
      color: 'black',
      width: '90%',
      marginLeft: normalize(10),
      fontSize: normalize(15),
    },
    boxMovie:{ backgroundColor:'white',
    borderRadius: normalize(5),
    borderColor:'grey',
    borderWidth:1,
    height: normalize(170),
    width: '100%',
    marginVertical: normalize(8),
    shadowColor: 'rgba(0, 0, 0, 8)',
    shadowOffset: {
    width: 6,
    height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 2.49,
    elevation: 2, }
});

export default HomeScreen;
  
  
  