import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ExpensesStackParamList } from "../../components/navigation/ExpensesTabNavigator";
import { ScrollView, StackLayout, Label, Button, TextField } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchExpenseById, saveExpense, fetchCategories } from "../../store/slices/expenseSlice";
import { Dialogs } from "@nativescript/core";

export const ExpenseFormScreen = ({ route, navigation }: {
  route: RouteProp<ExpensesStackParamList, "ExpenseForm">,
  navigation: FrameNavigationProp<ExpensesStackParamList, "ExpenseForm">
}) => {
  const { expenseId } = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.expense);

  const [formData, setFormData] = React.useState({
    amount: '',
    description: '',
    category: '',
    date: new Date(),
    notes: ''
  });

  React.useEffect(() => {
    dispatch(fetchCategories());
    if (expenseId) {
      dispatch(fetchExpenseById(expenseId));
    }
  }, [dispatch, expenseId]);

  const handleSubmit = async () => {
    if (!formData.amount || !formData.description || !formData.category) {
      Dialogs.alert({ title: "Validation Error", message: "Please complete all required fields.", okButtonText: "OK" });
      return;
    }

    try {
      await dispatch(saveExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        date: formData.date.toISOString()
      }));
      Dialogs.alert({ title: "Success", message: "Expense saved successfully.", okButtonText: "OK" });
      navigation.goBack();
    } catch (err) {
      Dialogs.alert({ title: "Error", message: "Failed to save expense.", okButtonText: "OK" });
    }
  };

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Amount</Label>
          <TextField 
            className="form-input" 
            text={formData.amount}
            onTextChange={(e) => setFormData({ ...formData, amount: e.value })}
            hint="Enter amount"
            keyboardType="number"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Description</Label>
          <TextField 
            className="form-input" 
            text={formData.description}
            onTextChange={(e) => setFormData({ ...formData, description: e.value })}
            hint="Enter description"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Category</Label>
          <TextField 
            className="form-input" 
            text={formData.category}
            onTextChange={(e) => setFormData({ ...formData, category: e.value })}
            hint="Select category"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Date</Label>
          <Label className="form-input">{formData.date.toDateString()}</Label>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Notes</Label>
          <textView 
            className="form-input h-32" 
            text={formData.notes}
            onTextChange={(e) => setFormData({ ...formData, notes: e.value })}
            hint="Enter notes"
          />
        </StackLayout>

        <Button 
          className="btn-primary mt-4" 
          text={expenseId ? "Update Expense" : "Create Expense"} 
          onTap={handleSubmit} 
        />
      </StackLayout>
    </ScrollView>
  );
}; 