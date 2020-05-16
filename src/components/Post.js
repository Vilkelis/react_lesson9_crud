import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
 
function Post(props) {
  const {post} = props;

  const formatDateTime = (date) => {
    if (!date){
      return null;
    }    
    return moment(date).locale('ru').fromNow();
  };  

  return (
    <div className="card post-card">      
      <div className="card-body">
        <div className="card-title">         
          <img alt="logo" src="/logo.jpg" className="rounded-circle post-logo"/>
          <div className="card-title__data">
            <div className="card-title__user">Stepan Golovanov</div>
            <div className="card-title__time">{formatDateTime(post && post.created)}</div>
          </div>
        </div>    
        <p className="card-text">
          {post && post.content}
        </p>
      </div>
    </div>
  );
}

Post.propTypes = {
 post: PropTypes.shape(
        {id: PropTypes.number,
        content: PropTypes.string,
        created: PropTypes.number}
       )
}

export default Post;