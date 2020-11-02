import React, {ReactElement} from "react";
import {DialogContentText} from "@material-ui/core";
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

interface DialogProps {
    isOpen: boolean,
    onClose: () => void,
    onSave?: () => void,
    title: string,
    subtitle?: string,
    children: ReactElement
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    X
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomDialog(props: DialogProps) {

    return(
        <div>
            <Dialog
                maxWidth={'md'}
                open={props.isOpen}
                onClose={props.onClose}
                aria-labelledby={'max-width-dialog-title'}
                disableBackdropClick={true}
            >
                <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
                    {props.title}
                </DialogTitle>
                <DialogContent dividers>
                    {props.subtitle ? <DialogContentText>{props.subtitle}</DialogContentText> : null}
                    {props.children}
                </DialogContent>
                <DialogActions>
                    {props.onSave ? <Button color={'primary'} onClick={props.onSave}>Save</Button> : null}
                    <Button color={'secondary'} onClick={props.onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}