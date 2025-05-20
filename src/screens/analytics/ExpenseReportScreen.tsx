import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AnalyticsStackParamList } from "../../components/navigation/AnalyticsTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { colors } from "../../theme/colors";
import { DropDown } from "@nativescript/core";

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
    <scrollView class="bg-background">
      <stackLayout class="p-4">
        <gridLayout columns="*, auto" class="mb-4">
          <label col="0" class="text-title">Expense Report</label>
          <DropDown
            col="1"
            items={["This Month", "Last 3 Months", "Last 6 Months", "This Year"]}
            selectedIndex={0}
            class="w-32"
            onSelectedIndexChanged={(e) => {
              const ranges = ["month", "quarter", "half", "year"];
              setTimeRange(ranges[e.object.selectedIndex]);
            }}
          />
        </gridLayout>

        <stackLayout class="card">
          <label class="text-subtitle mb-2">Expense Summary</label>
          <gridLayout columns="*, *" rows="auto, auto" class="text-center">
            <stackLayout col="0" row="0" class="p-2">
              <label class="text-title">$12,450</label>
              <label class="text-body">Total Expenses</label>
            </stackLayout>
            <stackLayout col="1" row="0" class="p-2">
              <label class="text-title">85</label>
              <label class="text-body">Transactions</label>
            </stackLayout>
            <stackLayout col="0" row="1" class="p-2">
              <label class="text-title">$146.47</label>
              <label class="text-body">Avg. Transaction</label>
            </stackLayout>
            <stackLayout col="1" row="1" class="p-2">
              <label class="text-title">+12%</label>
              <label class="text-body">vs Last Period</label>
            </stackLayout>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Expense Trend</label>
          <gridLayout class="h-48 bg-primary100 rounded-md">
            <label class="text-center">Expense Trend Chart</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Expenses by Category</label>
          
          <gridLayout columns="*, auto" rows="auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">Inventory</label>
            <label col="1" row="0" class="text-body">$5,200 (42%)</label>
            <progressBar row="1" colSpan="2" value={42} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>

          <gridLayout columns="*, auto" rows="auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">Marketing</label>
            <label col="1" row="0" class="text-body">$3,100 (25%)</label>
            <progressBar row="1" colSpan="2" value={25} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>

          <gridLayout columns="*, auto" rows="auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">Operations</label>
            <label col="1" row="0" class="text-body">$2,450 (20%)</label>
            <progressBar row="1" colSpan="2" value={20} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>

          <gridLayout columns="*, auto" rows="auto, auto, auto">
            <label col="0" row="0" class="text-body">Others</label>
            <label col="1" row="0" class="text-body">$1,700 (13%)</label>
            <progressBar row="1" colSpan="2" value={13} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Recent Transactions</label>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Inventory Restock</label>
              <label col="1" row="0" class="text-body text-error">-$2,500</label>
              <label col="0" row="1" class="text-body text-secondary">Mar 15, 2024</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Facebook Ads</label>
              <label col="1" row="0" class="text-body text-error">-$800</label>
              <label col="0" row="1" class="text-body text-secondary">Mar 14, 2024</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Office Supplies</label>
              <label col="1" row="0" class="text-body text-error">-$150</label>
              <label col="0" row="1" class="text-body text-secondary">Mar 13, 2024</label>
            </gridLayout>
          </stackLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Payment Methods Used</label>
          <gridLayout columns="*, auto" rows="auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">Credit Card</label>
            <label col="1" row="0" class="text-body">55%</label>
            <progressBar row="1" colSpan="2" value={55} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>

          <gridLayout columns="*, auto" rows="auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">Bank Transfer</label>
            <label col="1" row="0" class="text-body">35%</label>
            <progressBar row="1" colSpan="2" value={35} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>

          <gridLayout columns="*, auto" rows="auto, auto, auto">
            <label col="0" row="0" class="text-body">Cash</label>
            <label col="1" row="0" class="text-body">10%</label>
            <progressBar row="1" colSpan="2" value={10} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Budget vs Actual</label>
          <gridLayout columns="*, auto" rows="auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">Budget</label>
            <label col="1" row="0" class="text-body">$15,000</label>
            <progressBar row="1" colSpan="2" value={100} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>

          <gridLayout columns="*, auto" rows="auto, auto, auto">
            <label col="0" row="0" class="text-body">Actual</label>
            <label col="1" row="0" class="text-body">$12,450</label>
            <progressBar row="1" colSpan="2" value={83} maxValue={100} class="bg-primary100" color={colors.success} />
          </gridLayout>
          
          <label class="text-success text-center mt-2">Under budget by $2,550</label>
        </stackLayout>
      </stackLayout>
    </scrollView>
  );
}