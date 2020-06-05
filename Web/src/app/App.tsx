import React, { FC } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import './App.css';
import VideoRecordingPage from '../pages/VideoRecordingPage/VideoRecordingPage';
import VideosPage from '../pages/VideosPage/VideosPage';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const App: FC = () => {
  const history = useHistory();

  function navigateTo(path: string) {
    history.push(path);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button style={{ fontSize: 20, margin: "auto 5px", backgroundColor: "#2d2d2d" }} onClick={() => navigateTo("")} color="inherit">Recording</Button>
          <Button style={{ fontSize: 20, margin: "auto 5px", backgroundColor: "#2d2d2d" }} onClick={() => navigateTo("/videos")} color="inherit">Videos</Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/" exact component={VideoRecordingPage} />
        <Route path="/videos" exact component={VideosPage} />
        <Route component={() => <div>There is no such page.</div>} />
      </Switch>
    </div>
  );
}

export default App;
