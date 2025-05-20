import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { Dialogs } from "@nativescript/core";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";

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
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <GridLayout columns="*, auto" rows="auto, auto">
            <Label col="0" row="0" className="text-title">Tech Supplies Inc.</Label>
            <Label col="1" row="0" className="text-success">Active</Label>
            <Label col="0" row="1" className="text-body text-secondary">Member since Jan 2024</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Contact Information</Label>
          <StackLayout className="mb-4">
            <Label className="text-body">Contact: John Smith</Label>
            <Label className="text-body">Email: john@techsupplies.com</Label>
            <Label className="text-body">Phone: (555) 123-4567</Label>
            <Label className="text-body">Address: 123 Tech Street, Silicon Valley, CA</Label>
          </StackLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Performance Metrics</Label>
          <GridLayout columns="*, *" rows="auto, auto" className="text-center">
            <StackLayout col="0" row="0" className="p-2">
              <Label className="text-title">25</Label>
              <Label className="text-body">Total Orders</Label>
            </StackLayout>
            <StackLayout col="1" row="0" className="p-2">
              <Label className="text-title">$45,250</Label>
              <Label className="text-body">Total Value</Label>
            </StackLayout>
            <StackLayout col="0" row="1" className="p-2">
              <Label className="text-title">98%</Label>
              <Label className="text-body">On-Time Delivery</Label>
            </StackLayout>
            <StackLayout col="1" row="1" className="p-2">
              <Label className="text-title">4.8</Label>
              <Label className="text-body">Rating</Label>
            </StackLayout>
          </GridLayout>
          
          <Button 
            className="text-primary text-center mt-2" 
            text="View Analytics"
            onTap={() => navigation.navigate("SupplierAnalytics", { supplierId })}
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Recent Orders</Label>
          
          <StackLayout className="border-b border-divider p-2">
            <Label className="text-body font-bold">#PO-001</Label>
            <StackLayout orientation="horizontal" className="justify-between">
              <Label className="text-body">$1,250.00</Label>
              <Label className="text-success">Delivered</Label>
            </StackLayout>
          </StackLayout>
          
          <StackLayout className="border-b border-divider p-2">
            <Label className="text-body font-bold">#PO-002</Label>
            <StackLayout orientation="horizontal" className="justify-between">
              <Label className="text-body">$2,780.50</Label>
              <Label className="text-warning">Pending</Label>
            </StackLayout>
          </StackLayout>
          
          <Button 
            className="text-primary text-center mt-2" 
            text="View All Orders"
            onTap={() => navigation.navigate("PurchaseOrderList")}
          />
        </StackLayout>

        <GridLayout columns="*, *" className="mt-4">
          <Button 
            col="0" 
            className="btn-primary m-1" 
            text="New Order"
            onTap={() => navigation.navigate("PurchaseOrderForm", { supplierId })}
          />
          <Button 
            col="1" 
            className="btn-outline m-1" 
            text="More Actions"
            onTap={() => setActionsOpen(true)}
          />
        </GridLayout>
      </StackLayout>

      <SwipeUpPanel
        visible={actionsOpen}
        onClose={() => setActionsOpen(false)}
        title="Supplier Actions"
      >
        <StackLayout className="p-4">
          <Button className="btn-outline mb-2" text="Edit Details" />
          <Button className="btn-outline mb-2" text="Change Status" onTap={handleStatusChange} />
          <Button className="btn-outline mb-2" text="Send Message" />
          <Button className="btn-outline mb-2" text="Download Statement" />
          <Button className="btn-error" text="Block Supplier" />
        </StackLayout>
      </SwipeUpPanel>
    </ScrollView>
  );
}