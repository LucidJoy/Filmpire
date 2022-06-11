import React, { useEffect, useState } from "react";
import {
  useMediaQuery,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "..";

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();
  // console.log(data?.results);

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display='flex' alignItems='center' marginTop='20px'>
        <Typography variant='h4'>
          No movies match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return "An error occured.";

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;