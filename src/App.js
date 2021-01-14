import FilmProjector from './assets/film-projector.svg';
import ShoppiesTrophy from './assets/shoppies-trophy.svg';
import Title from './assets/title.svg';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="form">
        <div className="call-to-action"> Nominate your Favourite Flicks for the </div>
        <img className="title" src={Title} alt="the Shoppies" />
      </div>
      <img className="trophy" src={ShoppiesTrophy} alt="Shoppies Trophy" />
      <img className="film-projector" src={FilmProjector} alt="projector" />
    </div>
  );
}

export default App;
