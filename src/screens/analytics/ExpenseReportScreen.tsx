import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AnalyticsStackParamList } from "../../components/navigation/AnalyticsTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { colors } from "../../theme/colors";
import {
  Label,
  GridLayout,
  StackLayout,
  ScrollView,
  ProgressBar,
  DropDown
} from "../../components/native/nativeElements";

type ExpenseReportScreenProps = {
  route: RouteProp<AnalyticsStackParamList, "ExpenseReport">,
  navigation: FrameNavigationProp<AnalyticsStackParamList, "ExpenseReport">,
};

export function ExpenseReportScreen({ navigation }: ExpenseReportScreenProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState('month');

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingIndicator text="Loading expense report..." />;
  }

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <GridLayout columns="*, auto" className="mb-4">
          <Label col={0} className="text-title">Expense Report</Label>
          <DropDown
            col={1}
            items={["This Month", "Last 3 Months", "Last 6 Months", "This Year"]}
            selectedIndex={0}
            className="w-32"
            onSelectedIndexChanged={(e) => {
              const ranges = ["month", "quarter", "half", "year"];
              setTimeRange(ranges[e.object.selectedIndex]);
            }}
          />
        </GridLayout>

        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Expense Summary</Label>
          <GridLayout columns="*, *" rows="auto, auto" className="text-center">
            <StackLayout col={0} row={0} className="p-2">
              <Label className="text-title">$12,450</Label>
              <Label className="text-body">Total Expenses</Label>
            </StackLayout>
            <StackLayout col={1} row={0} className="p-2">
              <Label className="text-title">85</Label>
              <Label className="text-body">Transactions</Label>
            </StackLayout>
            <StackLayout col={0} row={1} className="p-2">
              <Label className="text-title">$146.47</Label>
              <Label className="text-body">Avg. Transaction</Label>
            </StackLayout>
            <StackLayout col={1} row={1} className="p-2">
              <Label className="text-title">+12%</Label>
              <Label className="text-body">vs Last Period</Label>
            </StackLayout>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Expense Trend</Label>
          <GridLayout columns="*" className="h-48 bg-primary100 rounded-md">
            <Label className="text-center">Expense Trend Chart</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Expenses by Category</Label>
          {[
            { label: "Inventory", value: 42, display: "$5,200 (42%)" },
            { label: "Marketing", value: 25, display: "$3,100 (25%)" },
            { label: "Operations", value: 20, display: "$2,450 (20%)" },
            { label: "Others", value: 13, display: "$1,700 (13%)" },
          ].map((cat, i) => (
            <GridLayout key={i} columns="*, auto" rows="auto, auto, auto" className="mb-2">
              <Label col={0} row={0} className="text-body">{cat.label}</Label>
              <Label col={1} row={0} className="text-body">{cat.display}</Label>
              <ProgressBar row={1} colSpan={2} value={cat.value} maxValue={100} className="bg-primary100" color={colors.primary} />
            </GridLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Recent Transactions</Label>
          {[
            { title: "Inventory Restock", amount: "-$2,500", date: "Mar 15, 2024" },
            { title: "Facebook Ads", amount: "-$800", date: "Mar 14, 2024" },
            { title: "Office Supplies", amount: "-$150", date: "Mar 13, 2024" },
          ].map((tx, i) => (
            <StackLayout key={i} className="border-b border-divider p-2">
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col={0} row={0} className="text-body font-bold">{tx.title}</Label>
                <Label col={1} row={0} className="text-body text-error">{tx.amount}</Label>
                <Label col={0} row={1} className="text-body text-secondary">{tx.date}</Label>
              </GridLayout>
            </StackLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Payment Methods Used</Label>
          {[
            { label: "Credit Card", value: 55 },
            { label: "Bank Transfer", value: 35 },
            { label: "Cash", value: 10 },
          ].map((pm, i) => (
            <GridLayout key={i} columns="*, auto" rows="auto, auto, auto" className="mb-2">
              <Label col={0} row={0} className="text-body">{pm.label}</Label>
              <Label col={1} row={0} className="text-body">{pm.value}%</Label>
              <ProgressBar row={1} colSpan={2} value={pm.value} maxValue={100} className="bg-primary100" color={colors.primary} />
            </GridLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Budget vs Actual</Label>
          <GridLayout columns="*, auto" rows="auto, auto, auto" className="mb-2">
            <Label col={0} row={0} className="text-body">Budget</Label>
            <Label col={1} row={0} className="text-body">$15,000</Label>
            <ProgressBar row={1} colSpan={2} value={100} maxValue={100} className="bg-primary100" color={colors.primary} />
          </GridLayout>
          <GridLayout columns="*, auto" rows="auto, auto, auto">
            <Label col={0} row={0} className="text-body">Actual</Label>
            <Label col={1} row={0} className="text-body">$12,450</Label>
            <ProgressBar row={1} colSpan={2} value={83} maxValue={100} className="bg-primary100" color={colors.success} />
          </GridLayout>
          <Label className="text-success text-center mt-2">Under budget by $2,550</Label>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  );
}
