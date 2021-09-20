import LeaderBoardPage from 'containers/LeaderBoardPage'
import { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './containers/HomePage'
import TournamentResultPage from './containers/TournamentResultPage'

const Routes: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          path="/tournament-result"
          exact
          component={TournamentResultPage}
        />
        <Route path="/leaderboard" exact component={LeaderBoardPage} />
      </Switch>
    </Router>
  )
}

export default Routes
