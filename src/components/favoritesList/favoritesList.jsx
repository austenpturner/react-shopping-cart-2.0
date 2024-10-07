import { useSelector } from "react-redux";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import { useEffect, useState } from "react";
import ProductCard from "../productCard";
import styles from "./favoriteList.module.scss";

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
      <h2 className="page-subheader">favorites</h2>
      {loading ? <p>loading... </p> : favoritesList}
    </>
  );
}
