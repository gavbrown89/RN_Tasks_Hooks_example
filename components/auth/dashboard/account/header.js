import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { styles } from './styles/styles';

const AccountHeader = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const id = useNavigationParam('id');
    const name = useNavigationParam('name');
    const email = useNavigationParam('email');
    return (
        <View>
            <Modal
                visible={modalVisible}
                animationType="fade"
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
                        <Text style={styles.h1}>My Profile</Text>
                    </View>    
                    <View style={styles.userIcon}>
                        <AntDesign 
                            name="user"
                            color="#333"
                            size={50}
                            style={{ justifyContent: 'center', alignSelf: 'center',}}
                        />
                    </View>       
                    <View style={styles.topInfo}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 15}}>{name}</Text>
                        <Text style={{ fontSize: 12 ,textAlign: 'center', marginTop: 20}}>{email}</Text>
                    </View>                            
                    <View style={styles.bottomInfo}>
                        <Text style={{ fontWeight: 'bold', marginTop: 10}}>Account Information</Text>
                        <View style={styles.gridContain}>
                            <View style={{ flexDirection: 'row', alignItems:'center' }}>
                                <View>
                                    <MaterialCommunityIcons 
                                        name="email"
                                        size={25}
                                        color="#333"
                                        style={{ paddingRight: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold'}}>Email Address</Text>
                                    <Text>{email}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.iconBtn}
            >
                <MaterialCommunityIcons
                    name='account-settings'
                    color='#fff'
                    size={18}
                />
            </TouchableOpacity>
        </View>
    );
}

export default AccountHeader; 