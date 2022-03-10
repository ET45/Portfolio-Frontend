import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { useEffect } from "react";
import { fetchCharacter } from "../../store/character/actions";
import { selectCharacterDetails } from "../../store/character/selectors";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const character = useSelector(selectCharacterDetails);

  useEffect(() => {
    /* // console.log("id", id); */
    dispatch(fetchCharacter(id));
  }, [dispatch, id]);

  /*  // console.log("character", character); */
  return !character ? (
    <h1>Loading</h1>
  ) : (
    <div className="containerDetail">
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <p>
        <a href={character.link}>Link to Opensea</a>
      </p>

      <p>
        <b>Description:</b>
        {character.description}
      </p>
      <p>
        <b>Skill:</b>
        {character.skill}
      </p>
      <p>
        <b>Gender:</b>
        {character.gender}
      </p>
      <p>
        <b>Hometown:</b>
        {character.hometown}
      </p>
    </div>
  );
}
