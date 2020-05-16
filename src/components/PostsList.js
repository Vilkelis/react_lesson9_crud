import React from 'react';
import {Link} from 'react-router-dom';
import PostsContext from './PostsContext';
import Post from './Post';
import Alerts from './Alerts';

const PostsList = () => {
  const {posts, loading, errors} = React.useContext(PostsContext);
  
  if (loading) { 
    return <Alerts text={['Загрузка...']} kind={'primary'}/>
  } else if (errors) {
    return <Alerts text={[errors]} kind={'danger'}/>  
  } else {
    return (
      <React.Fragment>         
        <nav className="posts-nav">
            <Link to="/posts/new" className="btn btn-primary">Создать пост</Link>
        </nav>        
        <div className="posts-list">
          {posts ? posts.map( o => 
            <div key={o.id} className="posts-list__item">
              <Link to={`/posts/${o.id}`} className="posts-list__item-a">
                <Post post={o}/>
              </Link>
            </div>
          ) : null }
        </div>
      </React.Fragment>
    );
  }
}

export default PostsList;