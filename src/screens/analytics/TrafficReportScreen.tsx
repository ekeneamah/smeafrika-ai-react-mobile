import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AnalyticsStackParamList } from "../../components/navigation/AnalyticsTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { colors } from "../../theme/colors";
import { Dropdown } from "../../components/common/Dropdown";
import { Label, ProgressBar, GridLayout, StackLayout, ScrollView } from "../../components/native/nativeElements";
import { registerElement } from "react-nativescript";


type TrafficReportScreenProps = {
  route: RouteProp<AnalyticsStackParamList, "TrafficReport">,
  navigation: FrameNavigationProp<AnalyticsStackParamList, "TrafficReport">,
};

export function TrafficReportScreen({ route }: TrafficReportScreenProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState(route.params?.filter || 'week');

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingIndicator text="Loading traffic report..." />;
  }

  const ranges = ["week", "month", "quarter", "year"];
  const labels = ["This Week", "This Month", "This Quarter", "This Year"];

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <GridLayout columns="*, auto" className="mb-4">
          <Label col="0" className="text-title">Traffic Report</Label>
          <Dropdown
            col="1"
            items={labels}
            selectedIndex={ranges.indexOf(timeRange)}
            className="w-32"
            onChange={(selectedIndex) => setTimeRange(ranges[selectedIndex])}
          />
        </GridLayout>

        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Traffic Overview</Label>
          <GridLayout columns="*, *" rows="auto, auto" className="text-center">
            <StackLayout col="0" row="0" className="p-2">
              <Label className="text-title">12,450</Label>
              <Label className="text-body">Total Visits</Label>
            </StackLayout>
            <StackLayout col="1" row="0" className="p-2">
              <Label className="text-title">8,320</Label>
              <Label className="text-body">Unique Visitors</Label>
            </StackLayout>
            <StackLayout col="0" row="1" className="p-2">
              <Label className="text-title">2:45</Label>
              <Label className="text-body">Avg. Time</Label>
            </StackLayout>
            <StackLayout col="1" row="1" className="p-2">
              <Label className="text-title">3.8</Label>
              <Label className="text-body">Pages/Visit</Label>
            </StackLayout>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Traffic Trend</Label>
          <GridLayout columns="*, auto" className="h-48 bg-primary100 rounded-md">
            <Label className="text-center">Traffic Trend Chart</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Traffic Sources</Label>
          {[
            { label: 'Direct', value: 40 },
            { label: 'Social Media', value: 30 },
            { label: 'Search', value: 20 },
            { label: 'Referral', value: 10 },
          ].map((source, index) => (
            <GridLayout key={index} columns="*, auto" rows="auto, auto, auto" className="mb-2">
              <Label col="0" row="0" className="text-body">{source.label}</Label>
              <Label col="1" row="0" className="text-body">{source.value}%</Label>
              <ProgressBar row="1" colSpan="2" value={source.value} maxValue={100} className="bg-primary100" color={colors.primary} />
            </GridLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Most Visited Pages</Label>
          {[{
            title: 'Product Catalog', visits: '3,240 visits', avgTime: '3:20'
          }, {
            title: 'About Us', visits: '1,850 visits', avgTime: '2:15'
          }, {
            title: 'Contact Page', visits: '980 visits', avgTime: '1:45'
          }].map((page, idx) => (
            <StackLayout key={idx} className="border-b border-divider p-2">
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col="0" row="0" className="text-body font-bold">{page.title}</Label>
                <Label col="1" row="0" className="text-body">{page.visits}</Label>
                <Label col="0" row="1" className="text-body text-secondary">Avg. time: {page.avgTime}</Label>
              </GridLayout>
            </StackLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Device Distribution</Label>
          {[
            { label: 'Mobile', value: 60 },
            { label: 'Desktop', value: 35 },
            { label: 'Tablet', value: 5 }
          ].map((device, i) => (
            <GridLayout key={i} columns="*, auto" rows="auto, auto, auto" className="mb-2">
              <Label col="0" row="0" className="text-body">{device.label}</Label>
              <Label col="1" row="0" className="text-body">{device.value}%</Label>
              <ProgressBar row="1" colSpan="2" value={device.value} maxValue={100} className="bg-primary100" color={colors.primary} />
            </GridLayout>
          ))}
        </StackLayout>
      </StackLayout>
    </ScrollView>
  );
}
