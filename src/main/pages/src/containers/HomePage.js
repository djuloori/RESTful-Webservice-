import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import ToolbarView from "../shared/ToolbarView";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/es/Typography/Typography";
import Slide from '@material-ui/core/Slide';
import MasonryGrid from '../components/MasonryGrid';

const styles = theme => ({
    root: {
        display: 'flex',
    },

    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        display: 'inline-block',
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    introText: {

        fontSize: '80px',
        marginTop: theme.spacing.unit * 30,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(800 + theme.spacing.unit * 80 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    masonry: {
        marginTop: theme.spacing.unit * 20,
        marginRight: theme.spacing.unit * 10,
        display: 'inline-block',
        width: '60%',
        height: '100%'
    }
});

class HomePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        var { isLoaded, items } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <ToolbarView/>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Typography className={classes.introText}>Welcome <br/> to Whiteboard</Typography>
                    </Slide>

                </main>
                <div className={classes.masonry}>
                    <MasonryGrid/>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (HomePage);