import React from 'react';

const PostsContext = React.createContext({posts: [], 
                                          post: null,                                           
                                          loading: false,
                                          executing: false, 
                                          errors: false,                                            
                                          newPost: null,
                                          updatePost: null,
                                          deletePost: null,
                                          setErrors: null,
                                          setPostId: null
                                         });
export default PostsContext;