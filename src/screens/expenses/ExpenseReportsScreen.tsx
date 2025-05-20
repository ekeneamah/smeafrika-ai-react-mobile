import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ExpensesStackParamList } from "../../components/navigation/ExpensesTabNavigator";
import { ScrollView, StackLayout, Label, GridLayout } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchExpenseStats } from "../../store/slices/expenseSlice";

export const ExpenseReportsScreen = ({ navigation }: {
  navigation: FrameNavigationProp<ExpensesStackParamList, "ExpenseReports">
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats } = useSelector((state: RootState) => state.expense);

  React.useEffect(() => {
    dispatch(fetchExpenseStats());
  }, [dispatch]);

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card mb-4">
          <Label className="text-subtitle mb-2">Monthly Overview</Label>
          <Label className="text-body">Total: ${stats?.monthly || 0}</Label>
          <Label className="text-body">Average: ${stats?.monthlyAverage || 0}</Label>
        </StackLayout>

        <StackLayout className="card mb-4">
          <Label className="text-subtitle mb-2">Category Breakdown</Label>
          {stats?.categoryBreakdown?.map((category: any) => (
            <GridLayout key={category.name} columns="*, auto" className="mb-2">
              <Label col={0} className="text-body">{category.name}</Label>
              <Label col={1} className="text-body">${category.amount}</Label>
            </GridLayout>
          ))}
        </StackLayout>

        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Trends</Label>
          <Label className="text-body">Last 6 months trend data will be displayed here</Label>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  );
}; 