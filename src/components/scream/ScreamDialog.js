import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataAction';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';
import Comments from './Comments';


const styles = {
    palette: {
        primary: {
          light: '#757ce8',
          main: '#4fc3f7',
          dark: '#000084',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff7961',
          main: '#e6ee9c',
          dark: '#ba000d',
          contrastText: '#000',
        },
      },
      typography: {
        useNextVariants: true,
      },
      invisibleSeparator: {
          border : 'none',
          margin : 4
      },
      profileImage:{
          maxWidth: 170,
          height : 170,
          borderRadius: '50%',
          Objectfit : 'cover'
      },
      dialogContent:{
          padding: 20
      },
      closeButton:{
          position:'absolute',
          left : '90%'
      },
      expandButton: {
          position:'absolute',
          left:'90%'
      },
      spinner:{
          textAlign : 'center',
          marginTop : 50,
          marginBottom : 50
      },
      visibleSeparator:{
          width : '100%',
          borderBottom :'1px solid rgba(0,0,0,0.1)',
          marginBottom: 20
      }
}

class ScreamDialog extends Component {

    state = {
        open : false
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        this.setState({ open : false});
    }

    render() {
        const { classes, scream : { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle,comments}, UI : {loading }} = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.spinner}>
                <CircularProgress size = {200} thickness={1}/>
            </div>
        ) : (
            <Grid container spacing ={10}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color = "primary"
                        variant="h5"
                        to={`/users/${userHandle}`}>
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD, YYYY')}
                        </Typography>
                        <hr className = {classes.invisibleSeparator}/>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <LikeButton screamId={screamId}/>
                        <span>{likeCount}</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} comments</span>
                </Grid>
                <Comments comments={comments} />
                console.log("sorry");
                <hr className = {classes.visibleSeparator} />
                {/* <Comments comments={comments} /> */}
            </Grid>
        )
            return (
                <Fragment>
                    <MyButton onClick={this.handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
                        <UnfoldMore color="primary" />
                        </MyButton>
                        <Dialog
                             open={this.state.open}
                             onClose={this.handleClose}
                             fullWidth
                             maxWidth="sm"
                           >
                             <MyButton
                               tip="Close"
                               onClick={this.handleClose}
                               tipClassName={classes.closeButton}
                             >
                               <CloseIcon />
                             </MyButton>
                             <DialogContent className={classes.dialogContent}>
                                 {dialogMarkup}
                             </DialogContent>
                        </Dialog>
                </Fragment>
            )
    }

}


ScreamDialog.propTypes = {
    getScream : PropTypes.func.isRequired,
    screamId : PropTypes.object.isRequired,
    userHandle : PropTypes.object.isRequired,
    scream : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    scream : state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));