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
    <div className={styles.favoritesList}>
      {favorites?.length ? (
        favorites.map((favorite) => {
          return (
            <div key={favorite.id} className={styles.favoriteItem}>
              <ProductCard product={favorite} />
            </div>
          );
        })
      ) : (
        <p className={styles.noFavorites}>No favorites saved.</p>
      )}
    </div>
  );

  return <div>{loading ? <p>loading... </p> : favoritesList}</div>;
}
