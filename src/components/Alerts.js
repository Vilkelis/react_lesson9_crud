import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
 
function Alerts(props) {
  const {texts, kind} = props;

  if (texts && texts.length > 0) {
    return (
      <React.Fragment>
        {texts.map( (text, index) => <Alert text={text} kind={kind} key={index} /> )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}

Alerts.defaultProps = {
  kind: 'primary'
}

Alerts.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string),
  kind: PropTypes.string 
}

export default Alerts;