import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#0275d8',
        height: Dimensions.get('window').height / 2.5,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    iconContainer: {
        backgroundColor: '#0275d8',
        textAlign: 'right',
        width: Dimensions.get('window').width
    },
    logo: {
        alignSelf: 'center',
        width: 50, 
        height: 50,
    },
    h1: {
        textAlign: 'left',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 25,
        paddingBottom: 80,
    },
    loadingContainer: {
        backgroundColor: '#fff',
        height: Dimensions.get('window').height
    },
    emptyContainer: {
        height: Dimensions.get('window').height,
        alignSelf: 'center',
        paddingTop: '30%'
    },
    emptyContent: {
        backgroundColor: '#796eff',
        color: '#fff',
        padding: 10,
        borderRadius: 5
    },
    taskContainer: {
        position: 'absolute',
        width: '100%',
        top: '37%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    }, 
    refreshContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: -20,
        zIndex: 999,
        width: 40,
        height: 40,
        borderRadius: 40/2
    }, 
    modalCloseBtn: {
        backgroundColor: '#0275d8',
        width: Dimensions.get('window').width
    },
});

export { styles };