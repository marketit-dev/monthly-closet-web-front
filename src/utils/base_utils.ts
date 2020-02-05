import { useHistory } from 'react-router-dom';

export const goHistory = (path: string) => {
    const history = useHistory();
    history.push(path);
};

export const goHistory2 = (path: string) => {
    const history = useHistory();
    history.push(path);
};
