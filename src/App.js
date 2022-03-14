import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Homepage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CharacterCreatePage from "./pages/CharacterCreatePage";
import MyPage from "./pages/MyPage";
import CharacterEditPage from "./pages/CharacterEditPage";
import { Banner } from "./components/Banner";
import FightPage from "./pages/FightPage";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Banner />
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/create" element={<CharacterCreatePage />} />
        <Route path="/edit/:id" element={<CharacterEditPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/fight" element={<FightPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
