import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { PurchaseStackParamList } from "../../components/navigation/PurchaseTabNavigator";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import { ScrollView, StackLayout, GridLayout, Label, Button } from "../../components/native/nativeElements";
import { RootState } from "../../store/store";
import { colors } from "../../theme/colors";
import { fetchOrders, deleteOrder } from "../../store/slices/purchaseSlice";
import { Dialogs } from "@nativescript/core";

const PurchaseOrderListScreen = ({ navigation }: {
  route: RouteProp<PurchaseStackParamList, "PurchaseOrderList">,
  navigation: FrameNavigationProp<PurchaseStackParamList, "PurchaseOrderList">
}) => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state: RootState) => state.purchase);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchOrders(currentPage) as any);
  }, [dispatch, currentPage]);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchText.toLowerCase()) ||
    order.supplierId.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteOrder = async (orderId: string) => {
    const confirmed = await Dialogs.confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this order?",
      okButtonText: "Delete",
      cancelButtonText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await dispatch(deleteOrder(orderId) as any).unwrap();
    } catch (error) {
      Dialogs.alert({ title: "Error", message: "Failed to delete order.", okButtonText: "OK" });
    }
  };

  if (isLoading) {
    return <Label className="text-center mt-4">Loading purchase orders...</Label>;
  }

  return (
    <GridLayout columns="*" rows="auto, auto, *, auto" className="bg-background">
      <StackLayout row={0} className="p-4">
        <searchBar 
          hint="Search orders..." 
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
          {filteredOrders.length} Orders
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
          {filteredOrders.map(order => (
            <StackLayout key={order.id} className="card swipe-item" onTap={() => navigation.navigate("PurchaseOrderDetail", { orderId: order.id })}>
              <GridLayout columns="*, auto" rows="auto, auto, auto">
                <Label col={0} row={0} className="text-subtitle">#{order.id}</Label>
                <Label col={1} row={0} className={`text-${order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : 'primary'}`}>{order.status}</Label>
                <Label col={0} row={1} className="text-body">Supplier: {order.supplierId}</Label>
                <Label col={1} row={1} className="text-body">${order.totalAmount.toFixed(2)}</Label>
                <Label col={0} row={2} className="text-body text-secondary">Due: {order.deliveryDate}</Label>
              </GridLayout>
              <Button text="Delete" className="text-error text-sm mt-1" onTap={() => handleDeleteOrder(order.id)} />
            </StackLayout>
          ))}
        </StackLayout>
      </ScrollView>

      <GridLayout row={3} columns="*, auto, *" className="p-2">
        <Button col={0} text="Prev" className="btn-outline" onTap={() => setCurrentPage(p => Math.max(1, p - 1))} />
        <Label col={1} className="text-center text-sm">Page {currentPage}</Label>
        <Button col={2} text="Next" className="btn-outline" onTap={() => setCurrentPage(p => p + 1)} />
      </GridLayout>

      <Button text="+" className="fab" onTap={() => navigation.navigate({ name: "PurchaseOrderForm", params: {} })} />

      <SwipeUpPanel
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter Orders"
      >
        <StackLayout className="p-4">
          <StackLayout className="mb-4">
            <Label className="form-label">Status</Label>
            <segmentedBar selectedIndex={0} className="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="Pending" />
              <segmentedBarItem title="Delivered" />
            </segmentedBar>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="form-label">Date Range</Label>
            <segmentedBar selectedIndex={0} className="mb-2">
              <segmentedBarItem title="All" />
              <segmentedBarItem title="This Month" />
              <segmentedBarItem title="Last Month" />
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

export default PurchaseOrderListScreen;
