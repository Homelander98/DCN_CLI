import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  PDFViewer: { mode: 'view' | 'edit' };
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOpenPDF = () => {
    navigation.navigate('PDFViewer', { mode: 'view' });
  };

  const handleEditPDF = () => {
    navigation.navigate('PDFViewer', { mode: 'edit' });
  };

  return (
    <View style={styles.container}>
      <Button title="Open PDF" onPress={handleOpenPDF} />
      <View style={{ height: 20 }} />
      <Button title="Edit PDF" onPress={handleEditPDF} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeScreen; 