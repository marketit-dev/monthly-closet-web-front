import React, { useState, ChangeEvent } from 'react';
import { Button, TextField, Modal, InputLabel } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import '../styles/main.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

type CustomModalProps = {
    submit: (args0: any) => void;
    title: string;
    inputTypeKeys: Array<string>;
    inputTypes: Array<string>;
};
const CustomModal = ({ submit, title, inputTypeKeys, inputTypes }: CustomModalProps) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('select profile');
    const inputObject = inputTypeKeys.reduce((ac, a) => {
        if (a.includes('files')) return { ...ac, [a]: [] };
        return { ...ac, [a]: '' };
    }, {});
    const inputFileObject = inputTypeKeys.reduce((ac, a) => {
        if (a.includes('files')) return { ...ac, [a]: [] };
        return ac;
    }, {});
    const [inputFormat, setInputFormat] = useState(inputObject);
    const [fileFormat, setFileFormat] = useState(inputFileObject);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleSubmit = () => {
        submit(inputFormat);
        setInputFormat(inputObject);
        setFileFormat(inputFileObject);
        setShow(false);
    };

    const getObjectByKey = (object: Record<string, any>, key: string) => {
        return object[key];
    };

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = event.target;
        setInputFormat(prevInput => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handlePopFile = (inputTypeKey: string, number: number) => {
        setInputFormat((prevInputFormat: {}) => {
            const spliceObject = getObjectByKey(prevInputFormat, inputTypeKey);
            spliceObject.splice(number, 1);
            return {
                ...prevInputFormat,
                [inputTypeKey]: spliceObject,
            };
        });
        setFileFormat((prevInputFormat: {}) => {
            const spliceObject = getObjectByKey(prevInputFormat, inputTypeKey);
            spliceObject.splice(number, 1);
            return {
                ...prevInputFormat,
                [inputTypeKey]: spliceObject,
            };
        });
    };

    const handleChangeImage = (e: { target: { name: string; files: FileList | null; value: any } }) => {
        const { files, value, name } = e.target;

        if (files && files.length > 1) setMessage(`${files.length} files selected`);
        else if (files && files.length === 1) {
            setMessage(value.split('\\').pop());
        } else return;

        for (let index = 0; index < files.length; ++index) {
            const fileReader = new FileReader();
            fileReader.onload = event => {
                if (event.target) {
                    setFileFormat((prevFileFormat: {}) => {
                        if (!getObjectByKey(prevFileFormat, name).includes(event.target!.result)) {
                            setInputFormat((prevInputFormat: {}) => {
                                if (!getObjectByKey(prevInputFormat, name).includes(files[index]))
                                    return {
                                        ...prevInputFormat,
                                        [name]: [...getObjectByKey(prevInputFormat, name), files[index]],
                                    };
                                return prevInputFormat;
                            });
                            return {
                                ...prevFileFormat,
                                [name]: [...getObjectByKey(prevFileFormat, name), event.target!.result],
                            };
                        }
                        return prevFileFormat;
                    });
                }
            };
            fileReader.readAsDataURL(files[index]);
        }
    };

    return (
        <div className="modal-view">
            <Button type="button" className="modal-button" variant="outlined" color="primary" onClick={handleOpen}>
                {title}
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={show}
                onClose={handleClose}
                closeAfterTransition
            >
                <div className={`modal-container ${classes.paper}`}>
                    <form noValidate autoComplete="off" className="d-flex flex-column">
                        {inputTypes.map((inputType, index) => {
                            const inputTypeKey = inputTypeKeys[index];
                            const input = getObjectByKey(inputFormat, inputTypeKey);
                            if (inputTypeKey.includes('files')) {
                                const files = getObjectByKey(fileFormat, inputTypeKey);
                                return (
                                    <div className="text-field" key={inputType}>
                                        <InputLabel
                                            htmlFor={inputType}
                                            className="km-button km-button--primary km-btn-file-label"
                                        >
                                            <span>{inputType}</span>
                                        </InputLabel>
                                        <input
                                            id={inputType}
                                            type="file"
                                            multiple
                                            data-multiple-caption={message}
                                            name={inputTypeKey}
                                            onChange={handleChangeImage}
                                        />
                                        <ul
                                            className="d-flex flex-row justify-content-start
"
                                        >
                                            {files.map((file: string, imageIndex: number) => {
                                                return (
                                                    <li key={file}>
                                                        <Avatar alt={inputType} src={file} />
                                                        <div
                                                            role="button"
                                                            onKeyDown={() => handlePopFile(inputTypeKey, imageIndex)}
                                                            onClick={() => handlePopFile(inputTypeKey, imageIndex)}
                                                        >
                                                            <i className="fas fa-minus-circle" />
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                );
                            }
                            return (
                                <TextField
                                    key={inputType}
                                    label={inputType}
                                    name={inputTypeKeys[index]}
                                    onChange={onChange}
                                    value={input}
                                    className="text-field"
                                />
                            );
                        })}
                    </form>
                    <Button variant="outlined" color="primary" onClick={handleSubmit}>
                        제출하기
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default CustomModal;
