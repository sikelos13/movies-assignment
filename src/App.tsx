import './App.scss';
import MoviesView from './containers/MoviesView';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Container>
      <MoviesView />
    </Container>
  );
}

export default App;
