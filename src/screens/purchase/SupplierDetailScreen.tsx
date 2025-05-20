import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { Dialogs } from "@nativescript/core";

type SupplierDetailScreenProps = {
  route: RouteProp<PurchaseStackParamList, "SupplierDetail">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "SupplierDetail">,
};

export function SupplierDetailScreen({ route, navigation }: SupplierDetailScreenProps) {
  const { supplierId } = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [actionsOpen, setActionsOpen] = React.useState(false);

  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleStatusChange = () => {
    Dialogs.action({
      title: "Change Status",
      message: "Select new status",
      cancelButtonText: "Cancel",
      actions: ["Active", "Inactive", "Blocked"]
    }).then(result => {
      if (result !== "Cancel") {
        // Update status
      }
    });
  };

  if (isLoading) {
    return <LoadingIndicator text="Loading supplier details..." />;
  }

  return (
    <scrollView class="bg-background">
      <stackLayout class="p-4">
        <stackLayout class="card">
          <gridLayout columns="*, auto" rows="auto, auto">
            <label col="0" row="0" class="text-title">Tech Supplies Inc.</label>
            <label col="1" row="0" class="text-success">Active</label>
            <label col="0" row="1" class="text-body text-secondary">Member since Jan 2024</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Contact Information</label>
          <stackLayout class="mb-4">
            <label class="text-body">Contact: John Smith</label>
            <label class="text-body">Email: john@techsupplies.com</label>
            <label class="text-body">Phone: (555) 123-4567</label>
            <label class="text-body">Address: 123 Tech Street, Silicon Valley, CA</label>
          </stackLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Performance Metrics</label>
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
              <label class="text-title">98%</label>
              <label class="text-body">On-Time Delivery</label>
            </stackLayout>
            <stackLayout col="1" row="1" class="p-2">
              <label class="text-title">4.8</label>
              <label class="text-body">Rating</label>
            </stackLayout>
          </gridLayout>
          
          <button 
            class="text-primary text-center mt-2" 
            text="View Analytics"
            onTap={() => navigation.navigate("SupplierAnalytics", { supplierId })}
          />
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Recent Orders</label>
          
          <stackLayout class="border-b border-divider p-2">
            <label class="text-body font-bold">#PO-001</label>
            <stackLayout orientation="horizontal" class="justify-between">
              <label class="text-body">$1,250.00</label>
              <label class="text-success">Delivered</label>
            </stackLayout>
          </stackLayout>
          
          <stackLayout class="border-b border-divider p-2">
            <label class="text-body font-bold">#PO-002</label>
            <stackLayout orientation="horizontal" class="justify-between">
              <label class="text-body">$2,780.50</label>
              <label class="text-warning">Pending</label>
            </stackLayout>
          </stackLayout>
          
          <button 
            class="text-primary text-center mt-2" 
            text="View All Orders"
            onTap={() => navigation.navigate("PurchaseOrderList")}
          />
        </stackLayout>

        <gridLayout columns="*, *" class="mt-4">
          <button 
            col="0" 
            class="btn-primary m-1" 
            text="New Order"
            onTap={() => navigation.navigate("PurchaseOrderForm")}
          />
          <button 
            col="1" 
            class="btn-outline m-1" 
            text="More Actions"
            onTap={() => setActionsOpen(true)}
          />
        </gridLayout>
      </stackLayout>

      <SwipeUpPanel
        visible={actionsOpen}
        onClose={() => setActionsOpen(false)}
        title="Supplier Actions"
      >
        <stackLayout class="p-4">
          <button class="btn-outline mb-2" text="Edit Details" />
          <button class="btn-outline mb-2" text="Change Status" onTap={handleStatusChange} />
          <button class="btn-outline mb-2" text="Send Message" />
          <button class="btn-outline mb-2" text="Download Statement" />
          <button class="btn-error" text="Block Supplier" />
        </stackLayout>
      </SwipeUpPanel>
    </scrollView>
  );
}