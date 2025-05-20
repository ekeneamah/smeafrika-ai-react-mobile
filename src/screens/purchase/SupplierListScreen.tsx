import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { colors } from "../../theme/colors";

type SupplierListScreenProps = {
  route: RouteProp<PurchaseStackParamList, "SupplierList">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "SupplierList">,
};

export function SupplierListScreen({ navigation }: SupplierListScreenProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');

  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingIndicator text="Loading suppliers..." />;
  }

  return (
    <gridLayout rows="auto, auto, *" class="bg-background">
      <stackLayout row="0" class="p-4">
        <searchBar 
          hint="Search suppliers..." 
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
          8 Suppliers
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
          <stackLayout class="card" onTap={() => navigation.navigate("SupplierDetail", { supplierId: "1" })}>
            <gridLayout columns="*, auto" rows="auto, auto, auto">
              <label col="0" row="0" class="text-subtitle">Tech Supplies Inc.</label>
              <label col="1" row="0" class="text-success">Active</label>
              <label col="0" row="1" class="text-body">Contact: John Smith</label>
              <label col="0" row="2" class="text-body text-secondary">Orders: 25 | Total: $45,250</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="card" onTap={() => navigation.navigate("SupplierDetail", { supplierId: "2" })}>
            <gridLayout columns="*, auto" rows="auto, auto, auto">
              <label col="0" row="0" class="text-subtitle">Global Electronics</label>
              <label col="1" row="0" class="text-success">Active</label>
              <label col="0" row="1" class="text-body">Contact: Jane Doe</label>
              <label col="0" row="2" class="text-body text-secondary">Orders: 18 | Total: $32,780</label>
            </gridLayout>
          </stackLayout>
        </stackLayout>
      </scrollView>
      
      <button text="+" class="fab" onTap={() => {
        Dialogs.action({
          title: "Add Supplier",
          message: "Choose an option",
          cancelButtonText: "Cancel",
          actions: ["Create New", "Import from Contacts"]
        }).then(result => {
          if (result === "Create New") {
            // Handle new supplier creation
          } else if (result === "Import from Contacts") {
            // Handle contact import
          }
        });
      }} />
      
      <SwipeUpPanel
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter Suppliers"
      >
        <stackLayout class="p-4">
          <stackLayout class="mb-4">
            <label class="form-label">Status</label>
            <segmentedBar selectedIndex={0} class="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="Active" />
              <segmentedBarItem title="Inactive" />
            </segmentedBar>
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="form-label">Sort By</label>
            <segmentedBar selectedIndex={0}>
              <segmentedBarItem title="Name" />
              <segmentedBarItem title="Orders" />
              <segmentedBarItem title="Total" />
            </segmentedBar>
          </stackLayout>
          
          <button class="btn-primary mt-4" text="Apply Filters" onTap={() => setFilterOpen(false)} />
        </stackLayout>
      </SwipeUpPanel>
    </gridLayout>
  );
}