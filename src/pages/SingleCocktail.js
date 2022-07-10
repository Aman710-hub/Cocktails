import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
// this url is not completed yet so we need to add some text to the end of this url and then it will be completed.
// we adding last carachters to this url as an id from useParams
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  // we getting id "cocktail" element
  const { id } = useParams();
  const [loadin, setLoading] = React.useState(false);
  // here we will save out data
  const [cocktail, setCocktail] = React.useState(null);

  // every time "id" changes this useEffect will be triggered
  // id we getting from "useParams"
  // when id changes ? - when we click to "details" btn
  React.useEffect(() => {
    // while we fetching data "loading" will be displayed
    setLoading(true);
    // every time useEffect triggered this function will run
    async function getCocktail() {
      try {
        // this is just dinamic way to get data
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        console.log(data);
        if (data.drinks) {
          // we right away renameing values that we get from data
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail([]);
        }
        // if try cant be done then catch will run
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
    // "id" is dependensy of our useEffect
  }, [id]);

  // loading
  if (loadin) {
    return <Loading />;
  }
  // if "cocktail" data is not exist then "h2"  will be displayed
  if (!cocktail) {
    return <h2 className="section-title">no coctail to display</h2>;
  }
  const { name, image, category, info, glass, instructions, ingredients } =
    cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt="img" />
        <div className="drink-info">
          <p>
            {/* this is how we can set category */}
            <span className="drink-data">name:</span> {name}
          </p>
          <p>
            <span className="drink-data">category:</span> {category}
          </p>
          <p>
            <span className="drink-data">info:</span> {info}
          </p>
          <p>
            <span className="drink-data">glass:</span> {glass}
          </p>
          <p>
            <span className="drink-data">instructions:</span> {instructions}
          </p>
          <p>
            {/* we jjust itirate through array  */}
            <span className="drink-data">ingredients:</span>{" "}
            {ingredients.map((item, index) => {
              // if "item" exist then span displayed if not null
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
