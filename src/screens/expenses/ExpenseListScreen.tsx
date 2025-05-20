import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ExpensesStackParamList } from "../../components/navigation/ExpensesTabNavigator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchExpenses, deleteExpense } from "../../store/slices/expenseSlice";
import { Dialogs } from "@nativescript/core";

export const ExpenseListScreen = ({ navigation }: {
  navigation: FrameNavigationProp<ExpensesStackParamList, "ExpenseList">
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, isLoading } = useSelector((state: RootState) => state.expenses);
  const [searchText, setSearchText] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchExpenses(currentPage));
  }, [dispatch, currentPage]);

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchText.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteExpense = async (expenseId: string) => {
    const confirmed = await Dialogs.confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this expense?",
      okButtonText: "Delete",
      cancelButtonText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await dispatch(deleteExpense(expenseId));
    } catch (error) {
      Dialogs.alert({ title: "Error", message: "Failed to delete expense.", okButtonText: "OK" });
    }
  };

  return (
    <GridLayout columns="*" rows="auto, auto, *, auto" className="bg-background">
      <StackLayout row={0} className="p-4">
        <searchBar 
          hint="Search expenses..." 
          text={searchText} 
          onTextChange={(e) => setSearchText(e.value)}
          className="form-input"
        />
      </StackLayout>

      <GridLayout row={1} columns="auto, *" className="p-2">
        <Button 
          col={0} 
          text="Filter" 
          className="btn-outline text-sm p-2" 
          onTap={() => setFilterOpen(true)}
        />
        <Label col={1} className="text-subtitle ml-2">
          {filteredExpenses.length} Expenses
        </Label>
      </GridLayout>

      <ScrollView row={2} className="p-2">
        <StackLayout>
          {filteredExpenses.map(expense => (
            <StackLayout 
              key={expense.id} 
              className="card" 
              onTap={() => navigation.navigate("ExpenseForm", { expenseId: expense.id })}
            >
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col={0} row={0} className="text-subtitle">{expense.description}</Label>
                <Label col={1} row={0} className="text-success">${expense.amount}</Label>
                <Label col={0} row={1} className="text-body">{expense.category}</Label>
                <Label col={1} row={1} className="text-body">{expense.date}</Label>
              </GridLayout>
              <Button 
                text="Delete" 
                className="text-error text-sm mt-1" 
                onTap={() => handleDeleteExpense(expense.id)} 
              />
            </StackLayout>
          ))}
        </StackLayout>
      </ScrollView>

      <GridLayout row={3} columns="*, auto, *" className="p-2">
        <Button col={0} text="Prev" className="btn-outline" onTap={() => setCurrentPage(p => Math.max(1, p - 1))} />
        <Label col={1} className="text-center text-sm">Page {currentPage}</Label>
        <Button col={2} text="Next" className="btn-outline" onTap={() => setCurrentPage(p => p + 1)} />
      </GridLayout>

      <Button text="+" className="fab" onTap={() => navigation.navigate("ExpenseForm", { expenseId: undefined })} />

      <SwipeUpPanel
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter Expenses"
      >
        <StackLayout className="p-4">
          <StackLayout className="mb-4">
            <Label className="form-label">Status</Label>
            <segmentedBar selectedIndex={0} className="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="Pending" />
              <segmentedBarItem title="Approved" />
            </segmentedBar>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="form-label">Date Range</Label>
            <segmentedBar selectedIndex={0} className="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="This Week" />
              <segmentedBarItem title="This Month" />
            </segmentedBar>
          </StackLayout>

          <Button className="btn-primary mt-4" text="Apply Filters" onTap={() => setFilterOpen(false)} />
        </StackLayout>
      </SwipeUpPanel>
    </GridLayout>
  );
}; 