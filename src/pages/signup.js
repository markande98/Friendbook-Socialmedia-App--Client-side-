import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/dogy.jpg';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userAction';

const styles = {
    form : {
        textAlign: 'center',
    },
  
    image : {
        margin : '20px auto 20px auto',
        height : '45px'
    },
    pageTitle : {
        margin : '15px auto 15px auto'
    },
    textField : {
        margin : '12px auto 12px auto'
    },
    button : {
        marginTop : 20,
        position : 'relative'
    },
    customError : {
        color : 'red',
        fontSize : '0.8rem',
        marginTop : 10
    },
    progress : {
        position : 'absolute'
    }
}
class signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email : '',
             password :'',
             confirmPassword: '',
             handle : '',
             errors : {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors : nextProps.UI.errors});
        }
    }
    

handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
        loading : true
    });
    const newUserData = {
        email : this.state.email,
        password : this.state.password,
        confirmPassword: this.state.confirmPassword,
        handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history);
}
handleChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    });
}

    
    render() {
        const { classes, UI: { loading } } = this.props;
        const {errors} = this.state;
        return (
            <Grid container className= {classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src = {AppIcon} alt="Dogy image" className = {classes.image}/>
                    <Typography variant="h3" className={classes.pageTitle}>
                        SignUp
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email" name="email" type="email" label="email" className={classes.textField}
                        value = {this.state.email} helperText={errors.email} error={errors.email ? true : false} onChange={this.handleChange} fullWidth />
                    <TextField id="password" name="password" type="password" label="password" className={classes.textField}
                        value = {this.state.password} helperText={errors.password} error={errors.password ? true : false} onChange={this.handleChange} fullWidth />
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="confirmPassword" className={classes.textField}
                        value = {this.state.confirmPassword} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} onChange={this.handleChange} fullWidth />
                    <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField}
                        value = {this.state.handle} helperText={errors.handle} error={errors.handle ? true : false} onChange={this.handleChange} fullWidth />
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    <Button type="submit" variant ="contained" color ="primary" className={classes.button} disabled={loading}>Signup
                        {loading && (
                            <CircularProgress  size = {30} className={classes.progress} />
                        )}
                    </Button>
                    <br />
                    <small>
                        <br />
                        Already have an account go => <Link to="/login">Login here</Link>
                    </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

signup.propTypes = {
    classes : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired,
    logoutUser : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user : state.user,
    UI : state.UI
})
export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
