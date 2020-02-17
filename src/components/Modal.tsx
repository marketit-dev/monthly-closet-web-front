import React, { useState, ChangeEvent } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import '../styles/main.scss';

type CustomModalProps = {
    submit: (args0: any) => void;
    title: string;
    inputTypeKeys: Array<string>;
    inputTypes: Array<string>;
};
const CustomModal = ({ submit, title, inputTypeKeys, inputTypes }: CustomModalProps) => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('select profile');
    const inputObject = inputTypeKeys.reduce((ac, a) => {
        if (a.includes('files')) return { ...ac, [a]: [] };
        return { ...ac, [a]: '' };
    }, {});
    const [inputFormat, setInputFormat] = useState(inputObject);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleSubmit = () => {
        submit(inputFormat);
        setInputFormat(inputObject);
        setShow(false);
    };

    const getObjectByKey = (object: Record<string, any>, key: string) => {
        return object[key];
    };

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = event.target;
        setInputFormat(preInput => ({
            ...preInput,
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
                    setInputFormat((prevInputFormat: {}) => {
                        if (!getObjectByKey(prevInputFormat, name).includes(event.target!.result))
                            return {
                                ...prevInputFormat,
                                [name]: [...getObjectByKey(prevInputFormat, name), event.target!.result],
                            };
                        return prevInputFormat;
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
                className="modal-container"
            >
                <div>
                    <form noValidate autoComplete="off" className="d-flex flex-column" style={{ color: 'white' }}>
                        {inputTypes.map((inputType, index) => {
                            const inputTypeKey = inputTypeKeys[index];
                            const input = getObjectByKey(inputFormat, inputTypeKey);
                            if (inputTypeKey.includes('files'))
                                return (
                                    <div className="text-field" key={inputType}>
                                        <label
                                            htmlFor={inputType}
                                            className="km-button km-button--primary km-btn-file-label"
                                        >
                                            <span>{inputType}</span>
                                        </label>
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
                                            {input.map((file: string, imageIndex: number) => {
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
                            return (
                                <TextField
                                    key={inputType}
                                    id="standard-secondary"
                                    label={inputType}
                                    name={inputTypeKeys[index]}
                                    onChange={onChange}
                                    value={input}
                                    className="text-field"
                                />
                            );
                        })}
                    </form>
                    <Button variant="outlined" color="secondary" onClick={handleSubmit}>
                        제출하기
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default CustomModal;
