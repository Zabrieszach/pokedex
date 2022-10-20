import React from "react";

const FavoriteContext = React.createContext({
    favoritePokemons: [],
    updateFavoritePokemons: (id) => null

});

export const FavoriteProveider = FavoriteContext.Provider
export default FavoriteContext;