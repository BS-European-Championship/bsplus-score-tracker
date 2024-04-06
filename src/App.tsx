import { createSignal, onCleanup } from "solid-js";
import "./App.css";
import BSPlusClient from "./bsplus/client";
import Highlighted from "./highlighted";

function App() {
  const [scoresJSON, setScores] = createSignal<string | { status: string }>({ status: "Not connected" });


  const players: Map<number, string> = new Map();
  let scores: Map<string, {
    score: number;
    accuracy: number;
    misses: number;
    "failed?": boolean
  }> = new Map();

  const { searchParams } = new URL(window.location.href);

  const socketURL = searchParams.get("websocketURL") || "ws://127.0.0.1:2948/socket";
  const client = new BSPlusClient(socketURL);

  const renderJSON = () => {
    const scoresArray = [...scores].map(([playerId, score]) => (
      { platform_id: playerId, ...score, LUID: undefined, Spectating: undefined }
    ))

    setScores(JSON.stringify(scoresArray, undefined, 2));
  }

  client.callback = (event) => {
    if (event._event == "RoomJoined") {
      setScores({ status: "Connected" });
    }

    if (event._event == "PlayerJoined") {
      const { LUID, UserID } = event.PlayerJoined;
      players.set(LUID, UserID);
    }


    if (event._event == "Score") {
      const score = event.Score;
      const player = players.get(score.LUID);;
      if (player && !score.Spectating) scores.set(player, {
        score: score.Score,
        accuracy: score.Accuracy,
        misses: score.MissCount,
        "failed?": score.Failed
      });
    }

    if (event._event == "RoomState" && event.RoomState == "WarmingUp") {
      scores = new Map();
    }

    renderJSON();
  };

  onCleanup(() => {
    client.disconnect();
  });

  const scoreContent = (v: ReturnType<typeof scoresJSON>) => {
    if (typeof v == "string") {
      const options = {
        lang: "json",
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        }
      };

      return <Highlighted code={v} options={options} />;
    } else return ""
  };
  const scoreStatus = (v: ReturnType<typeof scoresJSON>) =>
    typeof v == "object" ? v.status : undefined;


  return (
    <>
      <form class="connectBox">
        <input type="text" name="websocketURL" placeholder="Websocket URL" value={socketURL} />
        <button type="submit">Change URL</button>
      </form>
      <pre
        class="scorebox"
        data-socket-url={socketURL}
        data-status={scoreStatus(scoresJSON())}
      >
        {scoreContent(scoresJSON())}
      </pre>
    </>
  );
}

export default App;
