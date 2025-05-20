import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { Dialogs } from "@nativescript/core";

type PurchaseOrderFormScreenProps = {
  route: RouteProp<PurchaseStackParamList, "PurchaseOrderForm">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "PurchaseOrderForm">,
};

export function PurchaseOrderFormScreen({ route, navigation }: PurchaseOrderFormScreenProps) {
  const { orderId } = route.params || {};
  const [isLoading, setIsLoading] = React.useState(!!orderId);
  const [supplierSelectorOpen, setSupplierSelectorOpen] = React.useState(false);
  const [productSelectorOpen, setProductSelectorOpen] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    supplier: '',
    items: [] as Array<{ id: string; name: string; quantity: number; price: number }>,
    deliveryDate: new Date(),
    shippingMethod: '',
    paymentMethod: '',
    notes: ''
  });

  React.useEffect(() => {
    if (orderId) {
      // Load existing order data
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
  }, [orderId]);

  const handleAddItem = () => {
    setProductSelectorOpen(true);
  };

  const handleRemoveItem = (index: number) => {
    Dialogs.confirm({
      title: "Remove Item",
      message: "Are you sure you want to remove this item?",
      okButtonText: "Remove",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result) {
        const newItems = [...formData.items];
        newItems.splice(index, 1);
        setFormData({ ...formData, items: newItems });
      }
    });
  };

  const handleSubmit = () => {
    if (!formData.supplier) {
      Dialogs.alert({
        title: "Validation Error",
        message: "Please select a supplier",
        okButtonText: "OK"
      });
      return;
    }

    if (formData.items.length === 0) {
      Dialogs.alert({
        title: "Validation Error",
        message: "Please add at least one item",
        okButtonText: "OK"
      });
      return;
    }

    // Save order
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingIndicator text="Loading order details..." />;
  }

  return (
    <scrollView class="bg-background">
      <stackLayout class="p-4">
        {/* Supplier Selection */}
        <stackLayout class="card">
          <label class="text-subtitle mb-2">Supplier</label>
          <button 
            class={`form-input text-left ${!formData.supplier ? 'text-secondary' : ''}`}
            text={formData.supplier || "Select Supplier"}
            onTap={() => setSupplierSelectorOpen(true)}
          />
        </stackLayout>

        {/* Order Items */}
        <stackLayout class="card mt-4">
          <gridLayout columns="*, auto" class="mb-2">
            <label col="0" class="text-subtitle">Items</label>
            <button 
              col="1" 
              class="text-primary p-0" 
              text="+ Add Item"
              onTap={handleAddItem}
            />
          </gridLayout>

          {formData.items.map((item, index) => (
            <stackLayout key={item.id} class="border-b border-divider p-2">
              <gridLayout columns="*, auto" rows="auto, auto">
                <label col="0" row="0" class="text-body font-bold">{item.name}</label>
                <button 
                  col="1" 
                  row="0" 
                  class="text-error text-sm p-0" 
                  text="Remove"
                  onTap={() => handleRemoveItem(index)}
                />
                <gridLayout col="0" row="1" columns="auto, *">
                  <textField 
                    col="0"
                    text={item.quantity.toString()} 
                    keyboardType="number"
                    class="w-16 text-right"
                    onTextChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].quantity = parseInt(e.value) || 0;
                      setFormData({ ...formData, items: newItems });
                    }}
                  />
                  <label col="1" class="text-body ml-2">x ${item.price.toFixed(2)}</label>
                </gridLayout>
                <label col="1" row="1" class="text-body">${(item.quantity * item.price).toFixed(2)}</label>
              </gridLayout>
            </stackLayout>
          ))}

          <gridLayout columns="*, auto" class="p-2">
            <label col="0" class="text-subtitle">Total</label>
            <label col="1" class="text-subtitle">
              ${formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
            </label>
          </gridLayout>
        </stackLayout>

        {/* Delivery Details */}
        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Delivery Details</label>
          
          <label class="form-label">Expected Delivery Date</label>
          <datePicker 
            date={formData.deliveryDate}
            class="form-input mb-2"
            onDateChange={(e) => setFormData({ ...formData, deliveryDate: new Date(e.value) })}
          />
          
          <label class="form-label">Shipping Method</label>
          <textField 
            text={formData.shippingMethod}
            hint="Enter shipping method"
            class="form-input mb-2"
            onTextChange={(e) => setFormData({ ...formData, shippingMethod: e.value })}
          />
        </stackLayout>

        {/* Payment Details */}
        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Payment Details</label>
          
          <label class="form-label">Payment Method</label>
          <dropDown
            items={["Bank Transfer", "Credit Card", "Cash", "Check"]}
            selectedIndex={0}
            class="form-input mb-2"
            onSelectedIndexChanged={(e) => {
              const methods = ["Bank Transfer", "Credit Card", "Cash", "Check"];
              setFormData({ ...formData, paymentMethod: methods[e.object.selectedIndex] });
            }}
          />
        </stackLayout>

        {/* Notes */}
        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Notes</label>
          <textView 
            text={formData.notes}
            hint="Enter any additional notes"
            class="form-input h-32"
            onTextChange={(e) => setFormData({ ...formData, notes: e.value })}
          />
        </stackLayout>

        {/* Submit Button */}
        <button 
          class="btn-primary mt-4" 
          text={orderId ? "Update Order" : "Create Order"}
          onTap={handleSubmit}
        />
      </stackLayout>

      {/* Supplier Selector Panel */}
      <SwipeUpPanel
        visible={supplierSelectorOpen}
        onClose={() => setSupplierSelectorOpen(false)}
        title="Select Supplier"
      >
        <stackLayout class="p-4">
          <searchBar hint="Search suppliers..." class="form-input mb-2" />
          
          <stackLayout class="card" onTap={() => {
            setFormData({ ...formData, supplier: 'Tech Supplies Inc.' });
            setSupplierSelectorOpen(false);
          }}>
            <label class="text-subtitle">Tech Supplies Inc.</label>
            <label class="text-body">Contact: John Smith</label>
          </stackLayout>
          
          <stackLayout class="card" onTap={() => {
            setFormData({ ...formData, supplier: 'Global Electronics' });
            setSupplierSelectorOpen(false);
          }}>
            <label class="text-subtitle">Global Electronics</label>
            <label class="text-body">Contact: Jane Doe</label>
          </stackLayout>
        </stackLayout>
      </SwipeUpPanel>

      {/* Product Selector Panel */}
      <SwipeUpPanel
        visible={productSelectorOpen}
        onClose={() => setProductSelectorOpen(false)}
        title="Add Product"
      >
        <stackLayout class="p-4">
          <searchBar hint="Search products..." class="form-input mb-2" />
          
          <stackLayout class="card" onTap={() => {
            const newItems = [...formData.items];
            newItems.push({ id: '3', name: 'Bluetooth Speaker', quantity: 1, price: 80 });
            setFormData({ ...formData, items: newItems });
            setProductSelectorOpen(false);
          }}>
            <label class="text-subtitle">Bluetooth Speaker</label>
            <label class="text-body">$80.00</label>
          </stackLayout>
          
          <stackLayout class="card" onTap={() => {
            const newItems = [...formData.items];
            newItems.push({ id: '4', name: 'Power Bank', quantity: 1, price: 45 });
            setFormData({ ...formData, items: newItems });
            setProductSelectorOpen(false);
          }}>
            <label class="text-subtitle">Power Bank</label>
            <label class="text-body">$45.00</label>
          </stackLayout>
        </stackLayout>
      </SwipeUpPanel>
    </scrollView>
  );
}