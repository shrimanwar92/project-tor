import React, {useEffect, useState} from "react";
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import {AlertType} from "shared/components/page-alert/use-alert.hook";
import './page-alert.less';

interface ErrorProps {
    type: AlertType | undefined,
    errorMessage: string,
    children: JSX.Element
}

export function PageAlert(props: ErrorProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        props.errorMessage && setOpen(true);
    }, [props.errorMessage]);

    return(
        <>
            <Snackbar
                className={'tor-page-alert__snackbar'}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.type}>
                    {props.errorMessage}
                </Alert>
            </Snackbar>
            {props.children}
        </>
    );
}