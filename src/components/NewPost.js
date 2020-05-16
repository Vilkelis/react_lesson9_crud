import React from 'react';
import {Link} from 'react-router-dom';
import PostsContext from './PostsContext';
import Alerts from './Alerts';

const NewPost = (props) => {  
  const {history} = props;  
  const {loading, errors, newPost, setErrors} = React.useContext(PostsContext);

  const emptyPost = {id: undefined, content: ''}; 
  const [form, setForm] = React.useState(emptyPost);      

  const handleSubmit = evt => {
    evt.preventDefault();
    let errs = [];
    
    if ( !form.content || !form.content === '' ) {
      errs.push('Не указан текст поста.');
    }      
    setErrors(errs);    
    if ( errs.length === 0 ) {       
      const post = {id: 0, content: form.content}; 
      newPost(post, res => { 
        if(res) {                                        
          history.push('/');
        } 
      });     
    }
  };

  const handleChange = ({target}) => {
    const name = target.name;
    const value = target.value; 
    setForm(prevForm => ({...prevForm, [name]: value}));
  }    

  return(
    <form className="post-form__form" onSubmit={handleSubmit}>      
      <div className="control form__title">
        <span>Новая публикация</span>          
        <Link to={'/'} className="close" arial-label="Отмена">
          <span aria-hidden="true">&times;</span>
        </Link> 
       </div> 
      <div className="control">          
        <textarea className="post-text-edit"
          rows="4" 
          type="text" 
          placeholder="" 
          id="text" 
          name="content"    
          value={form.content}             
          onChange={handleChange} />
      </div>
      <div className="control form__footer">
        <button type="submit" className="btn btn-primary">Опубликовать</button>  
      </div>
      {errors ? <Alerts texts={errors} kind="danger" /> : null}
      {loading ? <Alerts texts={['Выполнение операции...']} kind="primary" /> : null}          
    </form>
  );
}

export default NewPost;