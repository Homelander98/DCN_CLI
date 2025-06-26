import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform, ActivityIndicator, Text } from 'react-native';
import { DocumentView, RNPdftron } from '@pdftron/react-native-pdf';
import { useRoute, RouteProp } from '@react-navigation/native';

// Note: DocumentView requires proper native linking
// Run: npx react-native link @pdftron/react-native-pdf

type RootStackParamList = {
  Home: undefined;
  PDFViewer: { mode: 'view' | 'edit' };
};

type PDFViewerRouteProp = RouteProp<RootStackParamList, 'PDFViewer'>;

const PDFTRON_LICENSE_KEY = 'Document Compliance Network Inc:PWS:Document Compliance Network::B+2:BB3A089987166CAFDD445B5EB8DFEDB9F84CF63FC35022D9BEA7D89E4E5F26BD';
const DEMO_PDF_URL = 'https://pdfobject.com/pdf/sample.pdf';

let pdftronInitialized = false;

const PDFViewer = () => {
  const [documentPath, setDocumentPath] = useState('');
  const [loading, setLoading] = useState(true);
  const viewerRef = useRef(null);
  const route = useRoute<PDFViewerRouteProp>();
  const { mode } = route.params;

  useEffect(() => {
    const initializePDFTron = async () => {
      try {
        if (!pdftronInitialized) {
          await RNPdftron.initialize(PDFTRON_LICENSE_KEY);
          pdftronInitialized = true;
        }
        setDocumentPath(DEMO_PDF_URL);
      } catch (error) {
        console.error('PDFTron initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };
    initializePDFTron();
  }, []);

  useEffect(() => {
    return () => {
      setDocumentPath('');
      setLoading(true);
    };
  }, []);

  const onDocumentLoaded = () => {
    console.log('PDF document loaded successfully');
  };

  const onDocumentError = (error: any) => {
    console.error('Document loading error:', error);
    Alert.alert('Error', 'Failed to load PDF document');
  };

  const onLeadingNavButtonPressed = () => {
    Alert.alert(
      'Close Document',
      'Do you want to close the document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Close', onPress: () => console.log('Document closed') }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {documentPath ? (
        <DocumentView
          ref={viewerRef}
          document={documentPath}
          showLeadingNavButton={true}
          leadingNavButtonIcon="ic_arrow_back_white_24dp"
          onLeadingNavButtonPressed={onLeadingNavButtonPressed}
          onDocumentLoaded={onDocumentLoaded}
          onDocumentError={onDocumentError}
          readOnly={mode === 'view'}
          fitMode={'FitPage'}
          layoutMode={'Single'}
          disabledElements={mode === 'edit' ? [] : ['annotationEditButton', 'toolsButton', 'searchButton']}
          disabledTools={mode === 'edit' ? [] : ['AnnotationCreateLine', 'AnnotationCreateArrow', 'AnnotationCreateSticky', 'AnnotationCreateFreeHand', 'AnnotationCreateTextHighlight', 'AnnotationCreateTextUnderline', 'AnnotationCreateTextSquiggly', 'AnnotationCreateTextStrikeout']}
          multiTabEnabled={false}
          documentSliderEnabled={true}
          continuousAnnotationEditing={mode === 'edit'}
          selectAnnotationAfterCreation={mode === 'edit'}
          annotationToolbars={[
            {
              id: 'default',
              name: 'Default',
              items: [
                'AnnotationCreateSticky',
                'AnnotationCreateFreeHand',
                'AnnotationCreateTextHighlight',
                'AnnotationCreateTextUnderline',
                'AnnotationCreateTextSquiggly',
                'AnnotationCreateTextStrikeout',
                'AnnotationCreateLine',
                'AnnotationCreateArrow',
                'AnnotationCreateRectangle',
                'AnnotationCreateEllipse',
                'AnnotationCreatePolygon',
                'AnnotationCreatePolyLine',
                'AnnotationCreateStamp',
                'AnnotationCreateSignature',
                'AnnotationCreateFreeText',
                'AnnotationCreateTextField',
                'AnnotationCreateCheckBox',
                'AnnotationCreateRadioButton',
                'AnnotationCreateListBox',
                'AnnotationCreateComboBox',
                'AnnotationCreateRedaction'
              ]
            }
          ]}
        />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default PDFViewer; 