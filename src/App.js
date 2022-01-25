import React ,{useState,useEffect} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import {getPlacesData} from './api'


import Header from './components/Header/Header';
import List from './components/List/List'
import Map from './components/Map/Map'

const App =()=> {
  const [places, setPlaces] = useState([])
  const [coordinates,setCoordinates]= useState({})
  const [bounds, setBounds]=useState({})
  const [type, setType] = useState("restaurants");
  const [raiting, setRaiting] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude})
      })
  },[])

  useEffect(()=>{
    
    setIsLoading(true);
    getPlacesData(type, bounds.sw , bounds.ne)
    .then((data)=>{
     
      setPlaces(data?.filter((place)=>place.name > 0))
      setFilteredPlaces([])
      setIsLoading(false)
    })
  

  },[type,coordinates,bounds])

useEffect(() => {
  const filteredPlaces = places.filter((place)=> place.rating > raiting)
    setFilteredPlaces(filteredPlaces)
}, [raiting]);





  return (
  
  <>

  <CssBaseline/>

  <Header setCoordinates={setCoordinates}/>
  <Grid container spacing={3} style={{width:'100%'}}>

    <Grid item xs={12} md={4}>
      <List places = {filteredPlaces.length ? filteredPlaces : places} 
      childClicked={childClicked}
      isLoading={isLoading}
      type={type}
      setType={setType}
      raiting={raiting}
      setRaiting={setRaiting}

      
      />
    </Grid>
    <Grid item xs={12} md={8}>
    <Map  setCoordinates={setCoordinates} 
    setBounds={setBounds}
    coordinates ={coordinates}
    places={filteredPlaces.length ? filteredPlaces : places} 
    setChildClicked={setChildClicked}
    />
    </Grid>
  </Grid>

   
  </>
  
  );
}

export default App
