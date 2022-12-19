import PropTypes from 'prop-types';
import React from 'react'
import classNames from 'classnames';
import {connect} from 'react-redux';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
  } from 'material-ui/Dialog';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import MessageInfo from './MessageInfo';
import { CircularProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemText } from 'material-ui/List';



const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 0,
    display: "inline-block"
  },

  loading: {
    height: "449px",
    backgroundColor: "rgba(49, 112, 148, 0.2)",
    position: "absolute",
    zIndex: "90000",
    top: "-89px",
    width: "311px",
    left: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexDirection: "column"
    
  },
  button: {
    margin: theme.spacing.unit*0.5,
    color: "white",
    fontWeight: 'bolder',
    fontSize: '20px',
    ListItemText: {
        color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      margin: "-16.2px",
      color: "white",
      fontWeight: 'bolder',
      fontSize: '18px',
      ListItemText: {
          color: 'white',
      },
    },
  },
    margin: {
        margin: theme.spacing.unit,
      },
    withoutLabel: {
    marginTop: theme.spacing.unit * 3,
    },
    textField: {
    flexBasis: 50,
    },
    formControl: {
    margin: theme.spacing.unit,
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    }

});

class RegisterLoginModal extends React.Component{

      constructor(props){
          super(props);


          this.state = {
            regOpen: false,
            username: "",
            password: "",
            passwordRepeat: "" ,
            showPassword: false,
            isLoading: false,
            MessageInfoOpen: false,
            MessageInfoContent: "",
          }
          
      }

      componentWillReceiveProps(nextProps){
        const {user} = nextProps;
        if(user.openRegWin){
          this.setState({
            regOpen: true,
          })
        }
        if(user.regFailReason === "" && user.id !== ""){
          this.setState({
            MessageInfoOpen: true,
            MessageInfoContent: "注册成功",
          });
          setTimeout(()=>{
            this.handleRegClose();
          },2000)
        }
        if(user.regFailReason !== ""){
          return this.setState({
            MessageInfoOpen: true,
            MessageInfoContent: "注册失败",
          })
        }
      }
    
      handleRegClickOpen = () => {
        window.location.assign("https://docs.google.com/forms/d/e/1FAIpQLSdhFajVIn-tFlutIVaaGdv7BeTvzX_5yCYTGuybHuc6T1SGqQ/viewform");
        // this.setState({ regOpen: true });
      };
    
      handleRegClose = () => {
        this.setState({ regOpen: false, username: '', password: '', passwordRepeat: '', showPassword: '' });
      }
      handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      }
    
      handleMouseDownPassword = event => {
        event.preventDefault();
      }
    
      handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
      }
      handleRegister(){
        const {dispatch} = this.props;
        //校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串 
        let  user_patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;

        let passwd_patrn = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;

         if (!user_patrn.exec(this.state.username)){
          this.setState({
            MessageInfoContent: "登录名错误,只能输入5-20个以字母开头、可带数字、“_”、“.”的字串",
            MessageInfoOpen: true,
          })
          return false;
        }
        console.log(this.state.password);
        if(this.state.password === ""){
          this.setState({
            MessageInfoContent: "密码不得为空",
            MessageInfoOpen: true,
          })
          return false;
        }
        
        if(!passwd_patrn.exec(this.state.password)){
          this.setState({
            MessageInfoContent: "密码格式应该为字母+数字，字母+特殊字符，数字+特殊字符 ",
            MessageInfoOpen: true,
          })
          return false;
        }
        if(this.state.password !== this.state.passwordRepeat){
          this.setState({
            MessageInfoContent: "两次密码不一致",
            MessageInfoOpen: true,
          })
          return false;
        }
        
      }
      handleMessageInfoClose(open){
        console.log(open);
        this.setState({
          MessageInfoOpen: !open,
        })
      }
      

  render(){
    const { classes, user } = this.props;
      return(
        <div className={classes.root}>
           
            <Button onClick={this.handleRegClickOpen} className={classes.button}>
                Login
            </Button>
            <Button onClick={this.handleRegClickOpen}  className={classes.button}>
                Register
            </Button>
            <Dialog
            open={this.state.regOpen}
            onClose={this.handleRegClose}
            aria-labelledby="responsive-dialog-title"
            >
          <DialogTitle id="responsive-dialog-title">{"注册成为币圈名字的会员"}</DialogTitle>
          <DialogContent  className={classes.container}>
        <MessageInfo content={this.state.MessageInfoContent} handleClose={()=>this.handleMessageInfoClose(this.state.MessageInfoOpen)} open={this.state.MessageInfoOpen} vertical="top" horizontal="center"/>
          
            <div className={classes.loading} style={{display: user.loading ? "flex": "none"}}>
              <h3>载入中，请稍候</h3>
              <br />
              <CircularProgress className={classes.progress} color="primary" />
            </div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="username-input">用户名</InputLabel>
                <Input id="username-input" value={this.state.username} onChange={this.handleChange('username')} />
            </FormControl>
           
            <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password-input">密码</InputLabel>
                <Input
                    id="password-input"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        onClick={this.handleClickShowPasssword}
                        onMouseDown={this.handleMouseDownPassword}
                        >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password-repeat">重复密码</InputLabel>
                <Input
                    id="password-repeat"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.passwordRepeat}
                    onChange={this.handleChange('passwordRepeat')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        onClick={this.handleClickShowPasssword}
                        onMouseDown={this.handleMouseDownPassword}
                        >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <div style={{display: 'flex', justifyContent: "center"}}>查看注册条款</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRegister.bind(this)} color="primary">
              同意条款并且注册
            </Button>
            <Button onClick={this.handleRegClose} color="primary" autoFocus>
              取消
            </Button>
          </DialogActions>
        </Dialog>
        
        </div>
  
      )
    
  
    
  }
}
RegisterLoginModal.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapAppUser(state){
  return {
    user: state.AppUser,
  }
}
  

export default connect(mapAppUser)(withRoot(withStyles(styles)(RegisterLoginModal)));