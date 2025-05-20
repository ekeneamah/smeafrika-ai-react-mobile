import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { ExpenseDashboardScreen } from "../../screens/expenses/ExpenseDashboardScreen";
import { ExpenseListScreen } from "../../screens/expenses/ExpenseListScreen";
import { ExpenseFormScreen } from "../../screens/expenses/ExpenseFormScreen";
import { ExpenseCategoriesScreen } from "../../screens/expenses/ExpenseCategoriesScreen";
import { ExpenseReportsScreen } from "../../screens/expenses/ExpenseReportsScreen";

const StackNavigator = stackNavigatorFactory();

export type ExpensesStackParamList = {
  ExpenseDashboard: undefined;
  ExpenseList: undefined;
  ExpenseForm: { expenseId?: string };
  ExpenseCategories: undefined;
  ExpenseReports: undefined;
  ExpenseDetails: { expenseId: string };
};

export const ExpensesTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="ExpenseDashboard"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="ExpenseDashboard" 
      component={ExpenseDashboardScreen}
      options={{
        title: "Expense Dashboard",
      }}
    />
    <StackNavigator.Screen 
      name="ExpenseList" 
      component={ExpenseListScreen}
      options={{
        title: "Expenses",
      }}
    />
    <StackNavigator.Screen 
      name="ExpenseForm" 
      component={ExpenseFormScreen}
      options={({
        route,
      }: {
        route: { params?: { expenseId?: string } };
      }) => ({
        title: route.params?.expenseId ? "Edit Expense" : "New Expense",
      })}
    />
    <StackNavigator.Screen 
      name="ExpenseCategories" 
      component={ExpenseCategoriesScreen}
      options={{
        title: "Categories",
      }}
    />
    <StackNavigator.Screen 
      name="ExpenseReports" 
      component={ExpenseReportsScreen}
      options={{
        title: "Reports & Trends",
      }}
    />
  </StackNavigator.Navigator>
);