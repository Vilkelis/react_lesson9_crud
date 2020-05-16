import React from 'react';
import {Link} from 'react-router-dom';
import PostsContext from './PostsContext';
import Post from './Post';
import Alerts from './Alerts';

const ViewPost = (props) => {
  const {match, history} = props; 
  const {post, loading, executing, errors, deletePost, updatePost, setPostId} = React.useContext(PostsContext);   
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState(null);

  React.useEffect( () => {
    setPostId(Number(match.params.id));
  },[match.params.id, setPostId]); 
  
  const handleEdit = (evt) => {
    evt.preventDefault();
    setForm(post);
    setEditMode(true);
  }

  const handleDelete = (evt) => {
    evt.preventDefault();
    deletePost(post, (res) => { if(res) {                                        
      setPostId(null);
      history.push('/');
    } } );
  }

  const handleEditCancel = (evt) => {
    evt.preventDefault();
    setEditMode(false);
  }

  const handleSavePost = (evt) => {
    evt.preventDefault();
    const data = {id: post.id, content: form.content};     
    updatePost(data, (res) => { if(res) {                                                   
      setEditMode(false);
    } } );     
  }

  const handleChange = ({target}) => {
    const name = target.name;
    const value = target.value; 
    setForm(prevForm => ({...prevForm, [name]: value}));
  }    

  if (!editMode) {
    return(
      <div className="post-form__form">      
        <div className="control form__title">
          <span>Просмотр публикации</span>           
          <Link to={'/'} className="close" aria-label="Отмена">
            <span aria-hidden="true">&times;</span>
          </Link>        
        </div> 
        <Post post={post} />
        <div className="control form__footer">
          <button onClick={handleEdit} className="btn btn-primary">Изменить</button>  
          <button onClick={handleDelete} className="btn btn-danger">Удалить</button>  
        </div>      
        {errors ? <Alerts texts={[errors]} kind="danger" /> : null}
        {executing ? <Alerts texts={['Выполнение операции...']} kind="primary" /> : null}                   
        {loading ? <Alerts texts={['Загрузка данных...']} kind="primary" /> : null} 
      </div>
    );
  } else {
    return(
      <form className="post-form__form" onSubmit={handleSavePost}>      
        <div className="control form__title">
          <span>Редактирование публикации</span>           
          <a href="/" onClick={handleEditCancel} className="close" aria-label="Отмена">
            <span aria-hidden="true">&times;</span>
          </a>           
        </div> 
        <div className="control">          
          <textarea className="post-text-edit"
            rows="4" 
            type="text" 
            placeholder="" 
            id="text" 
            name="content"    
            value={form && form.content}             
            onChange={handleChange} />
        </div>
        <div className="control form__footer">
          <button type="submit" className="btn btn-primary">Сохранить</button>  
        </div>      
        {errors ? <Alerts texts={[errors]} kind="danger" /> : null}        
        {executing ? <Alerts texts={['Выполнение операции...']} kind="primary" /> : null}   
        {loading ? <Alerts texts={['Загрузка данных...']} kind="primary" /> : null}  
      </form> 
    );   
  }

}

export default ViewPost;