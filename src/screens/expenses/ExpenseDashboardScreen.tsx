import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ExpensesStackParamList } from "../../components/navigation/ExpensesTabNavigator";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchExpenseStats } from "../../store/slices/expenseSlice";

export const ExpenseDashboardScreen = ({ navigation }: {
  navigation: FrameNavigationProp<ExpensesStackParamList, "ExpenseDashboard">
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, isLoading } = useSelector((state: RootState) => state.expense);

  React.useEffect(() => {
    dispatch(fetchExpenseStats());
  }, [dispatch]);

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <GridLayout columns="*, *" rows="auto, auto" className="mb-4">
          <StackLayout col={0} row={0} className="card">
            <Label className="text-subtitle">Total Expenses</Label>
            <Label className="text-title">${stats?.total || 0}</Label>
          </StackLayout>
          <StackLayout col={1} row={0} className="card">
            <Label className="text-subtitle">This Month</Label>
            <Label className="text-title">${stats?.monthly || 0}</Label>
          </StackLayout>
        </GridLayout>

        <Button 
          className="btn-primary mb-4" 
          text="Add Expense" 
          onTap={() => navigation.navigate("ExpenseForm", { expenseId: undefined })} 
        />

        <Button 
          className="btn-outline mb-4" 
          text="View All Expenses" 
          onTap={() => navigation.navigate("ExpenseList")} 
        />

        <Button 
          className="btn-outline mb-4" 
          text="Categories" 
          onTap={() => navigation.navigate("ExpenseCategories")} 
        />

        <Button 
          className="btn-outline" 
          text="Reports & Trends" 
          onTap={() => navigation.navigate("ExpenseReports")} 
        />
      </StackLayout>
    </ScrollView>
  );
}; 