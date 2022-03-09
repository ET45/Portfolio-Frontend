import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { fetchCharacters } from "../../store/character/actions";
import { selectCharacters } from "../../store/character/selectors";
import { selectUser } from "../../store/user/selectors";
import { Link } from "react-router-dom";

export default function MyPage() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const user = useSelector(selectUser);

  console.log("characters myspace", characters);

  const myCharacters = characters
    ? characters.filter((character) => character.user.email === user.email)
    : [];

  console.log("my characters", myCharacters);

  useEffect(() => {
    dispatch(fetchCharacters);
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return myCharacters ? (
    <div>
      {myCharacters.map((myCharacter) => {
        return (
          <div key={myCharacter.id}>
            <img src={myCharacter.image} alt={myCharacter.name} width={200} />
            <h3>{myCharacter.name}</h3>
            <Link to={`/details/${myCharacter.id}`}>
              <button>Details of {myCharacter.name}</button>
            </Link>
            <h5>{myCharacter.user.name}</h5>
          </div>
        );
      })}
    </div>
  ) : (
    "Loading"
  );
}
