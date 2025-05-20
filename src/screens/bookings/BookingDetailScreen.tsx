import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { BookingsStackParamList } from "../../components/navigation/BookingsTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { Dialogs } from "@nativescript/core";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState } from "../../store/store";
import { fetchBookingById, cancelBooking } from "../../store/slices/bookingSlice";

export const BookingDetailScreen = ({ route, navigation }: {
  route: RouteProp<BookingsStackParamList, "BookingDetail">,
  navigation: FrameNavigationProp<BookingsStackParamList, "BookingDetail">
}) => {
  const { bookingId } = route.params;
  const dispatch = useDispatch();
  const { currentBooking: booking, isLoading, error } = useSelector((state: RootState) => state.bookings);
  const [actionsOpen, setActionsOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchBookingById(bookingId) as any);
  }, [bookingId, dispatch]);

  const handleStatusChange = () => {
    Dialogs.action({
      title: "Change Status",
      message: "Select new status",
      cancelButtonText: "Cancel",
      actions: ["Pending", "Confirmed", "Completed", "Cancelled"]
    }).then(result => {
      if (result !== "Cancel") {
        // Update status
      }
    });
  };

  const handleCancelBooking = async () => {
    const confirmed = await Dialogs.confirm({
      title: "Cancel Booking",
      message: "Are you sure you want to cancel this booking?",
      okButtonText: "Yes",
      cancelButtonText: "No"
    });
    if (!confirmed) return;
    try {
      await dispatch(cancelBooking(bookingId) as any).unwrap();
      Dialogs.alert({ title: "Success", message: "Booking cancelled successfully.", okButtonText: "OK" });
      navigation.goBack();
    } catch (error) {
      Dialogs.alert({ title: "Error", message: "Failed to cancel booking.", okButtonText: "OK" });
    }
  };

  if (isLoading || !booking) {
    return <LoadingIndicator text="Loading booking details..." />;
  }

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <GridLayout columns="*, auto" rows="auto, auto">
            <Label col={0} row={0} className="text-title">#{booking.id}</Label>
            <Label col={1} row={0} className="text-success">{booking.status}</Label>
            <Label col={0} row={1} className="text-body text-secondary">Created on {booking.createdAt}</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Customer Details</Label>
          <StackLayout className="mb-4">
            <Label className="text-body font-bold">Name: {booking.customerName}</Label>
            <Label className="text-body">Phone: {booking.customerPhone}</Label>
            <Label className="text-body">Email: {booking.customerEmail}</Label>
          </StackLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Booking Items</Label>
          {booking.services.map((service, index) => (
            <StackLayout key={index} className="border-b border-divider p-2">
              <Label className="text-body font-bold">{service.name}</Label>
              <GridLayout columns="*, auto">
                <Label col={0} className="text-body">{service.duration} min</Label>
                <Label col={1} className="text-body">${service.price.toFixed(2)}</Label>
              </GridLayout>
            </StackLayout>
          ))}
          <GridLayout columns="*, auto" className="p-2">
            <Label col={0} className="text-subtitle">Total</Label>
            <Label col={1} className="text-subtitle">${booking.totalAmount.toFixed(2)}</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Booking Details</Label>
          <Label className="text-body">Date: {booking.date}</Label>
          <Label className="text-body">Time: {booking.time}</Label>
          <Label className="text-body">Duration: {booking.totalDuration} min</Label>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Notes</Label>
          <Label className="text-body">{booking.notes || "No notes"}</Label>
        </StackLayout>

        <GridLayout columns="*, *" className="mt-4">
          <Button
            col={0}
            className="btn-primary m-1"
            text="Edit Booking"
            onTap={() => navigation.navigate("BookingForm", { bookingId })}
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
        title="Booking Actions"
      >
        <StackLayout className="p-4">
          <Button className="btn-outline mb-2" text="Change Status" onTap={handleStatusChange} />
          <Button className="btn-outline mb-2" text="Send Reminder" />
          <Button className="btn-outline mb-2" text="Reschedule" />
          <Button className="btn-error" text="Cancel Booking" onTap={handleCancelBooking} />
        </StackLayout>
      </SwipeUpPanel>
    </ScrollView>
  );
}; 