import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function Index() {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos !== null) {
          setTodos(JSON.parse(todos));
          setOldTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();
  }, []);

  const addTodo = async () => {
    if (todoText.trim() === "") {
    alert("Please enter a todo first.");
    return;
  }
    try {
      const newTodo = {
        id: Math.floor(Math.random() * 9999),
        title: todoText.trim(),
        isDone: false,
      };
      const updatedTodo = [newTodo, ...todos];
      setTodos(updatedTodo);
      setOldTodos(updatedTodo);
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodo));
      setTodoText("");
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

 const deleteTodo = (id: number) => {
  Alert.alert(   
    "Delete Todo", 
    "Are you sure you want to delete this todo?",
    [
      { text: "Cancel", style: "cancel" },
      {     
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const newTodos = todos.filter((todo) => todo.id !== id);
            await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
            setTodos(newTodos);
            setOldTodos(newTodos);
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]
  );
};

  const onSearch = (query: string) => {
  
    try {
      setSearchQuery(query);

  if (query.trim() === "") {
    setTodos(oldTodos);
    return;
  }

  const filterTodos = oldTodos.filter((todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase())
  );
  setTodos(filterTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            alert("clicked!");
          }}
        >
          <Ionicons name="menu" size={24} color={"#333"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("profile clicked!");
          }}
        >
          <Image
            source={{
              uri: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
            }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />

        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={onSearch}
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            deleteTodo={deleteTodo}
            handleDone={handleDone}
          />
        )}
      />

      <KeyboardAvoidingView
        style={styles.footer}
        keyboardVerticalOffset={10}
        behavior="padding"
      >
        <TextInput
          placeholder="Add new Todo"
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
          style={styles.newTodoInput}
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Ionicons name="add" size={34} color={"#fff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TodoItem = ({
  todo,
  deleteTodo,
  handleDone,
}: {
  todo: ToDoType;
  deleteTodo: (id: number) => void;
  handleDone: (id: number) => void;
}) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoInfoContainer}>
        <Checkbox
          value={todo.isDone}
          color={todo.isDone ? "#18a51aff" : undefined}
          onValueChange={() => handleDone(todo.id)}
        />
        <Text
          style={[
            styles.todoText,
            todo.isDone && { textDecorationLine: "line-through" },
          ]}
        >
          {todo.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          deleteTodo(todo.id);
        }}
      >
        <Ionicons name="trash" size={24} color={"red"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "#e1dfdfff",
    margin: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  todoContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  newTodoInput: {
    backgroundColor: "#e1dfdfff",
    flex: 1,
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#18a51aff",
    padding: 8,
    borderRadius: 10,
  },
});
