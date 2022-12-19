import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import Image from '../banner.jpg';
import LogoSmall from '../logo_small.png'

const styles = theme => ({
  root: {
    background: 'url('+Image+')',
    backgroundSize: 'cover',
    width: '100%',
    height: '-webkit-fill-available',
    top: '-10px',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      backgroundSize: 'cover', 
      backgroundPositionX: '-707px'
    },
    
  },
  logoImage: {
    width: "35%",
    
  },
  slogan: {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.38)",
    top: '180px',
    width: '60%',
    position: 'relative',
    flexDirection: "column",
    marginTop: "5px",        
    marginBottom: "5px", 
   alignItems: "center",
    [theme.breakpoints.down('md')]: {
      display: "flex",
      top: '65px',
      flexDirection: "column",
      alignItems: "center",
     justifyContent: "center",       
     
    },
  }
 
});

class AppBanner extends React.Component {


  render() {
    const { classes, dispatch } = this.props;
   
    return (
      <div className={classes.root}>
            <div className={classes.slogan}>
                <h2>WOMAN MAN VLAUE</h2>
                <h4>Adults Should Be Protected</h4>
                    <img className={classes.logoImage} src={LogoSmall}  />
                
            </div>
      </div>
    );
  }
}

AppBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapUserState(state){
    return {
        user: state.AppUser
    }
}

export default connect(mapUserState)(withStyles(styles)(AppBanner));