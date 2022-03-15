import "./styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCharacter } from "../../store/character/actions";
import { selectLocations } from "../../store/location/selectors";
import { fetchLocations } from "../../store/location/actions";
import { selectCharacterDetails } from "../../store/character/selectors";
import { fetchCharacter } from "../../store/character/actions";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectToken } from "../../store/user/selectors";
import { useNavigate, useParams } from "react-router-dom";

export default function CharacterCreatePage() {
  const characterDetails = useSelector(selectCharacterDetails);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [hometown, setHometown] = useState("");
  const [image, setImage] = useState("");
  const [skill, setSkill] = useState("");
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);

  const token = useSelector(selectToken);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (locations) {
      setList([...locations]);
    }
  }, [locations]);

  useEffect(() => {
    /* // console.log("id", id); */
    dispatch(fetchCharacter(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchLocations);
    setName(characterDetails ? characterDetails.name : "");
    setSkill(characterDetails ? characterDetails.skill : "");
    setImage(characterDetails ? characterDetails.image : "");
    setGender(characterDetails ? characterDetails.gender : "");
    setHometown(characterDetails ? characterDetails.hometown : "");
  }, [dispatch, characterDetails]);

  /*   console.log("locations", locations);
  console.log("characterDetails", characterDetails); */

  const submit = (event) => {
    event.preventDefault();
    dispatch(updateCharacter({ id, name, gender, hometown, image, skill }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="containerEdit">
      <b>EDIT YOUR CHARACTER</b>
      <form onSubmit={submit}>
        <p>
          <label>
            Name:{""}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Skill:{""}
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Image:{""}
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </p>

        <p>
          Hometown:
          <select onChange={(e) => setHometown(e.target.value)}>
            {list.map((location) => (
              <option value={location.name} key={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </p>

        <p>
          Gender:
          <input
            type="radio"
            id="male"
            name="char_gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="char_gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="female">Female</label>
        </p>
        <p>
          <button type="submit" className="button-24">
            Update
          </button>
        </p>
      </form>
    </div>
  );
}
