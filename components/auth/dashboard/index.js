import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import OutstandingTasks from './outstanding/index';
import InProgressTasks from './inProgress/index';
import CompletedTasks from './completed/index';

/**
 * Bottom tabs function
 * @return
 */
const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="OutstandingTasks"
            tabBarOptions={{
                activeTintColor: '#796eff',
            }}
        >
            <Tab.Screen 
                name="TO DO" 
                component={OutstandingTasks} 
                options={{
                    tabBarLabel: 'TO DO',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="tasks" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen 
                name="IN PROGRESS" 
                component={InProgressTasks} 
                options={{
                    tabBarLabel: 'IN PROGRESS',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="tasks" color={color} size={size} />
                    )
                }}
            />            
            <Tab.Screen 
                name="COMPLETED" 
                component={CompletedTasks} 
                options={{
                    tabBarLabel: 'COMPLETED',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="tasks" color={color} size={size} />
                    )                    
                }}                
            />
        </Tab.Navigator>  
    );
}

/**
 * Dashboard function
 * @export
 * @return
 */
export default function Dashboard() {

    return (
        <NavigationContainer>
            <BottomTabs />
        </NavigationContainer>       
    );
}