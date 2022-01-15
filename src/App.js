import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import "./App.css";
import CustomCard from "./components/CustomCard";
import Navbar from "./components/navbar";

function App() {
  const [pokeName, setPokeName] = useState("");
  const [dadosPokemonAPI, setDadosPokemonAPI] = useState({});
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [hasFetch, setHasFetch] = useState(false);

  const [pokeStorage, setPokeStorage, removePokeStorage] = useLocalStorage(
    "pokeStorage",
    []
  );

  useEffect(() => {
    handleSearchPokemon();
  }, [pokeName]);

  useEffect(() => {
    if (hasFetch) saveInCache();
  }, [hasFetch]);

  async function handleRequestAPI() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${
          pokeName.toLocaleLowerCase().trim() || "ditto"
        }`
      );
      const {
        name,
        abilities,
        sprites: { other },
      } = await response.json();

      const {
        dream_world: { front_default },
      } = other;

      const pokemonAPI = {
        name,
        abilities,
        image: front_default,
      };
      setDadosPokemonAPI(pokemonAPI);
      setHasFetch(true);
    } catch (error) {
      setNaoEncontrado(true);
      setTimeout(() => {
        setNaoEncontrado(false);
      }, 5000);
    }
  }

  function saveInCache() {
    setPokeStorage([...pokeStorage, dadosPokemonAPI]);
  }

  function checkInCache() {
    return pokeStorage.find((item) => item.name === pokeName);
  }

  function handleSearchPokemon() {
    const result = checkInCache();
    if (result) {
      return setDadosPokemonAPI(result);
    }
    handleRequestAPI().finally(() => setHasFetch(false));
  }

  return (
    <div className="App">
      <Navbar setPokeName={setPokeName} />
      <div className="card-container">
        <CustomCard dadosPokemonAPI={dadosPokemonAPI} />
      </div>
      {naoEncontrado && (
        <Alert className="alert" severity="error">
          Pokemon não encontrado
        </Alert>
      )}
    </div>
  );
}

export default App;
