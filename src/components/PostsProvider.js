import React from 'react';
import PostsContext from './PostsContext';
 
const PostsProvider = (props) => {
  const url = process.env.REACT_APP_SERVER_URL + 'posts';    
  
  const [posts, setPosts] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [executing, setExecuting] = React.useState(null);
  const [errors, setErrors] = React.useState(null);
  const [postId, setPostId] = React.useState(null);
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {     
    refreshPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  React.useEffect(() => {     
    if(postId) {       
      const p = posts && posts.find( o => o.id === postId);
      if (p) {
        setPost(p);
      } else {
        refreshPosts();
        setPost(posts && posts.find( o => o.id === postId));
      }
    }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[postId]);

  const refreshPosts = (callBack = null) => {       
    fetchData().then( (res) => callBack && callBack(res) ); 
  }

  const newPost = (post, callBack = null) => {
    return postData(post).then( res => { 
      if(res) {
        refreshPosts();
        return callBack && callBack(res);
      }
    });
  }

  const updatePost = (post, callBack = null) => {    
    return postData(post).then( res => { 
       if(res) {
        setPosts(prevPosts => prevPosts.map( p => p.id !== post.id ? p : {...post, content: post.content}));
       }
       setPost(post);
       return callBack && callBack(res)
    });
  }

  const deletePost = (post, callBack = null) => {
    return deleteData(post).then(
      res => {
        if(res) {
          setPosts( prevPosts => prevPosts.filter( p => p.id !== post.id ));
          return callBack && callBack(res);
        }
      });
  }

  const deleteData = async (data) => {       
    setErrors(null);
    setLoading(false);
    setExecuting(true);                    
    try {         
      const opts = {method: 'DELETE'};      
      const response = await fetch(url + '/' + data.id, opts);
      if (!response.ok) {            
        throw new Error(response.statusText);
      } else {         
        return true;
      }        
    } catch(e) {               
      setErrors(['Ошибка удаления: ' + e]);
      return false;
    } finally {
      setExecuting(false);
    }
  }

  const postData = async (data) => {       
    setErrors(null);
    setLoading(false);
    setExecuting(true);                    
    try {         
      const opts = {method: 'POST', 
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                    body: JSON.stringify(data)};      
      const response = await fetch(url, opts);
      if (!response.ok) {            
        throw new Error(response.statusText);
      } else {         
        return true;
      }        
    } catch(e) {                           
      setErrors(['Ошибка сохраенения: ' + e]);
      return false;
    } finally {
      setExecuting(false);
    }
  }  

  const fetchData = async () => {  
    setPosts(null);
    setErrors(false);
    setExecuting(false);
    setLoading(true);
    try {         
      const response = await fetch(url);
      if (!response.ok) {            
        throw new Error(response.statusText);
      }         
      const data = await response.json();              
      setPosts(data);
      if (postId) {                  
        setPost(data && data.find( item => item.id === postId ));        
      }      
      return true;
    } catch(e) {                           
      setErrors(['Ошибка загрузки данных: ' + e]);
      return false;
    } finally {
      setLoading(false);
    }
  } 

  return (
    <PostsContext.Provider value={{posts, post, loading, executing, errors, newPost, updatePost, deletePost, setErrors, setPostId}}>
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostsProvider;