import './App.scss';
import MoviesView from './containers/MoviesView';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Container className="Main_Container" style={{ maxWidth: "1400px" }}>
      <MoviesView />
    </Container>
  );
}

export default App;
