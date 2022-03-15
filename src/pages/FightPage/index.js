import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { fetchCharacter } from "../../store/character/actions";
import FightingStatics from "../../components/FightingStatics";
import { fetchCharacters } from "../../store/character/actions";
import { selectCharacters } from "../../store/character/selectors";
import "./styles.css";
import Dragon from "./Dragon.gif";
import VS from "./Vs.gif";

export default function FightPage() {
  const [yourCharacter, setYourCharacter] = useState("None");

  const dispatch = useDispatch();

  const character = useSelector(selectCharacters);

  useEffect(() => {
    /* // console.log("id", id); */
    dispatch(fetchCharacter());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCharacters);
  }, [dispatch]);
  console.log(character);

  console.log("what is set choose char", yourCharacter);

  return !character ? (
    <h1>Loading</h1>
  ) : (
    <div className="containerFight">
      <div>
        <b>My Character</b>
        <form>
          <label>Choose a character:</label>
          <select
            onChange={(e) => setYourCharacter(JSON.parse(e.target.value))}
          >
            <option>None</option>
            {character
              ? character.map((char, i) => (
                  <option value={JSON.stringify(char)}>{char.name}</option>
                ))
              : ""}
          </select>
        </form>
        <div>
          <img src={yourCharacter.image} alt="Choose a character" />
        </div>
      </div>
      <h1 className="VS">
        <b>VS</b>
        <FightingStatics />

        <img src={VS} alt="vs" />
      </h1>
      <div>
        <div className="dragon">
          <b>Opponent</b>
          Fenchurch:
          <img src={Dragon} alt="Dragon" />
        </div>
      </div>
    </div>
  );
}
