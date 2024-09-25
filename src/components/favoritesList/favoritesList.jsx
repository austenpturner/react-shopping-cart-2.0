import { useSelector } from "react-redux";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import { useEffect, useState } from "react";

export default function FavoritesList() {
  const favoritesLoaded = useFetchFavorites();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [loading, setLoading] = useState(true);

  //   console.log(favorites);

  useEffect(() => {
    if (favoritesLoaded) {
      setLoading(false);
    }
  }, [favoritesLoaded]);

  const favoritesList = (
    <ul>
      {favorites?.length ? (
        favorites.map((favorite) => {
          return <li key={favorite.id}>{favorite.title}</li>;
        })
      ) : (
        <p>no favorites saved</p>
      )}
    </ul>
  );

  return (
    <div>
      <h2>favorites</h2>
      {loading ? <p>loading... </p> : favoritesList}
    </div>
  );
}
