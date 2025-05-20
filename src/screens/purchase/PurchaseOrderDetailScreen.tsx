import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { Alert } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  Label,
  GridLayout,
  StackLayout,
  ScrollView,
  Button
} from "../../components/native/nativeElements";
import { fetchOrderById, cancelOrder, trackShipment } from "../../store/slices/purchaseSlice";
import { RootState } from "../../store/store";

export const PurchaseOrderDetailScreen = ({ route, navigation }: {
  route: RouteProp<PurchaseStackParamList, "PurchaseOrderDetail">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "PurchaseOrderDetail">
}) => {
  const { orderId } = route.params;
  const dispatch = useDispatch();
  const { currentOrder: order, isLoading, error } = useSelector((state: RootState) => state.purchase);
  const [actionsOpen, setActionsOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchOrderById(orderId) as any);
  }, [orderId, dispatch]);

  const handleStatusChange = () => {
    Alert.alert("Change Status", "Select new status", [
      { text: "Pending" },
      { text: "Processing" },
      { text: "Delivered" },
      { text: "Cancelled", onPress: handleCancelOrder },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  const handleDownloadInvoice = async () => {
    if (!order) return;
    const html = `
      <h1>Invoice for Order #${orderId}</h1>
      <p>Status: ${order.status}</p>
      <p>Total: $${order.totalAmount}</p>
      <p>Date: ${order.createdAt}</p>
    `;
    const file = await RNHTMLtoPDF.convert({ html, fileName: `Invoice-${orderId}`, directory: 'Documents' });
    Alert.alert("Invoice Saved", `PDF saved to ${file.filePath}`);
  };

  const handleSendToSupplier = () => {
    if (order) {
      Alert.alert("Sent", `Order ${orderId} has been sent to supplier ID ${order.supplierId}`);
    }
  };

  const handleTrackShipment = async () => {
    if (order?.trackingNumber) {
      try {
        const tracking = await dispatch(trackShipment(order.trackingNumber) as any).unwrap();
        Alert.alert("Tracking Information", `Status: ${tracking.status}\nLocation: ${tracking.location}\nETA: ${tracking.estimatedDelivery}`);
      } catch {
        Alert.alert("Error", "Failed to track shipment");
      }
    }
  };

  const handleCancelOrder = async () => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await dispatch(cancelOrder(orderId) as any).unwrap();
              Alert.alert("Cancelled", `Order ${orderId} has been cancelled.`);
            } catch {
              Alert.alert("Error", "Failed to cancel order");
            }
          }
        }
      ]
    );
  };

  if (isLoading || !order) {
    return <LoadingIndicator text="Loading order details..." />;
  }

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <GridLayout columns="*, auto" rows="auto, auto">
            <Label col={0} row={0} className="text-title">#{order.id}</Label>
            <Label col={1} row={0} className="text-success">{order.status}</Label>
            <Label col={0} row={1} className="text-body text-secondary">Created on {order.createdAt}</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Supplier Details</Label>
          <StackLayout className="mb-4">
            <Label className="text-body font-bold">Supplier ID: {order.supplierId}</Label>
          </StackLayout>
          <Button
            className="text-primary text-center"
            text="View Supplier Profile"
            onTap={() => navigation.navigate("SupplierDetail", { supplierId: order.supplierId })}
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Order Items</Label>
          {order.items.map((item, index) => (
            <StackLayout key={index} className="border-b border-divider p-2">
              <Label className="text-body font-bold">{item.name}</Label>
              <GridLayout columns="*, auto">
                <Label col={0} className="text-body">{item.quantity} x ${item.unitPrice.toFixed(2)}</Label>
                <Label col={1} className="text-body">${item.totalPrice.toFixed(2)}</Label>
              </GridLayout>
            </StackLayout>
          ))}
          <GridLayout columns="*, auto" className="p-2">
            <Label col={0} className="text-subtitle">Total</Label>
            <Label col={1} className="text-subtitle">${order.totalAmount.toFixed(2)}</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Delivery Details</Label>
          <Label className="text-body">Expected: {order.deliveryDate}</Label>
          <Label className="text-body">Shipping Method: Express Delivery</Label>
          <Label className="text-body">Tracking: {order.trackingNumber}</Label>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Payment Details</Label>
          <Label className="text-body">Method: {order.paymentMethod}</Label>
          <Label className="text-body">Status: {order.paymentStatus}</Label>
        </StackLayout>

        <GridLayout columns="*, *" className="mt-4">
          <Button
            col={0}
            className="btn-primary m-1"
            text="Edit Order"
            onTap={() => navigation.navigate("PurchaseOrderForm", { orderId })}
          />
          <Button
            col={1}
            className="btn-outline m-1"
            text="More Actions"
            onTap={() => setActionsOpen(true)}
          />
        </GridLayout>
      </StackLayout>

      <SwipeUpPanel
        visible={actionsOpen}
        onClose={() => setActionsOpen(false)}
        title="Order Actions"
      >
        <StackLayout className="p-4">
          <Button className="btn-outline mb-2" text="Change Status" onTap={handleStatusChange} />
          <Button className="btn-outline mb-2" text="Download Invoice" onTap={handleDownloadInvoice} />
          <Button className="btn-outline mb-2" text="Send to Supplier" onTap={handleSendToSupplier} />
          <Button className="btn-outline mb-2" text="Track Shipment" onTap={handleTrackShipment} />
          <Button className="btn-error" text="Cancel Order" onTap={handleCancelOrder} />
        </StackLayout>
      </SwipeUpPanel>
    </ScrollView>
  );
};
