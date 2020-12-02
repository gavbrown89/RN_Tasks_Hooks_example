import React from 'react';
import {
    createAppContainer,
} from 'react-navigation';
import {
    createStackNavigator,
} from 'react-navigation-stack';

import SignIn from '../signin/index';
import Dashboard from '../auth/dashboard/index';

const InitialRoutes = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: () => ({
            drawerLabel: () => null,
            header: null,
            gestureEnabled: false,
        }),
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: () => ({
            drawerLabel: () => null,
            header: null,
            getsureEnabled: false,
        }),
    },
}, {
    initialRouteName: 'SignIn',
},);

const Routes = createAppContainer(InitialRoutes);

export default Routes;