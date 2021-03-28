import MoviesView from "../../containers/MoviesView";
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import MoviesList from "../../components/MoviesList";
import { moviesList } from "../mocks/moviesList";

const MoviesListProps = {
    moviesList: moviesList
}

describe("Application container renders", () => {
  it('renders children when passed in', () => {
    const result = shallow((
      <MoviesView>
        <div className="unique" />
      </MoviesView>
    ));

    expect(result).toBeTruthy();
  });

  it('should render list component', () => {

    const wrapper = mount(<MoviesList {...MoviesListProps} />);
    expect(wrapper.find(MoviesList).length).toEqual(1);
  });
});