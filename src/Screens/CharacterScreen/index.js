import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { View, Text, SafeAreaView } from 'react-native'

export default function CharacterScreen(props) {

    const [state, setstate] = useState([])

    useEffect(() => {
        async function getData() {
            var chData = props.route.params.data
            let getEndPoint = chData.map((item)=> {return item.split('/')[5]})

            await getEndPoint.map((obj) => {
                let url = `http://swapi.dev/api/people/${obj}`
                let req = axios.get(url).then(res =>{
                    console.log(res.data.name,'current res==>')
                    let chName = res.data.name
                    let getAllName = [];
                    getAllName.push(chName)
                    setstate(state.push(chName))
                    getAllName.push(chName)
                    console.log(state, 'Get all name of characteer')
                })
                .catch(err => {
                    console.log(err)
                })
            })
        }
        getData()
    },[])

    console.log(state, 'get state value')
    return (
        <SafeAreaView>
            <Text>Character Screen</Text>
            {state.length >  0 ? state.map((item)=>(
                <>
                    <Text>{item}</Text>
                    </>
            )): <Text>Error in finding character name</Text>}
        </SafeAreaView>
    )
}
