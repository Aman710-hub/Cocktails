import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { coctails, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (coctails.length < 1) {
    return <h2 className="section-title">nothing is found</h2>;
  }
  return (
    <section className="section">
      <h2 className="section-title">coctails</h2>
      <div className="cocktails-center">
        {coctails.map((item) => {
          return <Cocktail key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
