import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PostsProvider from './components/PostsProvider';
import PostsList from './components/PostsList';
import NewPost from './components/NewPost';
import ViewPost from './components/ViewPost';


 

function App() {
  return (
    <PostsProvider>
      <Router>
        <div className="App">
          <div className="app__content">         
            <Switch>
              <Route exact path="/" component={PostsList} />
              <Route exact path="/posts/new" component={NewPost} />
              <Route exact path="/posts/:id" component={ViewPost} />
            </Switch>
          </div>
        </div>
      </Router>
    </PostsProvider>
  );
}

export default App;