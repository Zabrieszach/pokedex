import FavoriteContext from "../contexts/favoriteContext";
import React, {useContext} from "react";

const Pokemon = (props) => {
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext);
    const {pokemon} = props;
    console.log("pokrmon ", pokemon);
    const onHeartClick = () => {
        console.log("pode favoritar")
        updateFavoritePokemons(pokemon.name)
    }
    const heart = favoritePokemons.includes(pokemon.name) ? "❤️" : "🤍";

    return (
        <div className="pokemon-card">
                <div className="pokemon-image-container">
                    <img alt={pokemon.name} src={pokemon.sprites.front_default} className="pokemon-image"/>
                </div>
                <div className="card-body">
                    <div className="card-top">
                            <h3>{pokemon.name}</h3>
                            <div>#{pokemon.id}</div>
                    </div>
                    <div className="card-bottom">
                        <div className="pokemon-tupe">
                            {pokemon.types.map((type, index) => {
                                return (
                                    <div key={index} className="pokemon-tupe-text">{type.type.name}</div>
                                )
                            })}
                        </div>
                        <button className="pokemon-heart-btn" onClick={onHeartClick}>
                            {heart}
                        </button>
                    </div> 
                </div>
        </div>
    );
};

export default Pokemon;