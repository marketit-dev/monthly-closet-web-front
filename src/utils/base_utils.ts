import { useHistory } from 'react-router-dom';

export const goHistory = (path: string) => {
    const history = useHistory();
    history.push(path);
};

export const checkFile = (name: string) => {
    if (name.includes('file') || name.includes('images')) return true;
    return false;
};

export const getObjectByKey = (object: { [x: string]: any }, key: string | number) => object[key];
