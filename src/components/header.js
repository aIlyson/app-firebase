import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../db/firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../core/theme'

const StatusBarHeight = StatusBar.currentHeight;

const Header = ({ title, drawer, logout }) => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await signOut(auth).then(() => {
                console.log('saindo...');
                navigation.navigate('Login');
            });
        } catch (error) {
            console.error('Erro ao sair:', error.message);
        }
    };

    const handleDrawer = () => {
        if (drawer) {
            navigation.openDrawer();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {drawer && (
                    <TouchableOpacity style={styles.headerBtn} onPress={handleDrawer}>
                        <FontAwesome name="align-left" style={styles.icon} />
                    </TouchableOpacity>
                )}
                <Text style={styles.titleHeader}>{title}</Text>
                {logout && (
                    <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                        <Text style={styles.textBtn}>Logout</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.secondary,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 8,
        zIndex: 1,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBarHeight + 12,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    icon: {
        fontSize: 20,
        color: theme.colors.btnText,
    },
    headerBtn: {
        padding: 8,
    },
    titleHeader: {
        color: theme.colors.btnText,
        fontSize: 23,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    logout: {
        backgroundColor: theme.colors.error,
        marginTop: 2,
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textBtn: {
        color: theme.colors.btnText,
        fontSize: 15,
    },
});

export default Header;
