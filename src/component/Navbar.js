import React, {useContext} from "react";
import FavoriteContext from "../contexts/favoriteContext";

const Navbar = () =>{
    const {favoritePokemons} = useContext(FavoriteContext);

        const logoImg = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    return (
            <nav>
                <div>
                <img 
                className="navbar-img" alt="pokeapi-logo" src= {logoImg} />
                </div>
                <div>{favoritePokemons.length}❤️</div>
            </nav>
        
    );
};

export default Navbar;