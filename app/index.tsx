import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToDoType = {
  id:number,
  title:string,
  isDone:boolean
}

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

  const [todos,setTodos] = useState<ToDoType[]>(todoData);
const [todoText,setTodoText] = useState<string>('');

const addTodo =  () =>{
const newTodo ={
  id:Math.floor(Math.random()*9999),
  title:todoText,
  isDone:false
}
setTodos([newTodo,...todos,])
setTodoText('')
}
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { alert('clicked!') }}>
          <Ionicons name='menu' size={24} color={'#333'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { alert('profile clicked!') }}>

          <Image source={{ uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </TouchableOpacity>

      </View>
      <View style={styles.searchBar}>
        <Ionicons name='search' size={24} color={'#333'} />
        <TextInput placeholder='Search' style={styles.searchInput} clearButtonMode="always" />
      </View>
      <FlatList
        data={todos}

        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item}/>
        )}
      />

      <KeyboardAvoidingView style={styles.footer} keyboardVerticalOffset={10} behavior='padding'>
        <TextInput placeholder='Add new Todo' 
        value={todoText}
        onChangeText={(text)=>setTodoText(text)}
        style={styles.newTodoInput} />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Ionicons name='add' size={34} color={'#fff'} />
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>


  );
}


const TodoItem = ({todo}:{todo:ToDoType}) =>{
  return(
   <View style={styles.todoContainer}>
            <View style={styles.todoInfoContainer}>
              <Checkbox value={todo.isDone} color={todo.isDone ? '#18a51aff':undefined}/>
              <Text style={[styles.todoText, todo.isDone && { textDecorationLine: "line-through" }]}>{todo.title}</Text>
            </View>
            <TouchableOpacity onPress={() => { alert(`delete clicked! ${todo.id}`) }}>

              <Ionicons name='trash' size={24} color={'red'} />
            </TouchableOpacity>
          </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchBar: {
    backgroundColor: '#e1dfdfff',
    margin: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  todoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    color: '#333'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:20,
   
  },
  newTodoInput: {
    backgroundColor: '#e1dfdfff',
    flex: 1,
    borderRadius:10,
    padding:16,
    fontSize:16,
    color:'#333'
  },
  addButton:{
    backgroundColor:'#18a51aff',
    padding:8,
    borderRadius:10,  
  }
})