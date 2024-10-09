import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Button, Layout, Text } from '@ui-kitten/components';
import { useDeleteAddressMutation } from '@/api';
import { TrashSimple } from 'phosphor-react-native';

const DeleteConfirmationModal = ({ address, refetch }) => {
    const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);
    const [deleteAddress, { error: deleteError, isLoading: isDeleting }] = useDeleteAddressMutation();

    const handleDeleteAddress = async () => {
        try {
            await deleteAddress(address._id).unwrap();
            setDeleteModalVisible(false);
            refetch();
        } catch (error) {
            console.error("Error deleting address:", deleteError);
        }
    };

    return (
        <>
            <Button
                style={{ padding: 2 }}
                appearance='ghost'
                onPress={() => setDeleteModalVisible(true)} // Open delete modal
                accessoryLeft={(prop) => <TrashSimple color={prop.style.tintColor} size={prop.style.height} />}
            />
            <Modal
                visible={isDeleteModalVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setDeleteModalVisible(false)}
            >
                <Layout style={styles.modalContainer}>
                    <Text category='h6' style={styles.modalTitle}>
                        Confirm Deletion
                    </Text>
                    <Text style={styles.modalMessage}>
                        Are you sure you want to delete this address?
                    </Text>

                    <View style={styles.modalActions}>
                        <Button style={styles.button} status='basic' onPress={() => setDeleteModalVisible(false)}>
                            Cancel
                        </Button>
                        <Button style={styles.button} onPress={handleDeleteAddress}>
                            {isDeleting ? 'Deleting....' : 'Delete'}
                        </Button>
                    </View>
                </Layout>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        borderRadius: 15,
        width: '100%',
        // position: 'absolute',
        // minHeight: 192,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    modalMessage: {
        marginBottom: 20,
        textAlign: 'center',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
    },
});

export default DeleteConfirmationModal;