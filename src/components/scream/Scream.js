import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton'; 

const styles = {
    card : {
        position : 'relative',
        display : 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
        objectfit: 'cover',
    },
    content: {
        padding : 25
    }
}

class Scream extends Component {
   
    render() {
        dayjs.extend(relativeTime);
        const { classes, user : {authenticated , credentials : { handle}}, scream : { body, createdAt , userImage, userHandle, screamId, likeCount, commentCount} } = this.props;
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null
       
        return (
           <Card className={classes.card}>
               <CardMedia
               image = {userImage}
               title = "Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                     {deleteButton}
                    <Typography variant="h5" component={Link} to = {`users/${userHandle}`} color = "primary">{userHandle}</Typography>
                    <Typography variant="body2" color = "textSecondary">{dayjs(parseInt(createdAt)).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle}/>
                </CardContent>
           </Card>
        )
    }
}

Scream.propTypes = {
    user : PropTypes.object.isRequired,
    scream : PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    user : state.user
})
export default connect(mapStateToProps)(withStyles(styles)(Scream));
