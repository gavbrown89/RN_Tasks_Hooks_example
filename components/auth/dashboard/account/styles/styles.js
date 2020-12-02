import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: '#796eff',
        textAlign: 'right',
        width: Dimensions.get('window').width
    },
    iconBtn: {
        textAlign: 'right', 
        borderWidth: 0.5, 
        borderColor: '#fff', 
        borderRadius: 25/2, 
        width: 25, 
        height: 25, 
        justifyContent: 'center', 
        alignSelf: 'flex-end', 
        alignItems: 'center',
        marginRight: 5,
        marginTop: 2
    },
    modalCloseBtn: {
        backgroundColor: '#796eff',
        width: Dimensions.get('window').width
    }, 
    header: {
        backgroundColor: '#796eff',
        height: Dimensions.get('window').height / 3,
        justifyContent: 'flex-start',
    },
    h1: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 25,
        paddingBottom: 20,
        paddingLeft: 20
    },
    userIcon: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: 110,
        height: 110,
        borderRadius: 110/2,
        marginTop: -50,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,        
    },
    topInfo: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingBottom: 50,
        marginLeft: 20,
        marginRight: 20
    },
    bottomInfo: {
        paddingLeft: 20,
        paddingRight: 10
    },
    gridContain: {
        paddingTop: 20
    }
});

export { styles };