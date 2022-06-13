import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch } from "react-redux";

import {
  searchMovie,
  selectGenreOrCategory,
} from "../features/currentGenreOrCategory";
import { ColorModeContext } from "../utils/toggleColorMode";
import { fetchToken } from "../utils";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    alanBtn({
      key: "1c034f4a4bcee5c1c701e10635d480ba2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            history.push("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            history.push("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
          history.push("/");
        } else if (command === "logout") {
          localStorage.clear();
          history.push("/");
        } else if (command === "search") {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
