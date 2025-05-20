import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useDispatch, useSelector } from "react-redux";
import { BookingsStackParamList } from "../../components/navigation/BookingsTabNavigator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { Dialogs } from "@nativescript/core";
import { ScrollView, StackLayout, GridLayout, Label, Button, TextField } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchCustomers, fetchServices } from "../../store/slices/metaSlice";
import { saveBooking } from "../../store/slices/bookingSlice";

export const BookingFormScreen = ({ route, navigation }: {
  route: RouteProp<BookingsStackParamList, "BookingForm">,
  navigation: FrameNavigationProp<BookingsStackParamList, "BookingForm">
}) => {
  const { bookingId } = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const { customers, services } = useSelector((state: RootState) => state.meta);

  const [isLoading, setIsLoading] = React.useState(!!bookingId);
  const [customerSelectorOpen, setCustomerSelectorOpen] = React.useState(false);
  const [serviceSelectorOpen, setServiceSelectorOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    customer: '',
    services: [] as Array<{ id: string; name: string; duration: number; price: number }>,
    date: new Date(),
    time: '09:00',
    notes: ''
  });

  React.useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchServices());

    if (bookingId) {
      setTimeout(() => {
        setFormData({
          customer: 'John Doe',
          services: [
            { id: '1', name: 'Haircut', duration: 30, price: 30 },
            { id: '2', name: 'Hair Coloring', duration: 120, price: 80 }
          ],
          date: new Date('2024-03-15'),
          time: '14:30',
          notes: ''
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [dispatch, bookingId]);

  const handleSubmit = async () => {
    if (!formData.customer || formData.services.length === 0) {
      Dialogs.alert({ title: "Validation Error", message: "Please complete all required fields.", okButtonText: "OK" });
      return;
    }

    try {
      await dispatch(saveBooking({
        ...formData,
        date: formData.date.toISOString()
      }));
      Dialogs.alert({ title: "Success", message: "Booking saved successfully.", okButtonText: "OK" });
      navigation.goBack();
    } catch (err) {
      Dialogs.alert({ title: "Error", message: "Failed to save booking.", okButtonText: "OK" });
    }
  };

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Customer</Label>
          <Button 
            className={`form-input text-left ${!formData.customer ? 'text-secondary' : ''}`} 
            text={formData.customer || "Select Customer"} 
            onTap={() => setCustomerSelectorOpen(true)} 
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <GridLayout columns="*, auto" className="mb-2">
            <Label col={0} className="text-subtitle">Services</Label>
            <Button col={1} className="text-primary p-0" text="+ Add Service" onTap={() => setServiceSelectorOpen(true)} />
          </GridLayout>
          {formData.services.map((service, index) => (
            <StackLayout key={service.id} className="border-b border-divider p-2">
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col={0} row={0} className="text-body font-bold">{service.name}</Label>
                <Button col={1} row={0} className="text-error text-sm p-0" text="Remove" onTap={() => {
                  const newServices = formData.services.filter((_, i) => i !== index);
                  setFormData({ ...formData, services: newServices });
                }} />
                <Label col={0} row={1} className="text-body">Duration: {service.duration} min</Label>
                <Label col={1} row={1} className="text-body">${service.price.toFixed(2)}</Label>
              </GridLayout>
            </StackLayout>
          ))}
          <GridLayout columns="*, auto" className="p-2">
            <Label col={0} className="text-subtitle">Total</Label>
            <Label col={1} className="text-subtitle">${formData.services.reduce((sum, service) => sum + service.price, 0).toFixed(2)}</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Booking Details</Label>
          <Label className="form-label">Date</Label>
          <Label className="form-input mb-2">{formData.date.toDateString()}</Label>
          <Label className="form-label">Time</Label>
          <Label className="form-input mb-2">{formData.time}</Label>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Notes</Label>
          <Label className="form-input h-32">{formData.notes}</Label>
        </StackLayout>

        <Button className="btn-primary mt-4" text={bookingId ? "Update Booking" : "Create Booking"} onTap={handleSubmit} />
      </StackLayout>

      <SwipeUpPanel visible={customerSelectorOpen} onClose={() => setCustomerSelectorOpen(false)} title="Select Customer">
        <StackLayout className="p-4">
          {customers.map((customer) => (
            <StackLayout key={customer.id} className="card" onTap={() => {
              setFormData({ ...formData, customer: customer.name });
              setCustomerSelectorOpen(false);
            }}>
              <Label className="text-subtitle">{customer.name}</Label>
              <Label className="text-body">Phone: {customer.phone}</Label>
            </StackLayout>
          ))}
        </StackLayout>
      </SwipeUpPanel>

      <SwipeUpPanel visible={serviceSelectorOpen} onClose={() => setServiceSelectorOpen(false)} title="Add Service">
        <StackLayout className="p-4">
          {services.map((service) => (
            <StackLayout key={service.id} className="card" onTap={() => {
              setFormData({
                ...formData,
                services: [...formData.services, { 
                  id: service.id, 
                  name: service.name, 
                  duration: service.duration, 
                  price: service.price 
                }]
              });
              setServiceSelectorOpen(false);
            }}>
              <Label className="text-subtitle">{service.name}</Label>
              <Label className="text-body">${service.price} - {service.duration} min</Label>
            </StackLayout>
          ))}
        </StackLayout>
      </SwipeUpPanel>
    </ScrollView>
  );
}; 