import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { TaskListScreen } from "../../screens/tasks/TaskListScreen";
import { TaskDetailScreen } from "../../screens/tasks/TaskDetailScreen";
import { TaskFormScreen } from "../../screens/tasks/TaskFormScreen";
import { TeamListScreen } from "../../screens/tasks/TeamListScreen";
import { TeamMemberDetailScreen } from "../../screens/tasks/TeamMemberDetailScreen";

const StackNavigator = stackNavigatorFactory();

export type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  TaskForm: { taskId?: string };
  TeamList: undefined;
  TeamMemberDetail: { memberId: string };
};

export const TasksTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="TaskList"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="TaskList" 
      component={TaskListScreen}
      options={{
        title: "Tasks",
      }}
    />
    <StackNavigator.Screen 
      name="TaskDetail" 
      component={TaskDetailScreen}
      options={{
        title: "Task Details",
      }}
    />
    <StackNavigator.Screen 
      name="TaskForm" 
      component={TaskFormScreen}
      options={({ route }) => ({
        title: route.params?.taskId ? "Edit Task" : "New Task",
      })}
    />
    <StackNavigator.Screen 
      name="TeamList" 
      component={TeamListScreen}
      options={{
        title: "Team Members",
      }}
    />
    <StackNavigator.Screen 
      name="TeamMemberDetail" 
      component={TeamMemberDetailScreen}
      options={{
        title: "Team Member",
      }}
    />
  </StackNavigator.Navigator>
);