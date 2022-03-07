import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../store/character/actions";
import { selectCharacters } from "../../store/character/selectors";
import { Link } from "react-router-dom";

export default function Homepage() {
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);

  useEffect(() => {
    dispatch(fetchCharacters);
  }, [dispatch]);

  console.log("characters homepage", characters);

  return (
    <div>
      {!characters
        ? "Loading"
        : characters.map((character) => {
            return (
              <div key={character.id}>
                <img src={character.image} alt={character.name} width={200} />
                <h3>{character.name}</h3>
                <Link to={`/details/${character.id}`}>
                  <button>View details</button>
                </Link>
              </div>
            );
          })}
    </div>
  );
}
