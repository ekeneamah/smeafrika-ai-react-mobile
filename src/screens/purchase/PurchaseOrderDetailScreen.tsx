import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { Dialogs } from "@nativescript/core";

type PurchaseOrderDetailScreenProps = {
  route: RouteProp<PurchaseStackParamList, "PurchaseOrderDetail">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "PurchaseOrderDetail">,
};

export function PurchaseOrderDetailScreen({ route, navigation }: PurchaseOrderDetailScreenProps) {
  const { orderId } = route.params;
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
      actions: ["Pending", "Processing", "Delivered", "Cancelled"]
    }).then(result => {
      if (result !== "Cancel") {
        // Update status
      }
    });
  };

  if (isLoading) {
    return <LoadingIndicator text="Loading order details..." />;
  }

  return (
    <scrollView class="bg-background">
      <stackLayout class="p-4">
        <stackLayout class="card">
          <gridLayout columns="*, auto" rows="auto, auto">
            <label col="0" row="0" class="text-title">#PO-001</label>
            <label col="1" row="0" class="text-success">Delivered</label>
            <label col="0" row="1" class="text-body text-secondary">Created on Mar 10, 2024</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Supplier Details</label>
          <stackLayout class="mb-4">
            <label class="text-body font-bold">Tech Supplies Inc.</label>
            <label class="text-body">Contact: John Smith</label>
            <label class="text-body">Email: john@techsupplies.com</label>
            <label class="text-body">Phone: (555) 123-4567</label>
          </stackLayout>
          
          <button 
            class="text-primary text-center" 
            text="View Supplier Profile"
            onTap={() => navigation.navigate("SupplierDetail", { supplierId: "1" })}
          />
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Order Items</label>
          
          <stackLayout class="border-b border-divider p-2">
            <label class="text-body font-bold">Wireless Earbuds</label>
            <gridLayout columns="*, auto">
              <label col="0" class="text-body">5 x $50.00</label>
              <label col="1" class="text-body">$250.00</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="border-b border-divider p-2">
            <label class="text-body font-bold">Smart Watches</label>
            <gridLayout columns="*, auto">
              <label col="0" class="text-body">10 x $100.00</label>
              <label col="1" class="text-body">$1,000.00</label>
            </gridLayout>
          </stackLayout>
          
          <gridLayout columns="*, auto" class="p-2">
            <label col="0" class="text-subtitle">Total</label>
            <label col="1" class="text-subtitle">$1,250.00</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Delivery Details</label>
          <label class="text-body">Expected: Mar 15, 2024</label>
          <label class="text-body">Shipping Method: Express Delivery</label>
          <label class="text-body">Tracking: #TRK123456789</label>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Payment Details</label>
          <label class="text-body">Method: Bank Transfer</label>
          <label class="text-body">Status: Paid</label>
          <label class="text-body">Transaction ID: #TX987654321</label>
        </stackLayout>

        <gridLayout columns="*, *" class="mt-4">
          <button 
            col="0" 
            class="btn-primary m-1" 
            text="Edit Order"
            onTap={() => navigation.navigate("PurchaseOrderForm", { orderId })}
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
        title="Order Actions"
      >
        <stackLayout class="p-4">
          <button class="btn-outline mb-2" text="Change Status" onTap={handleStatusChange} />
          <button class="btn-outline mb-2" text="Download Invoice" />
          <button class="btn-outline mb-2" text="Send to Supplier" />
          <button class="btn-outline mb-2" text="Track Shipment" />
          <button class="btn-error" text="Cancel Order" />
        </stackLayout>
      </SwipeUpPanel>
    </scrollView>
  );
}