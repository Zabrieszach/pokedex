import React, {useEffect, useState} from 'react';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import './App.css';
import Navbar from './component/Navbar';
import Pokedex from './component/pokedex';
import Searchbar from './component/Searchbar';
import { FavoriteProveider } from './contexts/favoriteContext';


const favoritesKey ="f";
function App() {

  const itensPerPage = 25;
  const [page, setPage] = useState(false);
  const [totalPages, setTotalPages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState([]);

const fetchPokemons = async () => {
  try {
    setLoading(true);
    setNotFound(false);
    const data = await getPokemons(itensPerPage, itensPerPage * page);
    const promises = data.results.map(async (pokemon) => {
      return await getPokemonData(pokemon.url);
    });

    const results = await Promise.all(promises);
    setPokemons(results);
    setLoading(false);
    setTotalPages(Math.ceil(data.count / itensPerPage))

  } catch (error) {
    console.log("fetchPokemons erro: ", error);
  }
 
}

  useEffect( () => {
    console.log("carregou");
      fetchPokemons ();
  }, [page]);


  const loadFavoritePokemons = () =>{
   const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
   setFavorites(pokemons)
  }
  useEffect( () => {
    loadFavoritePokemons();
  }, []);

  const updateFavoritePokemons = (name) =>{
    const updateFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0){
      updateFavorites.slice(favoriteIndex, 1);
    } else {
      updateFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites))
    setFavorites(updateFavorites);
  }
  

  const onSearchHandler = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result){
      setLoading(false)
      setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)

  }
  return (
      <FavoriteProveider 
        value ={{
          favoritePokemons: favorites, 
          updateFavoritePokemons: updateFavoritePokemons}}
      >
        <div>
            <Navbar />
            <Searchbar onSearch={onSearchHandler}  />
            {notFound ? (
          <div className="not-found-text"> Meteu essa?! </div>
        ) : 
        (<Pokedex
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />)}
          </div>

        </FavoriteProveider>
  );
}

export default App;
