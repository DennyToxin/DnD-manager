import { createBrowserRouter } from "react-router-dom";
import { Paths } from "../path";

import Login from "../modules/login/login";
import Register from "../modules/register/register";
import Players from "../modules/players/players";
import PlayerAdd from "../modules/player-add/player-add";
import Status from "../modules/status/status";
import { PlayerId } from "../modules/players/player.id";
import { ErrorBoundary } from "../modules/route-error/error";
import PlayerEdit from "../modules/player-edit/player-edit";

export const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Players />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />
  },
  {
    path: Paths.playerAdd,
    element: <PlayerAdd />
  },
  {
    path: `${Paths.player}/:id`,
    element: <PlayerId />
  },
  {
    path: `${Paths.playerEdit}/:id`,
    element: <PlayerEdit />
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />
  },
  {
    path: "*",
    element: <ErrorBoundary />
  }
]);
