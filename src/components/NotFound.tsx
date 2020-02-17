import * as React from 'react';
import { Helmet } from 'react-helmet';

function NotFound() {
    return (
        <div className="App-container">
            <Helmet>
                <title>월간 클로젯</title>
            </Helmet>
            <h1>Not Found</h1>
            <p>Page no Found!!</p>
        </div>
    );
}

export default NotFound;
