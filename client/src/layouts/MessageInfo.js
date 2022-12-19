import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

function TransitionUp(props) {
    return <Slide direction="up" {...props} />;
  }
class MessageInfo extends React.Component {

  render() {
    const { vertical, horizontal, open, content } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open} 
          transition={TransitionUp} 
          onClose={this.props.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{content}</span>}
        />
      </div>
    );
  }
}

export default MessageInfo;