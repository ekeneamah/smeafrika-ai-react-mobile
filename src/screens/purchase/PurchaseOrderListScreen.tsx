import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { colors } from "../../theme/colors";

type PurchaseOrderListScreenProps = {
  route: RouteProp<PurchaseStackParamList, "PurchaseOrderList">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "PurchaseOrderList">,
};

export function PurchaseOrderListScreen({ navigation }: PurchaseOrderListScreenProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');

  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingIndicator text="Loading purchase orders..." />;
  }

  return (
    <gridLayout rows="auto, auto, *" class="bg-background">
      <stackLayout row="0" class="p-4">
        <searchBar 
          hint="Search orders..." 
          text={searchText} 
          onTextChange={(e) => setSearchText(e.object.text)}
          class="form-input"
        />
      </stackLayout>
      
      <gridLayout row="1" columns="auto, *, auto" class="p-2">
        <button 
          col="0" 
          text="Filter" 
          class="btn-outline text-sm p-2" 
          onTap={() => setFilterOpen(true)}
        />
        
        <label col="1" class="text-subtitle ml-2 text-center">
          12 Orders
        </label>
        
        <segmentedBar 
          col="2"
          selectedIndex={viewMode === 'list' ? 0 : 1}
          class="w-24"
          selectedBackgroundColor={colors.primary}
          onSelectedIndexChange={(e) => setViewMode(e.object.selectedIndex === 0 ? 'list' : 'grid')}
        >
          <segmentedBarItem title="List" />
          <segmentedBarItem title="Grid" />
        </segmentedBar>
      </gridLayout>
      
      <scrollView row="2" class="p-2">
        <stackLayout>
          {/* Sample Order Items */}
          <stackLayout class="card" onTap={() => navigation.navigate("PurchaseOrderDetail", { orderId: "1" })}>
            <gridLayout columns="*, auto" rows="auto, auto, auto">
              <label col="0" row="0" class="text-subtitle">#PO-001</label>
              <label col="1" row="0" class="text-success">Delivered</label>
              <label col="0" row="1" class="text-body">Supplier: Tech Supplies Inc.</label>
              <label col="1" row="1" class="text-body">$1,250.00</label>
              <label col="0" row="2" class="text-body text-secondary">Due: Mar 15, 2024</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="card" onTap={() => navigation.navigate("PurchaseOrderDetail", { orderId: "2" })}>
            <gridLayout columns="*, auto" rows="auto, auto, auto">
              <label col="0" row="0" class="text-subtitle">#PO-002</label>
              <label col="1" row="0" class="text-warning">Pending</label>
              <label col="0" row="1" class="text-body">Supplier: Global Electronics</label>
              <label col="1" row="1" class="text-body">$2,780.50</label>
              <label col="0" row="2" class="text-body text-secondary">Due: Mar 20, 2024</label>
            </gridLayout>
          </stackLayout>
        </stackLayout>
      </scrollView>
      
      <button text="+" class="fab" onTap={() => navigation.navigate("PurchaseOrderForm")} />
      
      <SwipeUpPanel
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter Orders"
      >
        <stackLayout class="p-4">
          <stackLayout class="mb-4">
            <label class="form-label">Status</label>
            <segmentedBar selectedIndex={0} class="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="Pending" />
              <segmentedBarItem title="Delivered" />
            </segmentedBar>
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="form-label">Date Range</label>
            <segmentedBar selectedIndex={0} class="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="This Month" />
              <segmentedBarItem title="Last Month" />
            </segmentedBar>
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="form-label">Sort By</label>
            <segmentedBar selectedIndex={0}>
              <segmentedBarItem title="Date" />
              <segmentedBarItem title="Amount" />
              <segmentedBarItem title="Status" />
            </segmentedBar>
          </stackLayout>
          
          <button class="btn-primary mt-4" text="Apply Filters" onTap={() => setFilterOpen(false)} />
        </stackLayout>
      </SwipeUpPanel>
    </gridLayout>
  );
}