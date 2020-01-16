import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from '../../store/reducer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

const validationSchema=Yup.object().shape({
  email:Yup.string()
  .email('Must be a valid email address')
  .max(255,'Maximum of 255 characters')
  .required('This is a required field'),
  password:Yup.string()
  .min(8,'Minimum of 8 characters')
  .max(16,'Maximum of 16 characters')
  .required('This is a required field')
})

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const handleBack = () => {
    history.goBack();
  };


  const handleSignIn = event => {
    event.preventDefault();
    history.push('/');
  };


  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Takamaru Ayako
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
            <Formik 
            initialValues={{email:'',password:''}}
            validationSchema={validationSchema}
            onSubmit={(values,{setSubmitting,resetForm})=>{
                props.submitForm(values)
            }}
            >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
              })=>(
              <form
                className={classes.form}
                noValidate onSubmit={handleSubmit}
              >
                {props.authFail?
                    <Typography variant="body1" color="error" className={classes.title} >{props.authError}</Typography>
                :null}
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sign in
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Sign in with social media
                </Typography>
                <Grid
                  className={classes.socialButtons}
                  container
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <GoogleIcon className={classes.socialIcon} />
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email address
                </Typography>
                <TextField 
                    className={classes.textField}
                    id="email"  
                    error={touched.email && errors.email?true:false}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    value={values.email}  
                    label="Email" 
                    fullWidth 
                    InputProps={{name:'email',type:"email"}} 
                    helperText={touched.email && errors.email?errors.email:''}
                    required/>
                <TextField 
                    className={classes.textField}
                    id="password"  
                    error={touched.password && errors.password?true:false}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    value={values.password}  
                    label="Password" 
                    fullWidth 
                    InputProps={{name:'password',type:'password'}} 
                    helperText={touched.password && errors.password?errors.password:''}
                    required/>
                <Button
                  className={classes.signInButton}
                  color="primary" 
                  size="medium" 
                  type="submit"
                  disabled={props.authStart}
                  variant="contained"
                >
                  Login
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
              )}
              </Formik>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

const mapDispatchToProps=dispatch=>({
  submitForm:(values)=>{
      dispatch({type:'AUTH_START'})
      fetch('http://localhost:3001',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(values)
      }).then(res=>res.json()).then(res=>{
          let statusCode=res.status
          switch(statusCode){
              case 200:dispatch({type:'AUTH_SUCCESS'})
                  break;
              default:dispatch({type:'AUTH_FAIL',payload:{error:res.error}})
          }
      }).catch(err=>{
          dispatch({type:'AUTH_FAIL',payload:{error:'An unknown error occured, please check your network and try again'}})
      })
  }
})

const mapStateToProps=state=>({
  authStart:state.authStart,
  authSuccess:state.authSuccess,
  authFail:state.authFail,
  authError:state.authError
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignIn));
