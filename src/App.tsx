import './App.scss';
import MoviesView from './containers/MoviesView';
import { Container } from '@material-ui/core';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Container>
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
      <MoviesView />
    </Container>
  );
}

export default App;
