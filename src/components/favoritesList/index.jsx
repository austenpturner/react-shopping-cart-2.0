import { useSelector } from "react-redux";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import { useEffect, useState } from "react";
import ProductCard from "../productCard";
import styles from "./favoriteList.module.scss";
import { PulseLoader } from "react-spinners";

export default function FavoritesList() {
  const favoritesLoaded = useFetchFavorites();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoritesLoaded) {
      setLoading(false);
    }
  }, [favoritesLoaded]);

  const favoritesList = (
    <ul className={styles.favoritesList}>
      {favorites?.length ? (
        favorites.map((favorite) => {
          return (
            <ProductCard
              key={favorite.id}
              product={favorite}
              parent={"favorites"}
            />
          );
        })
      ) : (
        <p className={styles.noFavorites}>No favorites saved.</p>
      )}
    </ul>
  );

  return (
    <>
      <h1 className="page-header">Favorites</h1>
      {loading ? (
        <PulseLoader color="#a0a0a0" margin={1} size={8} />
      ) : (
        favoritesList
      )}
    </>
  );
}
