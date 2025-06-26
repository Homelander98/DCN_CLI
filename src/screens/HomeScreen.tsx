import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  PDFViewer: { mode: 'view' | 'edit' };
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Animations
  const fadeAnimHeader = useRef(new Animated.Value(0)).current;
  const slideAnimHeader = useRef(new Animated.Value(30)).current;
  const fadeAnimCard1 = useRef(new Animated.Value(0)).current;
  const slideAnimCard1 = useRef(new Animated.Value(30)).current;
  const fadeAnimCard2 = useRef(new Animated.Value(0)).current;
  const slideAnimCard2 = useRef(new Animated.Value(30)).current;

  // Card press scale animations
  const scaleCard1 = useRef(new Animated.Value(1)).current;
  const scaleCard2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered entrance animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnimHeader, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimHeader, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(fadeAnimCard1, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimCard1, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(fadeAnimCard2, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimCard2, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnimHeader, slideAnimHeader, fadeAnimCard1, slideAnimCard1, fadeAnimCard2, slideAnimCard2]);

  const handleOpenPDF = () => {
    navigation.navigate('PDFViewer', { mode: 'view' });
  };

  const handleEditPDF = () => {
    navigation.navigate('PDFViewer', { mode: 'edit' });
  };

  // Card press feedback
  const onPressIn = (scaleAnim: Animated.Value) => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };
  const onPressOut = (scaleAnim: Animated.Value) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[
          styles.container,
        ]}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnimHeader,
              transform: [{ translateY: slideAnimHeader }],
            },
          ]}
        >
          <Text style={styles.title}>Document Hub</Text>
          <Text style={styles.subtitle}>A modern solution for your document needs.</Text>
        </Animated.View>

        <TouchableWithoutFeedback
          onPress={handleOpenPDF}
          onPressIn={() => onPressIn(scaleCard1)}
          onPressOut={() => onPressOut(scaleCard1)}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnimCard1,
                transform: [
                  { translateY: slideAnimCard1 },
                  { scale: scaleCard1 },
                ],
              },
            ]}
          >
            <Text style={styles.cardTitle}>View Document</Text>
            <Text style={styles.cardDescription}>
              Open a PDF for viewing. Ideal for quick reviews and reading.
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={handleEditPDF}
          onPressIn={() => onPressIn(scaleCard2)}
          onPressOut={() => onPressOut(scaleCard2)}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnimCard2,
                transform: [
                  { translateY: slideAnimCard2 },
                  { scale: scaleCard2 },
                ],
              },
            ]}
          >
            <Text style={styles.cardTitle}>Edit Document</Text>
            <Text style={styles.cardDescription}>
              Annotate, sign, and fill forms with powerful editing tools.
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.06,
    paddingVertical: width * 0.04,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: width * 0.06,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E0E0E0',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#B0B0B0',
    lineHeight: 20,
  },
});

export default HomeScreen; 