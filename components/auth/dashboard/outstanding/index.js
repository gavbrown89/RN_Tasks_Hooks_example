import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Modal
} from 'react-native';
import {
    ListItem,
} from 'react-native-elements';
import { useNavigationParam } from 'react-navigation-hooks';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import {styles} from './styles/styles';
import AccountHeader from '../account/header';

const FormData = require('form-data');

/**
 * Task array variables
 */
var allTasksArray = [];
var outstandingArray = [];
var pendingTasksArray = [];
var updateTasksArray = [];

const OutstandingTasks = () => {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState();
    const [taskAssignee, setTaskAssignee] = useState();
    const [taskCreated, setTaskCreated] = useState();
    const [taskDue, setTaskDue] = useState();
    const [taskPriority, setTaskPriority] = useState();
    const [url, setUrl] = useState();
    const id = useNavigationParam('id');
    const userName = useNavigationParam('name');
    const userRole = useNavigationParam('role');
    const taskUrl = useNavigationParam('taskUrl');

    /** 
     * Fetch initial data
     */
    function fetchData() {        
        allTasksArray.length = 0;
        outstandingArray.length = 0;        
        axios.get(taskUrl, {
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
                    allTasksArray.length = 0;
                    outstandingArray.length = 0;
                } else {
                    allTasksArray.push(dataValues[i]);
                    for (let j = 0; j < dataValues[i].length; j++) {
                        if (dataValues[i][j].is_complete == 0) {
                            outstandingArray.push(dataValues[i][j]);
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
                        if (dataValues[i][j].is_complete == 0) {
                            updateTasksArray.push(dataValues[i][j]);
                        }
                    }
                } 
            }     
            if (outstandingArray.length != updateTasksArray.length) {
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
                    <TouchableOpacity 
                        onPress={() => {setModalVisible(false)}}
                        style={styles.modalCloseBtn}
                        activeOpacity={1}
                        >
                        <SimpleLineIcons 
                            name="close"
                            color='#fff'
                            style={{ textAlign: 'right', marginRight: 10, marginTop: 5}}
                            size={20}
                        />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Text style={styles.h1}>{taskTitle}</Text>
                    </View>         
                    <View>
                        <ListItem bottomDivider>
                            <ListItem.Content style={{ justifyContent: 'center' }}>
                                <ListItem.Title>
                                    <SimpleLineIcons 
                                        name="clock"
                                        size={18}
                                    />
                                    {' '} Created
                                </ListItem.Title>
                                <ListItem.Subtitle style={{ paddingLeft: 27 }}>{taskCreated}</ListItem.Subtitle>
                            </ListItem.Content> 
                            <ListItem.Content  style={{ justifyContent: 'center' }}>
                                <ListItem.Title>
                                    <SimpleLineIcons 
                                        name="clock"
                                        size={18}
                                    />
                                    {' '} Due
                                </ListItem.Title>
                                <ListItem.Subtitle  style={{ paddingLeft: 27 }}>{taskDue}</ListItem.Subtitle>    
                            </ListItem.Content>   
                        </ListItem>   
                        <ListItem bottomDivider>
                            <ListItem.Content style={{ justifyContent: 'center'}}>
                                <ListItem.Title style={{ paddingLeft: 20}}>
                                    Priority
                                </ListItem.Title>
                                    <ListItem.Subtitle style={{ textTransform: 'capitalize' }}>
                                        {(taskPriority == 'critical') &&
                                            <Feather 
                                                name="chevrons-up"
                                                size={20}
                                                color='#d9534f'
                                            />
                                        }   
                                        {(taskPriority == 'major') &&
                                            <Feather 
                                                name="chevron-up"
                                                size={20}
                                                color='#d9534f'
                                            />
                                        } 
                                        {(taskPriority == 'minor') &&
                                            <Feather 
                                                name="chevron-down"
                                                size={20}
                                                color='#f0ad4e'
                                            />
                                        } 
                                        {(taskPriority == 'trivial') &&
                                            <Feather 
                                                name="chevrons-down"
                                                size={20}
                                                color='#5bc0de'
                                            />
                                        }                                                                                                                                                              
                                        {taskPriority}
                                    </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem> 
                    </View>           
                </View>
            </Modal>            
            <View style={styles.header}>
                <Text style={{ color: '#fff'}}>Welcome,</Text>
                <Text style={styles.h1}>{userName}</Text>
            </View>
            <View style={styles.taskContainer}>
               
                {(loading == true) &&
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#796eff" />
                    </View>
                }
                {(loading == false && outstandingArray.length == 0) &&
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyContent}>No current outstanding tasks.</Text>
                    </View>
                }
                {(loading == false && outstandingArray.length != 0) &&
                    <View style={{ marginTop: 30}}>
                    {
                        outstandingArray.map((task, index) => (
                            <ListItem key={index + 1} bottomDivider button 
                                onPress={() => {
                                    setModalVisible(true); 
                                    setTaskTitle(task.title);
                                    setTaskAssignee(task.assignee);
                                    setTaskCreated(task.start_date);
                                    setTaskDue(task.end_date);
                                    setTaskPriority(task.priority);
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

export default OutstandingTasks;