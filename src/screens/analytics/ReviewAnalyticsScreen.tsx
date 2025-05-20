import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AnalyticsStackParamList } from "../../components/navigation/AnalyticsTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { colors } from "../../theme/colors";

type ReviewAnalyticsScreenProps = {
  route: RouteProp<AnalyticsStackParamList, "ReviewAnalytics">,
  navigation: FrameNavigationProp<AnalyticsStackParamList, "ReviewAnalytics">,
};

export function ReviewAnalyticsScreen({ navigation }: ReviewAnalyticsScreenProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState('month');

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingIndicator text="Loading review analytics..." />;
  }

  return (
    <scrollView class="bg-background">
      <stackLayout class="p-4">
        <gridLayout columns="*, auto" class="mb-4">
          <label col="0" class="text-title">Review Analytics</label>
          <dropDown
            col="1"
            items={["This Month", "Last 3 Months", "Last 6 Months", "This Year"]}
            selectedIndex={0}
            class="w-32"
            onSelectedIndexChange={(e) => {
              const ranges = ["month", "quarter", "half", "year"];
              setTimeRange(ranges[e.object.selectedIndex]);
            }}
          />
        </gridLayout>

        <stackLayout class="card">
          <label class="text-subtitle mb-2">Review Summary</label>
          <gridLayout columns="*, *" rows="auto, auto" class="text-center">
            <stackLayout col="0" row="0" class="p-2">
              <label class="text-title">4.8</label>
              <label class="text-body">Average Rating</label>
            </stackLayout>
            <stackLayout col="1" row="0" class="p-2">
              <label class="text-title">245</label>
              <label class="text-body">Total Reviews</label>
            </stackLayout>
            <stackLayout col="0" row="1" class="p-2">
              <label class="text-title">92%</label>
              <label class="text-body">Response Rate</label>
            </stackLayout>
            <stackLayout col="1" row="1" class="p-2">
              <label class="text-title">6h</label>
              <label class="text-body">Avg. Response Time</label>
            </stackLayout>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Rating Distribution</label>
          
          <gridLayout columns="auto, *, auto" rows="auto, auto, auto, auto, auto" class="mb-2">
            <label col="0" row="0" class="text-body">5 ★</label>
            <progressBar col="1" row="0" value={75} maxValue={100} class="bg-primary100 mx-2" color={colors.primary} />
            <label col="2" row="0" class="text-body">75%</label>

            <label col="0" row="1" class="text-body">4 ★</label>
            <progressBar col="1" row="1" value={15} maxValue={100} class="bg-primary100 mx-2" color={colors.primary} />
            <label col="2" row="1" class="text-body">15%</label>

            <label col="0" row="2" class="text-body">3 ★</label>
            <progressBar col="1" row="2" value={5} maxValue={100} class="bg-primary100 mx-2" color={colors.warning} />
            <label col="2" row="2" class="text-body">5%</label>

            <label col="0" row="3" class="text-body">2 ★</label>
            <progressBar col="1" row="3" value={3} maxValue={100} class="bg-primary100 mx-2" color={colors.error} />
            <label col="2" row="3" class="text-body">3%</label>

            <label col="0" row="4" class="text-body">1 ★</label>
            <progressBar col="1" row="4" value={2} maxValue={100} class="bg-primary100 mx-2" color={colors.error} />
            <label col="2" row="4" class="text-body">2%</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Review Trend</label>
          <gridLayout class="h-48 bg-primary100 rounded-md">
            <label class="text-center">Review Trend Chart</label>
          </gridLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Top Rated Products</label>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Wireless Earbuds</label>
              <label col="1" row="0" class="text-body">4.9 ★</label>
              <label col="0" row="1" class="text-body text-secondary">85 reviews</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Smart Watch</label>
              <label col="1" row="0" class="text-body">4.8 ★</label>
              <label col="0" row="1" class="text-body text-secondary">62 reviews</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="p-2">
            <gridLayout columns="*, auto" rows="auto, auto">
              <label col="0" row="0" class="text-body font-bold">Bluetooth Speaker</label>
              <label col="1" row="0" class="text-body">4.7 ★</label>
              <label col="0" row="1" class="text-body text-secondary">48 reviews</label>
            </gridLayout>
          </stackLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Common Keywords</label>
          <wrapLayout>
            <stackLayout class="bg-primary100 rounded-full px-3 py-1 m-1">
              <label class="text-primary">Great quality (45)</label>
            </stackLayout>
            <stackLayout class="bg-primary100 rounded-full px-3 py-1 m-1">
              <label class="text-primary">Fast shipping (32)</label>
            </stackLayout>
            <stackLayout class="bg-primary100 rounded-full px-3 py-1 m-1">
              <label class="text-primary">Good value (28)</label>
            </stackLayout>
            <stackLayout class="bg-primary100 rounded-full px-3 py-1 m-1">
              <label class="text-primary">Excellent service (25)</label>
            </stackLayout>
            <stackLayout class="bg-primary100 rounded-full px-3 py-1 m-1">
              <label class="text-primary">Recommended (20)</label>
            </stackLayout>
          </wrapLayout>
        </stackLayout>

        <stackLayout class="card mt-4">
          <label class="text-subtitle mb-2">Recent Reviews</label>
          
          <stackLayout class="border-b border-divider p-2">
            <gridLayout columns="*, auto" rows="auto, auto, auto">
              <label col="0" row="0" class="text-body font-bold">Wireless Earbuds</label>
              <label col="1" row="0" class="text-body">5.0 ★</label>
              <label col="0" row="1" class="text-body">"Great sound quality and battery life!"</label>
              <label col="0" row="2" class="text-body text-secondary">2 hours ago</label>
            </gridLayout>
          </stackLayout>
          
          <stackLayout class="p-2">
            <gridLayout columns="*, auto" rows="auto, auto, auto">
              <label col="0" row="0" class="text-body font-bold">Smart Watch</label>
              <label col="1" row="0" class="text-body">4.5 ★</label>
              <label col="0" row="1" class="text-body">"Good features but could be better"</label>
              <label col="0" row="2" class="text-body text-secondary">5 hours ago</label>
            </gridLayout>
          </stackLayout>
        </stackLayout>
      </stackLayout>
    </scrollView>
  );
}