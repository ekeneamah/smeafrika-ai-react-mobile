import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AnalyticsStackParamList } from "../../components/navigation/AnalyticsTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { colors } from "../../theme/colors";

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
    <scrollView class="bg-background">
      <stackLayout class="p-4">
        <gridLayout columns="*, auto" class="mb-4">
          <label col="0" class="text-title">Sales Report</label>
          <dropDown
            col="1"
            items={["This Week", "This Month", "This Quarter", "This Year"]}
            selectedIndex={0}
            class="w-32"
            onSelectedIndexChange={(e) => {
              const ranges = ["week", "month", "quarter", "year"];
              setTimeRange(ranges[e.object.selectedIndex]);
            }}
          />
        </gridLayout>

        <stackLayout class="card">
          <label class="text-subtitle mb-2">Sales Overview</label>
          <gridLayout columns="*, *" rows="auto, auto" class="text-center">
            <stackLayout col="0" row="0" class="p-2">
              <label class="text-title">$24,500</label>
              <label class="text-body">Total Sales</label>
            </stackLayout>
            <stackLayout col="1" row="0" class="p-2">
              <label class="text-title">186</label>
              <label class="text-body">Orders</label>
            </stackLayout>
            <stackLayout col="0" row="1" class="p-2">
              <label class="text-title">$131.72</label>
              <label class="text-body">Avg. Order Value</label>
            </stackLayout>
            <stackLayout col="1" row="1" class="p-2">
              <label class="text-title">3.2%</label>
              <label class="text-body">Conversion Rate</label>
            </stackLayout>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Sales Trend</label>
          <gridLayout class="h-48 bg-primary100 rounded-md">
            <label class="text-center">Sales Trend Chart</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Top Products</label>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Wireless Earbuds</label>
              <label col="1" row="0" class="text-body">$5,200</label>
              <label col="0" row="1" class="text-body text-secondary">40 units sold</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Smart Watch</label>
              <label col="1" row="0" class="text-body">$4,800</label>
              <label col="0" row="1" class="text-body text-secondary">24 units sold</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Bluetooth Speaker</label>
              <label col="1" row="0" class="text-body">$3,200</label>
              <label col="0" row="1" class="text-body text-secondary">40 units sold</label>
            </gridLayout>
          </stackLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Sales by Category</label>
          <gridLayout class="h-48 bg-primary100 rounded-md">
            <label class="text-center">Category Distribution Chart</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Payment Methods</label>
          <gridLayout columns="*, auto" rows="auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">Credit Card</label>
            <label col="1" row="0" class="text-body">65%</label>
            <progressBar row="1" colSpan="2" value={65} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>

          <gridLayout columns="*, auto" rows="auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">PayPal</label>
            <label col="1" row="0" class="text-body">25%</label>
            <progressBar row="1" colSpan="2" value={25} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>

          <gridLayout columns="*, auto" rows="auto, auto, auto">
            <label col="0" row="0" class="text-body">Bank Transfer</label>
            <label col="1" row="0" class="text-body">10%</label>
            <progressBar row="1" colSpan="2" value={10} maxValue={100} class="bg-primary100" color={colors.primary} />
          </gridLayout>
        </stackLayout>
      </stackLayout>
    </scrollView>
  );
}