import React, {useEffect, useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

interface ToastProps {
    message: string
}

export default function Toast(props: ToastProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (props.message) {
            setOpen(true);
        }
    }, [props.message]);

    return(
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            message={props.message}
            key={'topcenter'}
            autoHideDuration={4000}
            action={
                <React.Fragment>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        x
                    </IconButton>
                </React.Fragment>
            }/>
    );
}