import "./styles.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchCharacters } from "../../store/character/actions";
import { selectCharacters } from "../../store/character/selectors";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 6;
  const paginateCharacters = (allCharacters, limit, currentPage) => {
    const offset = currentPage * limit;
    return allCharacters.slice(offset, limit + offset);
  };

  function incrementPage() {
    if (paginateCharacters(characters, limit, currentPage + 1).length !== 0) {
      setCurrentPage(currentPage + 1);
    }
  }

  function decrementPage() {
    if (paginateCharacters(characters, limit, currentPage - 1).length !== 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);

  useEffect(() => {
    dispatch(fetchCharacters);
  }, [dispatch]);

  // console.log("characters homepage", characters);

  return (
    <div className="container">
      <div className="cardsWrapper">
        {!characters
          ? "Loading"
          : paginateCharacters(characters, limit, currentPage).map(
              (character) => {
                return (
                  <div className="info" key={character.id}>
                    <img
                      src={character.image}
                      alt={character.name}
                      width={200}
                    />
                    <h3>{character.name}</h3>
                    <Link to={`/details/${character.id}`}>
                      <button>Details of {character.name}</button>
                    </Link>
                    <h5>{character.user.name}</h5>
                  </div>
                );
              }
            )}
      </div>
      <div className="buttonsPagination">
        <button onClick={decrementPage}>Previous</button>
        <button onClick={incrementPage}>Next</button>
      </div>
    </div>
  );
}
