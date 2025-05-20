import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useDispatch, useSelector } from "react-redux";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { Dialogs } from "@nativescript/core";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchProducts, fetchSuppliers } from "../../store/slices/metaSlice";
import { savePurchaseOrder } from "../../store/slices/purchaseSlice";

const PurchaseOrderFormScreen = ({ route, navigation }: {
  route: RouteProp<PurchaseStackParamList, "PurchaseOrderForm">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "PurchaseOrderForm">
}) => {
  const { orderId } = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const { products, suppliers } = useSelector((state: RootState) => state.meta);

  const [isLoading, setIsLoading] = React.useState(!!orderId);
  const [supplierSelectorOpen, setSupplierSelectorOpen] = React.useState(false);
  const [productSelectorOpen, setProductSelectorOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    supplier: '',
    items: [] as Array<{ id: string; name: string; quantity: number; price: number }> ,
    deliveryDate: new Date(),
    shippingMethod: '',
    paymentMethod: '',
    notes: ''
  });

  React.useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSuppliers());

    if (orderId) {
      setTimeout(() => {
        setFormData({
          supplier: 'Tech Supplies Inc.',
          items: [
            { id: '1', name: 'Wireless Earbuds', quantity: 5, price: 50 },
            { id: '2', name: 'Smart Watches', quantity: 10, price: 100 }
          ],
          deliveryDate: new Date('2024-03-15'),
          shippingMethod: 'Express Delivery',
          paymentMethod: 'Bank Transfer',
          notes: ''
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [dispatch, orderId]);

  const handleSubmit = async () => {
    if (!formData.supplier || formData.items.length === 0) {
      Dialogs.alert({ title: "Validation Error", message: "Please complete all required fields.", okButtonText: "OK" });
      return;
    }

    try {
      await dispatch(savePurchaseOrder(formData));
      Dialogs.alert({ title: "Success", message: "Order saved successfully.", okButtonText: "OK" });
      navigation.goBack();
    } catch (err) {
      Dialogs.alert({ title: "Error", message: "Failed to save order.", okButtonText: "OK" });
    }
  };

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Supplier</Label>
          <Button className={`form-input text-left ${!formData.supplier ? 'text-secondary' : ''}`} text={formData.supplier || "Select Supplier"} onTap={() => setSupplierSelectorOpen(true)} />
        </StackLayout>

        <StackLayout className="card mt-4">
          <GridLayout columns="*, auto" className="mb-2">
            <Label col={0} className="text-subtitle">Items</Label>
            <Button col={1} className="text-primary p-0" text="+ Add Item" onTap={() => setProductSelectorOpen(true)} />
          </GridLayout>
          {formData.items.map((item, index) => (
            <StackLayout key={item.id} className="border-b border-divider p-2">
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col={0} row={0} className="text-body font-bold">{item.name}</Label>
                <Button col={1} row={0} className="text-error text-sm p-0" text="Remove" onTap={() => {
                  const newItems = formData.items.filter((_, i) => i !== index);
                  setFormData({ ...formData, items: newItems });
                }} />
                <Label col={0} row={1} className="text-body">Qty: {item.quantity}</Label>
                <Label col={1} row={1} className="text-body">${(item.quantity * item.price).toFixed(2)}</Label>
              </GridLayout>
            </StackLayout>
          ))}
          <GridLayout columns="*, auto" className="p-2">
            <Label col={0} className="text-subtitle">Total</Label>
            <Label col={1} className="text-subtitle">${formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Delivery Details</Label>
          <Label className="form-label">Expected Delivery Date</Label>
          <Label className="form-input mb-2">{formData.deliveryDate.toDateString()}</Label>
          <Label className="form-label">Shipping Method</Label>
          <Label className="form-input mb-2">{formData.shippingMethod}</Label>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Payment Details</Label>
          <Label className="form-label">Payment Method</Label>
          <Label className="form-input mb-2">{formData.paymentMethod}</Label>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Notes</Label>
          <Label className="form-input h-32">{formData.notes}</Label>
        </StackLayout>

        <Button className="btn-primary mt-4" text={orderId ? "Update Order" : "Create Order"} onTap={handleSubmit} />
      </StackLayout>

      <SwipeUpPanel visible={supplierSelectorOpen} onClose={() => setSupplierSelectorOpen(false)} title="Select Supplier">
        <StackLayout className="p-4">
          {suppliers.map((supplier) => (
            <StackLayout key={supplier.id} className="card" onTap={() => {
              setFormData({ ...formData, supplier: supplier.name });
              setSupplierSelectorOpen(false);
            }}>
              <Label className="text-subtitle">{supplier.name}</Label>
              <Label className="text-body">Contact: {supplier.contact}</Label>
            </StackLayout>
          ))}
        </StackLayout>
      </SwipeUpPanel>

      <SwipeUpPanel visible={productSelectorOpen} onClose={() => setProductSelectorOpen(false)} title="Add Product">
        <StackLayout className="p-4">
          {products.map((product) => (
            <StackLayout key={product.id} className="card" onTap={() => {
              setFormData({
                ...formData,
                items: [...formData.items, { id: product.id, name: product.name, quantity: 1, price: product.price }]
              });
              setProductSelectorOpen(false);
            }}>
              <Label className="text-subtitle">{product.name}</Label>
              <Label className="text-body">${product.price}</Label>
            </StackLayout>
          ))}
        </StackLayout>
      </SwipeUpPanel>
    </ScrollView>
  );
};

export default PurchaseOrderFormScreen;
