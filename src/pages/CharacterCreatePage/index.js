import "./styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCharacter } from "../../store/character/actions";
import { selectLocations } from "../../store/location/selectors";
import { fetchLocations } from "../../store/location/actions";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectToken } from "../../store/user/selectors";
import { useNavigate } from "react-router-dom";

export default function CharacterCreatePage() {
  const [name, setName] = useState([]);
  const [gender, setGender] = useState([]);
  const [hometown, setHometown] = useState([]);
  const [image, setImage] = useState([]);
  const [skill, setSkill] = useState([]);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const token = useSelector(selectToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (locations) {
      setList([...locations]);
    }
  }, [locations]);

  useEffect(() => {
    dispatch(fetchLocations);
  }, [dispatch]);

  // console.log("locations", locations);

  const submit = (event) => {
    event.preventDefault();

    dispatch(addCharacter(name, gender, hometown, image, skill));
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return !locations ? (
    <></>
  ) : (
    <form onSubmit={submit} className="containerCreate">
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
        <form name="char_hometown">
          <select onChange={(e) => setHometown(e.target.value)}>
            {list.map((location) => (
              <option value={location.id} key={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </form>
      </p>

      <p>
        Gender:
        <form>
          <input
            type="radio"
            id="male"
            name="char_gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label for="male">Male</label>
          <input
            type="radio"
            id="female"
            name="char_gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label for="Female">Female</label>
        </form>
      </p>
      <p>
        <button type="submit" className="button-24">
          Create
        </button>
      </p>
    </form>
  );
}
