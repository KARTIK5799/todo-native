import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
 const todoData = [
  {
    id: 1,
    title: "Buy  some groceries",
    isDone: false
  },
  {
    id: 2,
    title: "Finish project report",
    isDone: true
  },
  {
    id: 3,
    title: "Call the plumber",
    isDone: false
  },
  {
    id: 4,
    title: "Go for fast a run",
    isDone: true
  }
];

  return (
    <SafeAreaView style = {styles.container}>
<View style={styles.header}>
  <TouchableOpacity onPress={()=>{alert('clicked!')}}>
<Ionicons name='menu' size={24} color={'#333'}/>
  </TouchableOpacity>
<TouchableOpacity onPress={()=>{alert('profile clicked!')}}>

<Image  source={{uri:'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'}} style={{width:40,height:40,borderRadius:20}}/>
</TouchableOpacity>

</View>
<View style = {styles.searchBar}>
<Ionicons name='search' size={24} color={'#333'}/>
<TextInput placeholder='Search' style={styles.searchInput} clearButtonMode="always"/>
</View>
  <FlatList
    data={todoData}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={{ padding: 10 }}>
        <Text>{item.title}</Text>
      </View>
    )}
  />

    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:20,
    backgroundColor:'#f5f5f5'
  },
  header:{
    marginBottom:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  searchBar:{
    backgroundColor:'#e1dfdfff',
    margin:4,
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:100,
    flexDirection:'row',
    gap:20,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  searchInput:{
    flex:1,
    fontSize:16,
    color:'#333'
  }
})