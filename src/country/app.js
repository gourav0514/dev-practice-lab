import DATA from "./data.js";
import Game from "./game.js";

export default function App() {
  return (
    <main>
      <Game data={DATA} />
    </main>
  );
}
