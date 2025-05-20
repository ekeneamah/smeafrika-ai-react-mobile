import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { BookingsStackParamList } from "../../components/navigation/BookingsTabNavigator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState } from "../../store/store";
import { colors } from "../../theme/colors";
import { fetchBookings, deleteBooking } from "../../store/slices/bookingSlice";
import { Dialogs } from "@nativescript/core";

export const BookingListScreen = ({ navigation }: {
  route: RouteProp<BookingsStackParamList, "BookingList">,
  navigation: FrameNavigationProp<BookingsStackParamList, "BookingList">
}) => {
  const dispatch = useDispatch();
  const { bookings, isLoading, error } = useSelector((state: RootState) => state.bookings);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchBookings(currentPage) as any);
  }, [dispatch, currentPage]);

  const filteredBookings = bookings.filter(booking =>
    booking.id.toLowerCase().includes(searchText.toLowerCase()) ||
    booking.customerName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteBooking = async (bookingId: string) => {
    const confirmed = await Dialogs.confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this booking?",
      okButtonText: "Delete",
      cancelButtonText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await dispatch(deleteBooking(bookingId) as any).unwrap();
    } catch (error) {
      Dialogs.alert({ title: "Error", message: "Failed to delete booking.", okButtonText: "OK" });
    }
  };

  if (isLoading) {
    return <Label className="text-center mt-4">Loading bookings...</Label>;
  }

  return (
    <GridLayout columns="*" rows="auto, auto, *, auto" className="bg-background">
      <StackLayout row={0} className="p-4">
        <searchBar 
          hint="Search bookings..." 
          text={searchText} 
          onTextChange={(e) => setSearchText(e.value)}
          className="form-input"
        />
      </StackLayout>

      <GridLayout row={1} columns="auto, *, auto" className="p-2">
        <Button 
          col={0} 
          text="Filter" 
          className="btn-outline text-sm p-2" 
          onTap={() => setFilterOpen(true)}
        />

        <Label col={1} className="text-subtitle ml-2 text-center">
          {filteredBookings.length} Bookings
        </Label>

        <segmentedBar 
          col={2}
          selectedIndex={viewMode === 'list' ? 0 : 1}
          className="w-24"
          selectedBackgroundColor={colors.primary}
          onSelectedIndexChange={(e) => {
            const index = (e.object as any).selectedIndex;
            setViewMode(index === 0 ? 'list' : 'grid');
          }}
        >
          <segmentedBarItem title="List" />
          <segmentedBarItem title="Grid" />
        </segmentedBar>
      </GridLayout>

      <ScrollView row={2} className="p-2">
        <StackLayout>
          {filteredBookings.map(booking => (
            <StackLayout key={booking.id} className="card swipe-item" onTap={() => navigation.navigate("BookingDetail", { bookingId: booking.id })}>
              <GridLayout columns="*, auto" rows="auto, auto, auto">
                <Label col={0} row={0} className="text-subtitle">#{booking.id}</Label>
                <Label col={1} row={0} className={`text-${booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'primary'}`}>
                  {booking.status}
                </Label>
                <Label col={0} row={1} className="text-body">Customer: {booking.customerName}</Label>
                <Label col={1} row={1} className="text-body">${booking.totalAmount.toFixed(2)}</Label>
                <Label col={0} row={2} className="text-body text-secondary">Date: {booking.date}</Label>
              </GridLayout>
              <Button text="Delete" className="text-error text-sm mt-1" onTap={() => handleDeleteBooking(booking.id)} />
            </StackLayout>
          ))}
        </StackLayout>
      </ScrollView>

      <GridLayout row={3} columns="*, auto, *" className="p-2">
        <Button col={0} text="Prev" className="btn-outline" onTap={() => setCurrentPage(p => Math.max(1, p - 1))} />
        <Label col={1} className="text-center text-sm">Page {currentPage}</Label>
        <Button col={2} text="Next" className="btn-outline" onTap={() => setCurrentPage(p => p + 1)} />
      </GridLayout>

      <Button text="+" className="fab" onTap={() => navigation.navigate("BookingForm", { customerId: undefined })} />

      <SwipeUpPanel
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter Bookings"
      >
        <StackLayout className="p-4">
          <StackLayout className="mb-4">
            <Label className="form-label">Status</Label>
            <segmentedBar selectedIndex={0} className="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="Pending" />
              <segmentedBarItem title="Confirmed" />
            </segmentedBar>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="form-label">Date Range</Label>
            <segmentedBar selectedIndex={0} className="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="This Week" />
              <segmentedBarItem title="This Month" />
            </segmentedBar>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="form-label">Sort By</Label>
            <segmentedBar selectedIndex={0}>
              <segmentedBarItem title="Date" />
              <segmentedBarItem title="Amount" />
              <segmentedBarItem title="Status" />
            </segmentedBar>
          </StackLayout>

          <Button className="btn-primary mt-4" text="Apply Filters" onTap={() => setFilterOpen(false)} />
        </StackLayout>
      </SwipeUpPanel>
    </GridLayout>
  );
};