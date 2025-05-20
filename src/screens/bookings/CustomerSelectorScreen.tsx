import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { BookingsStackParamList } from "../../components/navigation/BookingsTabNavigator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { ScrollView, StackLayout, GridLayout, Label, Button, TextField } from "../../components/native/nativeElements";
import { RootState, AppDispatch } from "../../store/store";
import { fetchCustomers } from "../../store/slices/metaSlice";
import { Dialogs } from "@nativescript/core";

export const CustomerSelectorScreen = ({ navigation }: {
  route: RouteProp<BookingsStackParamList, "CustomerSelector">,
  navigation: FrameNavigationProp<BookingsStackParamList, "CustomerSelector">
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, isLoading } = useSelector((state: RootState) => state.meta);
  const [searchText, setSearchText] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  React.useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
    customer.phone.includes(searchText) ||
    customer.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCustomerSelect = (customerId: string) => {
    navigation.navigate("BookingForm", { customerId });
  };

  const handleAddNewCustomer = () => {
    Dialogs.prompt({
      title: "New Customer",
      message: "Enter customer details",
      okButtonText: "Add",
      cancelButtonText: "Cancel",
      inputType: "text",
      defaultText: ""
    }).then(result => {
      if (result.result) {
        // Add new customer logic here
        // Then navigate to booking form
        navigation.navigate("BookingForm", { customerId: "new" });
      }
    });
  };

  return (
    <GridLayout columns="*" rows="auto, auto, *" className="bg-background">
      <StackLayout row={0} className="p-4">
        <searchBar 
          hint="Search customers..." 
          text={searchText} 
          onTextChange={(e) => setSearchText(e.value)}
          className="form-input"
        />
      </StackLayout>

      <GridLayout row={1} columns="auto, *" className="p-2">
        <Button 
          col={0} 
          text="Filter" 
          className="btn-outline text-sm p-2" 
          onTap={() => setFilterOpen(true)}
        />
        <Label col={1} className="text-subtitle ml-2">
          {filteredCustomers.length} Customers
        </Label>
      </GridLayout>

      <ScrollView row={2} className="p-2">
        <StackLayout>
          {filteredCustomers.map(customer => (
            <StackLayout 
              key={customer.id} 
              className="card" 
              onTap={() => handleCustomerSelect(customer.id)}
            >
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col={0} row={0} className="text-subtitle">{customer.name}</Label>
                <Label col={1} row={0} className="text-success">{customer.status}</Label>
                <Label col={0} row={1} className="text-body">Phone: {customer.phone}</Label>
                <Label col={1} row={1} className="text-body">Email: {customer.email}</Label>
              </GridLayout>
            </StackLayout>
          ))}
        </StackLayout>
      </ScrollView>

      <Button 
        text="+" 
        className="fab" 
        onTap={handleAddNewCustomer}
      />

      <SwipeUpPanel
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter Customers"
      >
        <StackLayout className="p-4">
          <StackLayout className="mb-4">
            <Label className="form-label">Status</Label>
            <segmentedBar 
              selectedIndex={selectedFilter === 'all' ? 0 : selectedFilter === 'active' ? 1 : 2}
              className="mb-2"
              onSelectedIndexChange={(e) => {
                const index = (e.object as any).selectedIndex;
                setSelectedFilter(index === 0 ? 'all' : index === 1 ? 'active' : 'inactive');
              }}
            >
              <segmentedBarItem title="All" />
              <segmentedBarItem title="Active" />
              <segmentedBarItem title="Inactive" />
            </segmentedBar>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="form-label">Sort By</Label>
            <segmentedBar selectedIndex={0}>
              <segmentedBarItem title="Name" />
              <segmentedBarItem title="Recent" />
              <segmentedBarItem title="Bookings" />
            </segmentedBar>
          </StackLayout>

          <Button 
            className="btn-primary mt-4" 
            text="Apply Filters" 
            onTap={() => setFilterOpen(false)} 
          />
        </StackLayout>
      </SwipeUpPanel>
    </GridLayout>
  );
}; 