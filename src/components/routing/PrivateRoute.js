import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';
const HomePage= React.lazy(()=>import ('../../containers/home/HomePage')) ;

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <React.Suspense fallback={<div>Loading...</div>}>
    <Route {...rest} render={props => (
        localStorage.getItem('userId')
            ? <Layout><HomePage {...props} /></Layout>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
    </React.Suspense>
)