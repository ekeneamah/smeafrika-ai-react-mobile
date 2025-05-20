import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ExpensesStackParamList } from "../../components/navigation/ExpensesTabNavigator";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchCategories } from "../../store/slices/expenseSlice";

export const ExpenseCategoriesScreen = ({ navigation }: {
  navigation: FrameNavigationProp<ExpensesStackParamList, "ExpenseCategories">
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.expense);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        {categories.map(category => (
          <StackLayout key={category.id} className="card mb-4">
            <GridLayout columns="auto, *, auto" rows="auto, auto">
              <Label col={0} row={0} className="text-subtitle">{category.name}</Label>
              <Label col={2} row={0} className="text-body">{category.icon}</Label>
              <Label col={0} row={1} className="text-body">{category.description}</Label>
            </GridLayout>
          </StackLayout>
        ))}

        <Button 
          className="btn-primary mt-4" 
          text="Add Category" 
          onTap={() => {/* TODO: Implement add category */}} 
        />
      </StackLayout>
    </ScrollView>
  );
}; 