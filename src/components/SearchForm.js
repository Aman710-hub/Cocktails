import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  // like this we can not import hook
  // we targetting the tag with this
  const searchValue = React.useRef();
  console.log(searchValue);

  // this is for to focus currsor to the search box when we first enter the site
  React.useEffect(() => {
    // current - is what inside the tag
    searchValue.current.focus();
  }, []);

  // this function is for to set search box value
  const searchCoctail = () => {
    setSearchTerm(searchValue.current.value);
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search Cocktails</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCoctail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
