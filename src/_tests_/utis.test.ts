
import { getHasNextPage } from '../utils/getHasNextPage';
import { handleErrorMessage } from '../api/utils/handleErrorMessage';
import { moviesList } from "./mocks/moviesList";
import { getSortedMoviesList } from '../utils/getSortedMoviesList';
import { getGenresNames } from '../utils/getGenresNames';
import { sortedMoviesListHighest } from "./mocks/sortedMoviesListHighest";
import { sortedMoviesListLowest } from "./mocks/sortedMoviesListLowest";
import {  normalizeGenres } from "../normalizers/genres.normalize";
import { genresList, normalizedGenresList } from "./mocks/genresList";

describe("Return if has a next page", () => {
    test("it should return a boolean regarding the next page", () => {
      const output = true;
      expect(getHasNextPage(5, 110)).toEqual(output);

    });
  });

  describe("Return string of genres seperated by comma", () => {
    test("it should return normalized genres object and string o genres", () => {
      const output = 'Action, Drama';

      expect(normalizeGenres(genresList).entities).toEqual(normalizedGenresList);
      expect(getGenresNames(normalizeGenres(genresList), [1,2])).toEqual(output);

    });
  });


  describe("Return the list sorted", () => {
    test("it should return list of movies from highest to lowest vote", () => {
      const output = sortedMoviesListHighest;
      expect(getSortedMoviesList(moviesList,moviesList,"highest_vote_average")).toEqual(output);
  
    });

    test("it should return list of movies from lowest to highest vote", () => {
        const output = sortedMoviesListLowest;
        expect(getSortedMoviesList(moviesList, moviesList, "lowest_vote_average")).toEqual(output);
    
      });

      test("it should return list of movies from with default sorting", () => {
        const output = moviesList;
        expect(getSortedMoviesList(moviesList, moviesList,"")).toEqual(output);
    
      });
  });

describe("Return error of api call", () => {
  test("it should return a normalized message from rejected request", () => {
    const responseApiOne = {
      error_code: ["Something went wrong please try again"]
    };

    const outputOne = "Something went wrong please try again";
    expect(handleErrorMessage(responseApiOne)).toEqual(outputOne);
  });

  test("it should return a normalized message from rejected non field errors", () => {
    const responseApiTwo = {
      non_field_errors: ["Something went wrong , contact administrator"]
    };

    const outputTwo = "Something went wrong , contact administrator";
    expect(handleErrorMessage(responseApiTwo)).toEqual(outputTwo);
  });

  test("it should return a normalized message response data object", () => {
    const responseApiThree = {
      response: {
        data: {
          non_field_errors: ["Object has some problems"]
        }
      }
    };

    const outputThree = "Object has some problems";
    expect(handleErrorMessage(responseApiThree)).toEqual(outputThree);
  });
});