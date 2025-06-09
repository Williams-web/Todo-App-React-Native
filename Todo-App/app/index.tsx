import { AntDesign, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Checkbox } from 'expo-checkbox'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import pic from '../assets/images/Passport.jpg'



type ToDoType = {
  id:number,
  title:string,
  isDone: boolean,
}

const index = () => {
 
  const [toDo, setToDo] =useState<string>('')
  const [searchText,setSearchText] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [editTodoId, setEditTodoId] = useState<number | null>(null)
  const inputRef = useRef<TextInput>(null);
  
  
   const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: true,
    }
  ]

   const [todos, setTodos] = useState<ToDoType[]>([])
   const [todoText, setTodoText] = useState<string>('')
   const [oldTodos, setOldTodos] = useState<ToDoType[]>([])

   {/* Fetching the data */}
  useEffect(() => {
    const getTodos = async () => {
      try{
        const todos = await AsyncStorage.getItem("my-todo")
        setTodos(todos ? JSON.parse(todos): [])
        setOldTodos(todos ? JSON.parse(todos): [])
      }catch(err){
        console.log(err)
      }
    } ;
    getTodos();
  }, [])

  {/*Setting the data for Async Storage*/}
   const addTodo = async () => {
    if (todoText.trim() === '') return;

    try {
      if (editTodoId !== null) {
      const updatedTodos = todos.map(item =>
        item.id === editTodoId ? { ...item, title: todoText } : item
      );
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodos));
      setEditTodoId(null); // Clear editing state
    } else {
      const newTodo = {
        id: todos.length + 1,
        title: todoText,
        isDone: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodos));
    }

    // Common post-action cleanup
    setTodoText('');
    Keyboard.dismiss();
  } catch (err) {
    console.log(err);
  }
};

  
   const deleteTodo = async (id:number) => {
    try{
    const newTodos = todos.filter((todos) => todos.id !== id)
    await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos))
    setTodos(newTodos)
    setOldTodos(newTodos)
    }catch(err){
      console.log(err)
    }
   }

   const handleDone = async(id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if(todo.id === id){
          todo.isDone = !todo.isDone
        }
        return todo;
      }
      )
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos))
      setTodos(newTodos)
      setOldTodos(newTodos)
      }catch(err) {
      console.log(err)
    }
    
   }
  
   const onSearch = (query: string) => {
    if(query == ''){
      setTodos(oldTodos)
    }else{
      const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()))
      setTodos(filteredTodos);
    }
    
   }

   useEffect(() => {
    onSearch(searchQuery)
   },[searchQuery])

  const editTodo = (id: number, title: string) => {
  setEditTodoId(id);
  setTodoText(title);

  // Focus the input field after a small delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100)
  };

  return (
    <SafeAreaView style={{ flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",}}>

      {/*Header Section*/ }
      <View style={styles.header}>
          <TouchableOpacity onPress={() => {alert('Menu')}}>
            <Ionicons name='menu' size={24} color={'black'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {alert('profile pic')}}>
            <Image source={pic} style={{ width:40, height:40, borderRadius:10}}/>
          </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderRadius:10, marginBottom:20,paddingHorizontal:16,paddingVertical:8}}>
        <Ionicons name='search' size={24} color={'black'}/>
        <TextInput 
        placeholder='Search' 
        style={{flex:1, alignItems:'center',padding:10}} 
        value={searchQuery} 
        onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle-outline" size={24} color={"grey"}/>
          </TouchableOpacity>
        )}
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name='close-circle' size={20} color={"grey"} />
          </TouchableOpacity>
        )}
      </View>

      {/* Todo List Section */}
      <View style={{flex:1}}>
        <FlatList
         data={[...todos].reverse()} 
         keyExtractor={(item) => item.id.toString()} 
         renderItem={({item}) => (<TodoItem todo={item} deleteTodo={deleteTodo} handleDone={handleDone} editTodo={editTodo}/>
         )}/>
      </View>

      {/* Add New Todo Section */}
      <KeyboardAvoidingView style= {styles.footer} behavior='padding' keyboardVerticalOffset={10}>
        <TextInput
        ref={inputRef}
         placeholder='Add New Todo'
         style={styles.newTextInput}
         onChangeText={(text)=> setTodoText(text)}
         value ={todoText}
         autoCorrect={false}
        />
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Ionicons name={editTodoId !== null ? 'checkmark' : 'add'} size={34} color={'#fff'} />
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default index

const TodoItem = ({todo,deleteTodo, handleDone, editTodo}:{todo:ToDoType,deleteTodo:(id: number) => Promise<void>,handleDone:(id: number)=> Promise<void>, editTodo: (id: number, title: string) => void}) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoInfoContainer}>
        <Checkbox value={todo.isDone} onValueChange={() => handleDone(todo.id)} color={todo.isDone ? "#0077b6": undefined}/>
        <Text style={{fontSize:16, color: '#333',textDecorationLine: todo.isDone ? 'line-through' : 'none'}}>
          {todo.title}
        </Text>
      </View>
      <TouchableOpacity onPress={() =>editTodo(todo.id, todo.title)}>
        <AntDesign name="edit" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {deleteTodo(todo.id)}}>
        <Ionicons name="trash" size={24} color="red"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding:16,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap:15
},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  todoInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 20,
},
newTextInput: {
  flex: 1,
  fontSize: 16,
  color: '#333',
  backgroundColor: '#fff',
  padding:15
},
addButton: {
  backgroundColor: '#0077b6',
  marginLeft: 20,
  padding: 8,
  borderRadius:10
},

})