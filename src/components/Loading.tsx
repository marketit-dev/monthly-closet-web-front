import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { LoadingComponentProps } from 'react-loadable';
import ActivityIndicator from './ActivityIndicator';

const Loading = (props: LoadingComponentProps) => {
    const { error } = props;
    if (error) {
        return <div>Error!</div>;
    }
    return <ActivityIndicator />;
};

export default Loading;
