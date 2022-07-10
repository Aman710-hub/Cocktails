import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  // this state is what we typing to the search box. And "a" is defoult text
  const [searchTerm, setSearchTerm] = useState("a");
  const [coctails, setCoctails] = useState([]);

  // The useCallback hook is used when you have a component in which the child is rerendering again and again without need.
  // Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
  const fetchDrinks = useCallback(async () => {
    // while we are searching loading screen will be displayed
    setLoading(true);
    try {
      //  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a" this is how it looks like
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      console.log(data);
      if (drinks) {
        const newDrinks = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

          return {
            // this is how we can rename values of objects
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        // setting mapped array to this "coctails" state
        setCoctails(newDrinks);
      } else {
        setCoctails([]);
      }

      ///////////////////////////////////////// IF STATEMENT END
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    //////////////////////////////////////////// TRY END
    // every time "searchTerm" changes this function will be recreated
  }, [searchTerm]);
  /////////////////////////////////////////////// fetchDrinks   FUNCTION END
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);
  return (
    <AppContext.Provider
      value={{
        loading,
        coctails,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
