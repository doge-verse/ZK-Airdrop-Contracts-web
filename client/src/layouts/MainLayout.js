import PropTypes from 'prop-types';
import React from 'react'

import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import MenuAppBar from './MenuAppBar';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 0,
    height: "auto",
    width: "100%",
    background: "black",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyItems: "stretch"
  },
  child: {
      top: '100px',
      position: 'relative'
  }
});

class MainLayout extends React.Component{
   
  constructor(props){
    super(props);
  
  }
  render(){
    const { classes } = this.props;
      return(
        <div className={classes.root}>
            <MenuAppBar />
            <div  className={classes.root}>
                {this.props.children}
            </div>
        </div>
  
      )
    
  
    
  }
}
MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withRoot(withStyles(styles)(MainLayout));