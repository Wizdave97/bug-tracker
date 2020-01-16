import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from '../../store/reducer';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const validationSchema=Yup.object().shape({
  firstName:Yup.string()
  .min(3,'Minimum of three characters')
  .max(255,'Maximum of 255 characters')
  .required('This is a required field'),
  lastName:Yup.string()
  .min(3,'Minimum of three characters')
  .max(255,'Maximum of 255 characters')
  .required('This is a required field'),
  email:Yup.string()
  .email('Must be a valid email address')
  .max(255,'Maximum of 255 characters')
  .required('This is a required field'),
  mobileNumber:Yup.string()
  .min(11,'Minimum of 11 characters')
  .max(11,'Maximum of 11 characters')
  .required('This is a required field'),
  password:Yup.string()
  .min(8,'Minimum of 8 characters')
  .max(16,'Maximum of 16 characters')
  .required('This is a required field'),
  policy:Yup.boolean().required('You must agree to terms and conditions of use')
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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

 

  const handleBack = () => {
    history.goBack();
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
                initialValues={{firstName:'',lastName:'',mobileNumber:'',email:'',password:'',policy:false}}
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
                noValidate 
                onSubmit={handleSubmit}
              >
              {props.signUpFail?
                    <Typography variant="body1" color="error" >{props.signUpError}</Typography>
               :null}
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Create new account
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Use your email to create new account
                </Typography>
                <TextField
                  className={classes.textField}
                  id="firstname"
                  error={touched.firstName && errors.firstName?true:false}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  value={values.firstName}  
                  label="First Name" 
                  fullWidth 
                  helperText={touched.firstName && errors.firstName?errors.firstName:''}
                  InputProps={{name:'firstName'}} 
                  required
                />
                <TextField
                  className={classes.textField}
                  id="lastname" 
                  error={touched.lastName && errors.lastName?true:false}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  value={values.lastName}   
                  label="Last Name" 
                  fullWidth 
                  helperText={touched.lastName && errors.lastName?errors.lastName:''}
                  InputProps={{name:'lastName'}} 
                  required
                />
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
                  required
                />
                <TextField 
                  className={classes.textField}
                  id="mobilenumber" 
                  error={touched.mobileNumber && errors.mobileNumber?true:false}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  value={values.mobileNumber}  
                  label="Mobile Number" 
                  InputProps={{name:'mobileNumber'}} 
                  helperText={touched.mobileNumber && errors.mobileNumber?errors.mobileNumber:''}
                  fullWidth required/>
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
                  required
                />
                <div className={classes.policy}>
                  <Checkbox
                    checked={values.policy || false}
                    className={classes.policyCheckbox}
                    id="policy"  
                    error={touched.policy && errors.policy?"true":"false"}
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    name='policy' 
                    required
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div>
                {touched.policy && errors.policy && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={props.startSignUp}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    Sign in
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

SignUp.propTypes = {
  history: PropTypes.object
};

const mapDispatchToProps=dispatch=>({
  submitForm:(values)=>{
      dispatch({type:'SIGNUP_START'})
      fetch('http://localhost:3001',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(values)
      }).then(res=>res.json()).then(res=>{
          let statusCode=res.status
          switch(statusCode){
              case 200:dispatch({type:'SIGNUP_SUCCESS'})
                  break;
              default:dispatch({type:'SIGNUP_FAIL',payload:{error:res.error}})
          }
      }).catch(err=>{
          dispatch({type:'SIGNUP_FAIL',payload:{error:'An unknown error occured, please check your network and try again'}})
      })
  }
})

const mapStateToProps=state=>({
  startSignUp:state.startSignUp,
  signUpSuccess:state.signUpSuccess,
  signUpFail:state.signUpFail,
  signUpError:state.signUpError
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUp));
