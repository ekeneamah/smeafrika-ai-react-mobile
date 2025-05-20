import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticsData, setFilter } from "../../store/slices/analyticsSlice";
import { AnalyticsStackParamList } from "../../components/navigation/AnalyticsTabNavigator";
import { RootState } from "../../store/store";
import { colors } from "../../theme/colors";
import { AnalyticsFilter } from "../../types/Analytics";
import {
  Label,
  GridLayout,
  StackLayout,
  ScrollView,
  Button,
  DropDown
} from "../../components/native/nativeElements";

type AnalyticsDashboardScreenProps = {
  route: RouteProp<AnalyticsStackParamList, "AnalyticsDashboard">,
  navigation: FrameNavigationProp<AnalyticsStackParamList, "AnalyticsDashboard">,
};

export function AnalyticsDashboardScreen({ navigation }: AnalyticsDashboardScreenProps) {
  const dispatch = useDispatch();
  const { currentFilter } = useSelector((state: RootState) => state.analytics);

  React.useEffect(() => {
    dispatch(fetchAnalyticsData(currentFilter));
  }, [dispatch, currentFilter]);

  const handleFilterChange = (newFilter: Partial<AnalyticsFilter>) => {
    dispatch(setFilter({ ...currentFilter, ...newFilter }));
  };

  const navigateToDetailReport = (reportType: string) => {
    switch (reportType) {
      case 'sales':
        navigation.navigate("SalesReport", { filter: currentFilter.dateRange });
        break;
      case 'traffic':
        navigation.navigate("TrafficReport", { filter: currentFilter.dateRange });
        break;
      case 'reviews':
        navigation.navigate("ReviewAnalytics");
        break;
      case 'expenses':
        navigation.navigate("ExpenseReport");
        break;
    }
  };

  const renderMetricCard = (title: string, value: string, change: string, isPositive: boolean) => (
    <StackLayout className="card">
      <Label className="text-subtitle">{title}</Label>
      <Label className="text-title mt-2">{value}</Label>
      <StackLayout orientation="horizontal" className="mt-1">
        <Label className={isPositive ? "text-success" : "text-error"}>
          {isPositive ? "↑" : "↓"} {change}
        </Label>
      </StackLayout>
    </StackLayout>
  );

  const renderChartCard = (title: string, type: string) => (
    <StackLayout className="card" onTap={() => navigateToDetailReport(type)}>
      <StackLayout orientation="horizontal" className="justify-between mb-2">
        <Label className="text-subtitle">{title}</Label>
        <Button text="More" className="text-sm text-primary p-0" />
      </StackLayout>

      <GridLayout columns="*" className="h-32 bg-primary100 rounded-md">
        <Label className="text-center">Chart Placeholder</Label>
      </GridLayout>
    </StackLayout>
  );

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <GridLayout rows="auto" columns="*, auto" className="mb-4">
          <Label col={0} className="text-title">Analytics Dashboard</Label>
          <DropDown
            col={1}
            items={["Today", "This Week", "This Month", "This Year"]}
            selectedIndex={
              currentFilter.dateRange === "day" ? 0 :
              currentFilter.dateRange === "week" ? 1 :
              currentFilter.dateRange === "month" ? 2 : 3
            }
            onSelectedIndexChanged={(args) => {
              const dateRanges = ["day", "week", "month", "year"];
              handleFilterChange({ dateRange: dateRanges[args.object.selectedIndex] as any });
            }}
            className="w-32"
          />
        </GridLayout>

        <GridLayout columns="*, *" rows="auto, auto" className="mb-4">
          {renderMetricCard("Total Sales", "$5,240.50", "12.8%", true)}
          {renderMetricCard("Orders", "126", "5.2%", true)}
          {renderMetricCard("Avg. Order Value", "$41.59", "2.3%", true)}
          {renderMetricCard("Conversion Rate", "3.2%", "0.5%", false)}
        </GridLayout>

        {renderChartCard("Sales Over Time", "sales")}
        {renderChartCard("Store Traffic", "traffic")}
        {renderChartCard("Top Products", "sales")}

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Recent Orders</Label>

          {[
            { id: "#ORD-1234", amount: "$125.00", status: "Delivered", statusClass: "text-success" },
            { id: "#ORD-1233", amount: "$78.50", status: "Shipped", statusClass: "text-primary" },
            { id: "#ORD-1232", amount: "$243.75", status: "Processing", statusClass: "text-warning" },
          ].map(order => (
            <StackLayout key={order.id} className="border-b border-divider p-2">
              <Label className="text-body font-bold">{order.id}</Label>
              <StackLayout orientation="horizontal" className="justify-between">
                <Label className="text-body">{order.amount}</Label>
                <Label className={order.statusClass}>{order.status}</Label>
              </StackLayout>
            </StackLayout>
          ))}

          <Button text="View All Orders" className="text-primary text-sm mt-2 self-end" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  );
}
