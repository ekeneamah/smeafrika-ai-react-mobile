import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { PurchaseOrderListScreen } from "../../screens/purchase/PurchaseOrderListScreen";
import { PurchaseOrderDetailScreen } from "../../screens/purchase/PurchaseOrderDetailScreen";
import { PurchaseOrderFormScreen } from "../../screens/purchase/PurchaseOrderFormScreen";
import { SupplierListScreen } from "../../screens/purchase/SupplierListScreen";
import { SupplierDetailScreen } from "../../screens/purchase/SupplierDetailScreen";
import { SupplierAnalyticsScreen } from "../../screens/purchase/SupplierAnalyticsScreen";
import { RouteProp } from "@react-navigation/core";

const StackNavigator = stackNavigatorFactory();

export type PurchaseStackParamList = {
  PurchaseOrderList: undefined;
  PurchaseOrderDetail: { orderId: string };
  PurchaseOrderForm: { orderId?: string; supplierId?: string };
  SupplierList: undefined;
  SupplierDetail: { supplierId: string };
  SupplierAnalytics: { supplierId: string };
};

export const PurchaseTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="PurchaseOrderList"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="PurchaseOrderList" 
      component={PurchaseOrderListScreen}
      options={{
        title: "Purchase Orders",
      }}
    />
    <StackNavigator.Screen 
      name="PurchaseOrderDetail" 
      component={PurchaseOrderDetailScreen}
      options={{
        title: "Order Details",
      }}
    />
    <StackNavigator.Screen 
      name="PurchaseOrderForm" 
      component={PurchaseOrderFormScreen}
      options={({ route }: { route: RouteProp<PurchaseStackParamList, "PurchaseOrderForm"> }) => ({
        title: route.params?.orderId ? "Edit Order" : "New Order",
      })}
    />
    <StackNavigator.Screen 
      name="SupplierList" 
      component={SupplierListScreen}
      options={{
        title: "Suppliers",
      }}
    />
    <StackNavigator.Screen 
      name="SupplierDetail" 
      component={SupplierDetailScreen}
      options={{
        title: "Supplier Details",
      }}
    />
    <StackNavigator.Screen 
      name="SupplierAnalytics" 
      component={SupplierAnalyticsScreen}
      options={{
        title: "Supplier Analytics",
      }}
    />
  </StackNavigator.Navigator>
);