import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import AppBanner from './banner.js';

import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import Image from '../myfile.jpg';

const styles = theme => ({
    root: {
        color: "white",
        position: "relative",
        height: "-webkit-fill-available",
        width: "100%",
       
      
    },
    mainContent:{
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around",
        top: "-61%",
        height: "400px",
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
            top: "-60%",
            height: "400px",
            justifyContent: "space-around",
            alignItems: "center",
           
          },
        
    },
    mainContentBlock: {
        paddingBottom: "21%",
        paddingTop: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('md')]: {
            paddingTop: "0px",
            paddingBottom: "0px",
            marginBottom: "0px",
          },
    },
   
   
   
  });




class Home extends React.Component {
    state = {
        open: false,
        imgSrc: null
      };
    
    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };
    render(){
        
        const { classes, dispatch } = this.props;
        const { open } = this.state;
        return (
            <div className={classes.root}>
              <AppBanner />
              <div className={classes.mainContent}>
              <div className={classes.mainContentBlock}>
              <Button variant="raised" size="large" color="primary" className={classes.button}>
                WMV TOKEN
              </Button>
              </div>
              <div className={classes.mainContentBlock}>
              <Button variant="raised" size="large" color="primary" className={classes.button}>
                WMV EXCHANGE
              </Button>
              </div>
              <div className={classes.mainContentBlock}>
              <Button variant="raised" size="large" color="primary" className={classes.button}>
                WMV BISNESS
              </Button>
              </div>
              
           
               
               
               
 
            </div>
             
          </div>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  function mapUserState(state){
      return {
          user: state.AppUser
      }
  }
  
export default connect(mapUserState)(withStyles(styles)(Home));