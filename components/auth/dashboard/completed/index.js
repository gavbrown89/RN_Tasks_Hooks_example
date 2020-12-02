import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
} from 'react-native';
import {
    ListItem,
} from 'react-native-elements';
import { useNavigationParam } from 'react-navigation-hooks';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {styles} from './styles/styles';
import AccountHeader from '../account/header';

const FormData = require('form-data');

/**
 * Task array variables
 */
var allTasksArray = [];
var completedArray = [];
var pendingTasksArray = [];
var updateTasksArray = [];

const CompletedTasks = () => {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState();
    const [taskAssignee, setTaskAssignee] = useState();

    const [url, setUrl] = useState();
    const id = useNavigationParam('id');
    const userRole = useNavigationParam('role');
    const taskUrl = useNavigationParam('taskUrl');

    async function fetchData() {     
        allTasksArray.length = 0;
        completedArray.length = 0;        
        axios.get(taskUrl , {
            params: {
                id: id
            }
        })
        .then(response => response.data)
        .then((data) => {
            console.log(data);

            const dataValues = Object.values(data);
            for (let i in dataValues) {
                if (dataValues[i] == undefined) {
                    allTasksArray.length = 0;
                    completedArray.length = 0;
                } else {
                    allTasksArray.push(dataValues[i]);
                    for (let j = 0; j < dataValues[i].length; j++) {
                        if (dataValues[i][j].is_complete == 2) {
                            completedArray.push(dataValues[i][j]);
                        }
                    }
                }                
            }            
            setLoading(false);
        })
        .catch(function (error) {
            if (error.response) {
                console.log('Resonse error: ', error.response);
            } else if (error.request) {
                console.log('Request error: ', error.request);
            } else {
                console.log('Error message: ', error.message);
            }
        })          
    }

    /**
     *  Check API for updated data
     */   
    function pendingTasks() {     
       
        pendingTasksArray.length = 0;
        axios.get(taskUrl , {
            params: {
                id: id
            }
        })
        .then(response => response.data)
        .then((data) => {
            // console.log(data);

            const dataValues = Object.values(data);
            for (let i in dataValues) { 
                if (dataValues[i] == undefined) {
                    pendingTasksArray.length = 0;
                } else {
                    pendingTasksArray.push(dataValues[i]);
                    for (let j = 0; j < dataValues[i].length; j++) {
                        if (dataValues[i][j].is_complete == 2) {
                            updateTasksArray.push(dataValues[i][j]);
                        }
                    }
                } 
            }     
            if (completedArray.length != updateTasksArray.length) {
                setLoading(true);
                pendingTasksArray.length = 0;
                updateTasksArray.length = 0;
                return fetchData()
            }    
            pendingTasksArray.length = 0;
            updateTasksArray.length = 0;

        })
        .catch(function (error) {
            if (error.response) {
                console.log('Resonse error: ', error.response);
            } else if (error.request) {
                console.log('Request error: ', error.request);
            } else {
                console.log('Error message: ', error.message);
            }
        }) 
    }    

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            pendingTasks();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <AccountHeader />
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
            >
                <View>
                    <TouchableOpacity onPress={() => {setModalVisible(false)}}>
                        <SimpleLineIcons 
                            name="close"
                            style={{ textAlign: 'right', marginRight: 10, marginTop: 5}}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Text style={styles.h2}>{taskTitle}</Text>
                    <Text style={{ fontWeight: 'bold'}}>{taskAssignee}</Text>
                </View>
            </Modal>
            <View style={styles.header}>
                <Text style={styles.h1}>Completed Tasks</Text>
            </View>
            <View style={styles.taskContainer}>

                {(loading == true) &&
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#796eff" />
                    </View>
                }
                {(loading == false && completedArray.length == 0) &&
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyContent}>No current completed tasks.</Text>
                    </View>
                }
                {(loading == false && completedArray.length != 0) &&
                    <View style={{ marginTop: 30}}>
                        {
                            completedArray.map((task, index) => (
                                <ListItem key={index + 1} bottomDivider button 
                                    onPress={() => {
                                        setModalVisible(true); 
                                        setTaskTitle(task.title);
                                        setTaskAssignee(task.assignee)
                                    }}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>{task.title}</ListItem.Title>
                                        <ListItem.Subtitle style={{textTransform: 'capitalize'}}>{task.priority}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            ))
                        }
                    </View>
                }
            </View>
        </View>     
    );
}

export default CompletedTasks;