import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { ProductListingScreen } from "../../screens/store/ProductListingScreen";
import { ProductDetailScreen } from "../../screens/store/ProductDetailScreen";
import { ProductEditScreen } from "../../screens/store/ProductEditScreen";
import { ProductAnalyticsScreen } from "../../screens/store/ProductAnalyticsScreen";
import { OrderListScreen } from "../../screens/store/OrderListScreen";
import { OrderDetailScreen } from "../../screens/store/OrderDetailScreen";
import { CustomerListScreen } from "../../screens/store/CustomerListScreen";
import { CustomerDetailScreen } from "../../screens/store/CustomerDetailScreen";

const StackNavigator = stackNavigatorFactory();

export type StoreStackParamList = {
  ProductListing: undefined;
  ProductDetail: { productId: string };
  ProductEdit: { productId: string };
  ProductAnalytics: { productId: string };
  OrderList: undefined;
  OrderDetail: { orderId: string };
  CustomerList: undefined;
  CustomerDetail: { customerId: string };
};

export const StoreTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="ProductListing"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="ProductListing" 
      component={ProductListingScreen}
      options={{
        title: "My Store",
      }}
    />
    <StackNavigator.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen}
      options={{
        title: "Product Details",
      }}
    />
    <StackNavigator.Screen 
      name="ProductEdit" 
      component={ProductEditScreen}
      options={{
        title: "Edit Product",
      }}
    />
    <StackNavigator.Screen 
      name="ProductAnalytics" 
      component={ProductAnalyticsScreen}
      options={{
        title: "Product Analytics",
      }}
    />
    <StackNavigator.Screen 
      name="OrderList" 
      component={OrderListScreen}
      options={{
        title: "Orders",
      }}
    />
    <StackNavigator.Screen 
      name="OrderDetail" 
      component={OrderDetailScreen}
      options={{
        title: "Order Details",
      }}
    />
    <StackNavigator.Screen 
      name="CustomerList" 
      component={CustomerListScreen}
      options={{
        title: "Customers",
      }}
    />
    <StackNavigator.Screen 
      name="CustomerDetail" 
      component={CustomerDetailScreen}
      options={{
        title: "Customer Profile",
      }}
    />
  </StackNavigator.Navigator>
);