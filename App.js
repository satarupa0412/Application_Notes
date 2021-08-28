import { StatusBar } from 'expo-status-bar';
import React ,{useState}from 'react';
import { StyleSheet, Text, View,Button,TextInput,ScrollView,FlatList } from 'react-native';

import GoalItem from './components/GoalItem.js';
import GoalInput from './components/GoalInput';

export default function App() {
   const [courseGoals,setCourseGoals] = useState([]);
   const [isAddMode, setIsAddMode] = useState(false);

   const addGoalHandler = goalTitle =>{
     if(goalTitle.length === 0){
       return;
     }

      setCourseGoals(currentGoals => [...courseGoals,
        {id: Math.random().toString(), value :goalTitle }
      ]);
      setIsAddMode(false);
   };

   const removeGoalHandler=goalId =>{
        setCourseGoals(currentGoals => {
          return currentGoals.filter((goal) => goal.id !== goalId );
        });
       
  };
   const cancelAddGoalHandler = () => {
     setIsAddMode(false);
   }

  return (
    <View style={styles.screen}>
      <Button title = 'Add New Goal' onPress= {() => setIsAddMode(true)} />
      <GoalInput visible = {isAddMode} onAddGoal = {addGoalHandler} onCancel={cancelAddGoalHandler}/>
      <FlatList
      data = {courseGoals}
       renderItem={itemData => <GoalItem  
        id ={itemData.item.id} 
        onDelete={removeGoalHandler} 
        title = {itemData.item.value} />}
     />
    </View>
    
  );
}

const styles = StyleSheet.create({
   screen :{
       padding:50
   },
   
});
