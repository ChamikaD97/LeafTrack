import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    Alert,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function DailyEntryScreen({ navigation }) {
    const allLines = [
        'S', 'TP', 'PP', 'TK', 'SELF', 'SELF 02', 'T', 'K', 'J', 'BK',
        'PT', 'N', 'DM', 'BA', 'D', 'ML', 'HA', 'PK', 'UP', 'DR',
        'PW', 'DG', 'MV', 'MT', 'PH', 'GO', 'BM', 'NG', 'MP', 'A',
        'MD', 'UB', 'UT', 'KM'
    ];

    const [selectedLine, setSelectedLine] = useState('Select Line From Above');
    const [b, setB] = useState('');
    const [bb, setBB] = useState('');
    const [p, setP] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredLines, setFilteredLines] = useState(allLines);
    const scrollRef = useRef(null);

    useEffect(() => {
        const filtered = allLines.filter((line) =>
            line.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredLines(filtered);
    }, [searchText]);

    useEffect(() => {
        const bVal = Number(b) || 0;
        const bbVal = Number(bb) || 0;
        const total = bVal + bbVal;

        if (total > 100) {
Toast.show({
  type: 'error',
  text1: 'Invalid Input',
  text2: 'B + B/B cannot exceed 100%'
});
        }

        const remaining = 100 - total;
        if (b !== '' && bb !== '' && remaining >= 0) {
            setP(remaining.toString());
        } else if (b === '' || bb === '') {
            setP('');
        }
    }, [b, bb]);

   const handleSubmit = () => {
  const total = Number(b) + Number(bb) + Number(p);
  if (!selectedLine) {
    Toast.show({
      type: 'error',
      text1: 'No Line Selected',
      text2: 'Please select a line.'
    });
  } else if (total !== 100) {
    Toast.show({
      type: 'error',
      text1: 'Invalid Total',
      text2: `Total must be 100%. Currently: ${total}%`
    });
  } else {
    Toast.show({
      type: 'success',
      text1: 'Entry Saved',
      text2: `Line: ${selectedLine}`
    });
    clearInputs();
  }
};


  
    const clearInputs = () => {
        
        setB('');
        setBB('');
        setP('');
        setSelectedLine('');
        setSearchText('');
    };

    const validateAndSet = (value, setter) => {
        if (/^\d{0,3}$/.test(value)) {
            const num = Number(value);
            if (num <= 100) {
                setter(value);
            } else {
                Alert.alert('Invalid Input', 'Value must be 0 to 100');
            }
        }
    };

    const handleLineSelect = (line) => {
        setSelectedLine(line);
        setSearchText('');

        const index = filteredLines.findIndex((l) => l === line);
        const cardWidth = 90; // approximate width (card + margin)
        const screenCenterOffset = (filteredLines.length * cardWidth) / 2;
        const scrollX = index * cardWidth - 150; // adjust 150 based on screen width/card width

        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                x: scrollX > 0 ? scrollX : 0,
                animated: true
            });
        }
    };


    return (
        <ImageBackground
            source={require('../assets/bg.jpeg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Daily Leaf Count</Text>

                    <Text style={styles.label}>Select Line</Text>

                    <TextInput
                        placeholder="Search lines..."
                        placeholderTextColor="#ccc"
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                    />


                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollRow}
                    >
                        {filteredLines.map((line) => (
                            <TouchableOpacity
                                key={line}
                                style={[
                                    styles.lineCard,
                                    selectedLine === line && styles.selectedCard
                                ]}
                                onPress={() => handleLineSelect(line)}
                            >
                                <Text style={styles.cardText}>{line}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {selectedLine !== '' && (
                        <View style={styles.selectedLineContainer}>
  <View style={styles.selectedLineBox}>
                                <Text style={styles.selectedLine}>{selectedLine}</Text>
                            </View>
                        </View>
                    )}
                    {/* B Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>B (%)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter B %"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                            value={b}
                            onChangeText={(value) => validateAndSet(value, setB)}
                        />
                    </View>

                    {/* B/B Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>B/B (%)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter B/B %"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                            value={bb}
                            onChangeText={(value) => validateAndSet(value, setBB)}
                        />
                    </View>

                    {/* P (auto-calculated) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>P (%)</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: '#444' }]}
                            placeholder="Auto"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                            value={p}
                            editable={false}
                        />
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.clearButton} onPress={clearInputs}>
                            <Text style={styles.buttonText}>Clear</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: 20,
        borderRadius: 15
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    label: {
        color: 'white',
        marginBottom: 8
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    scrollRow: {
        flexDirection: 'row',
        marginBottom: 20
    },
    lineCard: {
        backgroundColor: '#444',
        paddingVertical: 15,
        paddingHorizontal: 18,
        marginRight: 10,
        borderRadius: 12,
        borderColor: '#666',
        minWidth: 70,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },


    selectedLineContainer: {
        marginBottom: 5,
        alignItems: 'center'
    },
    selectedLineText: {
        color: '#ccc',
        marginBottom: 5,
        fontSize: 18
    },
    selectedLineBox: {
        backgroundColor: 'rgba(4, 0, 255, 0.89)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    selectedLine: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
    ,
    selectedCard: {
        backgroundColor: '#228B22',
        borderColor: '#ffffff',
        transform: [{ scale: 1.05 }]
    },
    cardText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    inputGroup: {
        marginBottom: 10
    },
    inputLabel: {
        color: 'white',
        marginBottom: 4,
        fontSize: 16
    },
    input: {
        height: 55, fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    clearButton: {
        flex: 1,
        backgroundColor: 'rgba(170, 15, 15, 0.66)',
        padding: 15,
        borderRadius: 30,
        marginRight: 10
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#228B22',
        padding: 15,
        borderRadius: 30,
        marginLeft: 10
    },
    backButton: {
        flex: 1,
        backgroundColor: 'rgba(23, 41, 206, 0.8)',
        padding: 15,
        borderRadius: 30
    },
    buttonText: {        fontSize: 15,

        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
