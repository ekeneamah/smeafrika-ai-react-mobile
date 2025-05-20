import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { colors } from "../../theme/colors";

type SupplierAnalyticsScreenProps = {
  route: RouteProp<PurchaseStackParamList, "SupplierAnalytics">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "SupplierAnalytics">,
};

export function SupplierAnalyticsScreen({ route }: SupplierAnalyticsScreenProps) {
  const { supplierId } = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState('month');

  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingIndicator text="Loading analytics..." />;
  }

  return (
    <scrollView class="bg-background">
      <stackLayout class="p-4">
        <gridLayout columns="*, auto" class="mb-4">
          <label col="0" class="text-title">Supplier Analytics</label>
          <dropDown
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
          <label class="text-subtitle mb-2">Order Summary</label>
          <gridLayout columns="*, *" rows="auto, auto" class="text-center">
            <stackLayout col="0" row="0" class="p-2">
              <label class="text-title">25</label>
              <label class="text-body">Total Orders</label>
            </stackLayout>
            <stackLayout col="1" row="0" class="p-2">
              <label class="text-title">$45,250</label>
              <label class="text-body">Total Value</label>
            </stackLayout>
            <stackLayout col="0" row="1" class="p-2">
              <label class="text-title">$1,810</label>
              <label class="text-body">Avg. Order Value</label>
            </stackLayout>
            <stackLayout col="1" row="1" class="p-2">
              <label class="text-title">8</label>
              <label class="text-body">Active Orders</label>
            </stackLayout>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Order Trends</label>
          {/* Chart placeholder */}
          <gridLayout class="h-48 bg-primary100 rounded-md">
            <label class="text-center">Order Value Trend Chart</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Performance Metrics</label>
          <stackLayout class="mb-4">
            <gridLayout columns="*, auto" class="mb-2">
              <label col="0" class="text-body">On-Time Delivery Rate</label>
              <label col="1" class="text-success">98%</label>
            </gridLayout>
            <progressBar value={98} maxValue={100} class="bg-primary100" color={colors.success} />
          </stackLayout>

          <stackLayout class="mb-4">
            <gridLayout columns="*, auto" class="mb-2">
              <label col="0" class="text-body">Quality Rating</label>
              <label col="1" class="text-primary">4.8/5.0</label>
            </gridLayout>
            <progressBar value={4.8} maxValue={5} class="bg-primary100" color={colors.primary} />
          </stackLayout>

          <stackLayout class="mb-4">
            <gridLayout columns="*, auto" class="mb-2">
              <label col="0" class="text-body">Response Time</label>
              <label col="1" class="text-warning">85%</label>
            </gridLayout>
            <progressBar value={85} maxValue={100} class="bg-primary100" color={colors.warning} />
          </stackLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Top Products</label>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Wireless Earbuds</label>
              <label col="1" row="0" class="text-body">$12,500</label>
              <label col="0" row="1" class="text-body text-secondary">250 units</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Smart Watches</label>
              <label col="1" row="0" class="text-body">$10,000</label>
              <label col="0" row="1" class="text-body text-secondary">100 units</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Bluetooth Speakers</label>
              <label col="1" row="0" class="text-body">$8,000</label>
              <label col="0" row="1" class="text-body text-secondary">100 units</label>
            </gridLayout>
          </stackLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Issues & Returns</label>
          <gridLayout columns="*, *" rows="auto, auto" class="text-center">
            <stackLayout col="0" row="0" class="p-2">
              <label class="text-title text-warning">3</label>
              <label class="text-body">Quality Issues</label>
            </stackLayout>
            <stackLayout col="1" row="0" class="p-2">
              <label class="text-title text-error">2</label>
              <label class="text-body">Late Deliveries</label>
            </stackLayout>
            <stackLayout col="0" row="1" class="p-2">
              <label class="text-title">1.2%</label>
              <label class="text-body">Return Rate</label>
            </stackLayout>
            <stackLayout col="1" row="1" class="p-2">
              <label class="text-title">$520</label>
              <label class="text-body">Return Value</label>
            </stackLayout>
          </gridLayout>
        </stackLayout>
      </stackLayout>
    </scrollView>
  );
}