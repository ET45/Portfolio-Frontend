import "./styles.css";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { fetchCharacters } from "../../store/character/actions";
import { selectCharacters } from "../../store/character/selectors";
import { selectUser } from "../../store/user/selectors";
import { Link } from "react-router-dom";

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 3;
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

  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const user = useSelector(selectUser);

  // console.log("characters myspace", characters);

  const myCharacters = characters
    ? characters.filter((character) => character.user.email === user.email)
    : [];

  // console.log("my characters", myCharacters);

  useEffect(() => {
    dispatch(fetchCharacters);
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return myCharacters ? (
    <div className="myPage">
      <div className="buttonsPagination">
        <button onClick={decrementPage}>⬅️</button>
      </div>
      <div className="cardsWrapper">
        {paginateCharacters(myCharacters, limit, currentPage).map(
          (myCharacter) => {
            return (
              <div key={myCharacter.id}>
                <img
                  src={myCharacter.image}
                  alt={myCharacter.name}
                  width={200}
                />
                <h3>{myCharacter.name}</h3>
                <Link to={`/details/${myCharacter.id}`}>
                  <button>Details of {myCharacter.name}</button>
                </Link>
                <Link to={`/edit/${myCharacter.id}`}>
                  <button>Edit {myCharacter.name}</button>
                </Link>
                <h5>{myCharacter.user.name}</h5>
              </div>
            );
          }
        )}
      </div>
      <div className="buttonsPagination">
        <button onClick={incrementPage}>➡️</button>
      </div>
    </div>
  ) : (
    "Loading"
  );
}
