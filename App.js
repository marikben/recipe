import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [desc, setDesc] = useState('');
  const [recipes, setRecipes] = useState('');

  const getRecipes = async () => {
    const url = 'http://www.recipepuppy.com/api/?i='+desc
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.results);
    } catch(error) {
    Alert.alert('Error', error);
    };
    }
    const listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: "#CED0CE",
            marginLeft: "10%"
          }}
        />
      );
    };

    const emptyList = () => {
      return (
        <Text>No recipes found, please enter a new search</Text>
      )
    }
  return (
    <View style={styles.container}>
        <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
        <View>
        <Image style={{width: 40, height: 40}} source={{uri: `${item.thumbnail}`}}/>
        <Text>{item.title}</Text>
        </View>
        }
        ItemSeparatorComponent={listSeparator}
        ListEmptyComponent={emptyList}
        data={recipes}
        />
      <TextInput style={{fontSize: 18, width: 200}} value={desc}
      placeholder="Search term" onChangeText={desc => setDesc(desc)}/>
      <Button title="Find" onPress={getRecipes} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
