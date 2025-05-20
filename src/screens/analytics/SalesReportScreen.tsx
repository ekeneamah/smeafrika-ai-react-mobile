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

type SalesReportScreenProps = {
  route: RouteProp<AnalyticsStackParamList, "SalesReport">,
  navigation: FrameNavigationProp<AnalyticsStackParamList, "SalesReport">,
};

export function SalesReportScreen({ route }: SalesReportScreenProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState(route.params?.filter || 'week');

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingIndicator text="Loading sales report..." />;
  }

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <GridLayout columns="*, auto" className="mb-4">
          <Label col={0} className="text-title">Sales Report</Label>
          <DropDown
            col={1}
            items={["This Week", "This Month", "This Quarter", "This Year"]}
            selectedIndex={0}
            className="w-32"
            onSelectedIndexChanged={(e) => {
              const ranges = ["week", "month", "quarter", "year"];
              setTimeRange(ranges[e.object.selectedIndex]);
            }}
          />
        </GridLayout>

        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Sales Overview</Label>
          <GridLayout columns="*, *" rows="auto, auto" className="text-center">
            <StackLayout col={0} row={0} className="p-2">
              <Label className="text-title">$24,500</Label>
              <Label className="text-body">Total Sales</Label>
            </StackLayout>
            <StackLayout col={1} row={0} className="p-2">
              <Label className="text-title">186</Label>
              <Label className="text-body">Orders</Label>
            </StackLayout>
            <StackLayout col={0} row={1} className="p-2">
              <Label className="text-title">$131.72</Label>
              <Label className="text-body">Avg. Order Value</Label>
            </StackLayout>
            <StackLayout col={1} row={1} className="p-2">
              <Label className="text-title">3.2%</Label>
              <Label className="text-body">Conversion Rate</Label>
            </StackLayout>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Sales Trend</Label>
          <GridLayout columns="*" className="h-48 bg-primary100 rounded-md">
            <Label className="text-center">Sales Trend Chart</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Top Products</Label>
          {[
            { title: "Wireless Earbuds", sales: "$5,200", units: "40 units sold" },
            { title: "Smart Watch", sales: "$4,800", units: "24 units sold" },
            { title: "Bluetooth Speaker", sales: "$3,200", units: "40 units sold" },
          ].map((p, i) => (
            <StackLayout key={i} className={i < 2 ? "border-b border-divider p-2" : "p-2"}>
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col={0} row={0} className="text-body font-bold">{p.title}</Label>
                <Label col={1} row={0} className="text-body">{p.sales}</Label>
                <Label col={0} row={1} className="text-body text-secondary">{p.units}</Label>
              </GridLayout>
            </StackLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Sales by Category</Label>
          <GridLayout columns="*" className="h-48 bg-primary100 rounded-md">
            <Label className="text-center">Category Distribution Chart</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Payment Methods</Label>
          {[
            { method: "Credit Card", value: 65 },
            { method: "PayPal", value: 25 },
            { method: "Bank Transfer", value: 10 },
          ].map((p, i) => (
            <GridLayout key={i} columns="*, auto" rows="auto, auto, auto" className="mb-2">
              <Label col={0} row={0} className="text-body">{p.method}</Label>
              <Label col={1} row={0} className="text-body">{p.value}%</Label>
              <ProgressBar row={1} colSpan={2} value={p.value} maxValue={100} className="bg-primary100" color={colors.primary} />
            </GridLayout>
          ))}
        </StackLayout>
      </StackLayout>
    </ScrollView>
  );
}
