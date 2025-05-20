import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useDispatch, useSelector } from "react-redux";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { ScrollView, StackLayout, GridLayout, Label, FlexboxLayout, DropDown, ProgressBar } from "../../components/native/nativeElements";
import { colors } from "../../theme/colors";
import { Dropdown } from "../../components/common/Dropdown";
import { fetchSupplierAnalytics } from "../../store/slices/analyticsSlice";
import { RootState } from "../../store/store";

export function SupplierAnalyticsScreen({ route }: {
  route: RouteProp<PurchaseStackParamList, "SupplierAnalytics">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "SupplierAnalytics">
}) {
  const { supplierId } = route.params;
  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = React.useState<'month' | 'quarter' | 'half' | 'year'>('month');
  const { supplierAnalyticsData: analyticsData, isLoading } = useSelector((state: RootState) => state.analytics);

  React.useEffect(() => {
    dispatch(fetchSupplierAnalytics({ supplierId, timeRange }) as any);
  }, [dispatch, supplierId, timeRange]);

  if (isLoading) {
    return <LoadingIndicator text="Loading analytics..." />;
  }

  if (!analyticsData) {
    return (
      <StackLayout className="p-4 items-center">
        <Label className="text-error">No data available</Label>
      </StackLayout>
    );
  }

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <GridLayout columns="*, auto" className="mb-4">
          <Label col={0} className="text-title">Supplier Analytics</Label>
          <DropDown
            col="1"
            items={["This Month", "Last 3 Months", "Last 6 Months", "This Year"]}
            selectedIndex={0}
            className="w-32"
            onSelectedIndexChanged={(e) => {
              const ranges = ["month", "quarter", "half", "year"];
              setTimeRange(ranges[(e.object as any).selectedIndex] as 'month' | 'quarter' | 'half' | 'year');
            }}
            hint="Select time range"
            showClearButton={false}
            isEnabled={!isLoading}
          />
        </GridLayout>

        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Order Summary</Label>
          <FlexboxLayout flexDirection="row" flexWrap="wrap" className="justify-between">
            <StackLayout className="p-2 w-1/2">
              <Label className="text-title">{analyticsData.totalOrders}</Label>
              <Label className="text-body">Total Orders</Label>
            </StackLayout>
            <StackLayout className="p-2 w-1/2">
              <Label className="text-title">${analyticsData.totalValue}</Label>
              <Label className="text-body">Total Value</Label>
            </StackLayout>
            <StackLayout className="p-2 w-1/2">
              <Label className="text-title">${analyticsData.avgOrderValue}</Label>
              <Label className="text-body">Avg. Order Value</Label>
            </StackLayout>
            <StackLayout className="p-2 w-1/2">
              <Label className="text-title">{analyticsData.activeOrders}</Label>
              <Label className="text-body">Active Orders</Label>
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Order Trends</Label>
          <GridLayout columns="*" className="h-48 bg-primary100 rounded-md">
            <Label className="text-center">Order Value Trend Chart</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Performance Metrics</Label>
          <StackLayout className="mb-4">
            <GridLayout columns="*, auto" className="mb-2">
              <Label col={0} className="text-body">On-Time Delivery Rate</Label>
              <Label col={1} className="text-success">{analyticsData.onTimeDeliveryRate}%</Label>
            </GridLayout>
            <ProgressBar 
              value={analyticsData.onTimeDeliveryRate} 
              maxValue={100} 
              className="bg-primary100" 
              color={colors.success} 
            />
          </StackLayout>

          <StackLayout className="mb-4">
            <GridLayout columns="*, auto" className="mb-2">
              <Label col={0} className="text-body">Quality Rating</Label>
              <Label col={1} className="text-primary">{analyticsData.qualityRating}/5.0</Label>
            </GridLayout>
            <ProgressBar value={analyticsData.qualityRating} maxValue={5} className="bg-primary100" color={colors.primary} />
          </StackLayout>

          <StackLayout className="mb-4">
            <GridLayout columns="*, auto" className="mb-2">
              <Label col={0} className="text-body">Response Time</Label>
              <Label col={1} className="text-warning">{analyticsData.responseTime}%</Label>
            </GridLayout>
            <ProgressBar value={analyticsData.responseTime} maxValue={100} className="bg-primary100" color={colors.warning} />
          </StackLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Top Products</Label>
          {analyticsData.topProducts.map((prod, i) => (
            <StackLayout key={i} className={`p-2 ${i < analyticsData.topProducts.length - 1 ? 'border-b border-divider' : ''}`}>
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col={0} row={0} className="text-body font-bold">{prod.name}</Label>
                <Label col={1} row={0} className="text-body">${prod.totalValue}</Label>
                <Label col={0} row={1} className="text-body text-secondary">{prod.units} units</Label>
              </GridLayout>
            </StackLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Issues & Returns</Label>
          <GridLayout columns="*, *" rows="auto, auto" className="text-center">
            <StackLayout col={0} row={0} className="p-2">
              <Label className="text-title text-warning">{analyticsData.issues.quality}</Label>
              <Label className="text-body">Quality Issues</Label>
            </StackLayout>
            <StackLayout col={1} row={0} className="p-2">
              <Label className="text-title text-error">{analyticsData.issues.lateDeliveries}</Label>
              <Label className="text-body">Late Deliveries</Label>
            </StackLayout>
            <StackLayout col={0} row={1} className="p-2">
              <Label className="text-title">{analyticsData.issues.returnRate}%</Label>
              <Label className="text-body">Return Rate</Label>
            </StackLayout>
            <StackLayout col={1} row={1} className="p-2">
              <Label className="text-title">${analyticsData.issues.returnValue}</Label>
              <Label className="text-body">Return Value</Label>
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  );
}

export default SupplierAnalyticsScreen;
