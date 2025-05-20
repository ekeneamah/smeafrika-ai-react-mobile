import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { AnalyticsStackParamList } from "../../components/navigation/AnalyticsTabNavigator";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { colors } from "../../theme/colors";
import {
  Label,
  GridLayout,
  StackLayout,
  ScrollView,
  ProgressBar,
  DropDown,
  FlexboxLayout
} from "../../components/native/nativeElements";
import { registerElement } from "react-nativescript";

registerElement("wrapLayout", () => require("@nativescript/core").WrapLayout);

const WrapLayout: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) =>
  React.createElement("wrapLayout", {
    class: className,
    children,
  });

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
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <GridLayout columns="*, auto" className="mb-4">
          <Label col={0} className="text-title">Review Analytics</Label>
          <DropDown
            col={1}
            items={["This Month", "Last 3 Months", "Last 6 Months", "This Year"]}
            selectedIndex={0}
            className="w-32"
            onSelectedIndexChanged={(e) => {
              const ranges = ["month", "quarter", "half", "year"];
              setTimeRange(ranges[e.object.selectedIndex]);
            }}
          />
        </GridLayout>

        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Review Summary</Label>
          <GridLayout columns="*, *" rows="auto, auto" className="text-center">
            <StackLayout col={0} row={0} className="p-2">
              <Label className="text-title">4.8</Label>
              <Label className="text-body">Average Rating</Label>
            </StackLayout>
            <StackLayout col={1} row={0} className="p-2">
              <Label className="text-title">245</Label>
              <Label className="text-body">Total Reviews</Label>
            </StackLayout>
            <StackLayout col={0} row={1} className="p-2">
              <Label className="text-title">92%</Label>
              <Label className="text-body">Response Rate</Label>
            </StackLayout>
            <StackLayout col={1} row={1} className="p-2">
              <Label className="text-title">6h</Label>
              <Label className="text-body">Avg. Response Time</Label>
            </StackLayout>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Rating Distribution</Label>
          {[
            { stars: "5", value: 75, color: colors.primary },
            { stars: "4", value: 15, color: colors.primary },
            { stars: "3", value: 5, color: colors.warning },
            { stars: "2", value: 3, color: colors.error },
            { stars: "1", value: 2, color: colors.error },
          ].map((r, i) => (
            <GridLayout key={i} columns="auto, *, auto" className="mb-2">
              <Label col={0} className="text-body">{r.stars} ★</Label>
              <ProgressBar col={1} value={r.value} maxValue={100} className="bg-primary100 mx-2" color={r.color} />
              <Label col={2} className="text-body">{r.value}%</Label>
            </GridLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Review Trend</Label>
          <GridLayout columns="*" className="h-48 bg-primary100 rounded-md">
            <Label className="text-center">Review Trend Chart</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Top Rated Products</Label>
          {[
            { title: "Wireless Earbuds", rating: "4.9 ★", reviews: "85 reviews" },
            { title: "Smart Watch", rating: "4.8 ★", reviews: "62 reviews" },
            { title: "Bluetooth Speaker", rating: "4.7 ★", reviews: "48 reviews" },
          ].map((p, i) => (
            <StackLayout key={i} className={i < 2 ? "border-b border-divider p-2" : "p-2"}>
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col={0} row={0} className="text-body font-bold">{p.title}</Label>
                <Label col={1} row={0} className="text-body">{p.rating}</Label>
                <Label col={0} row={1} className="text-body text-secondary">{p.reviews}</Label>
              </GridLayout>
            </StackLayout>
          ))}
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Common Keywords</Label>
          <WrapLayout>
            {["Great quality (45)", "Fast shipping (32)", "Good value (28)", "Excellent service (25)", "Recommended (20)"].map((text, i) => (
              <StackLayout key={i} className="bg-primary100 rounded-full px-3 py-1 m-1">
                <Label className="text-primary">{text}</Label>
              </StackLayout>
            ))}
          </WrapLayout>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Recent Reviews</Label>
          {[
            {
              title: "Wireless Earbuds",
              rating: "5.0 ★",
              comment: "\"Great sound quality and battery life!\"",
              time: "2 hours ago",
            },
            {
              title: "Smart Watch",
              rating: "4.5 ★",
              comment: "\"Good features but could be better\"",
              time: "5 hours ago",
            },
          ].map((r, i) => (
            <StackLayout key={i} className={i === 0 ? "border-b border-divider p-2" : "p-2"}>
              <GridLayout columns="*, auto" rows="auto, auto, auto">
                <Label col={0} row={0} className="text-body font-bold">{r.title}</Label>
                <Label col={1} row={0} className="text-body">{r.rating}</Label>
                <Label col={0} row={1} className="text-body">{r.comment}</Label>
                <Label col={0} row={2} className="text-body text-secondary">{r.time}</Label>
              </GridLayout>
            </StackLayout>
          ))}
        </StackLayout>
      </StackLayout>
    </ScrollView>
  );
}
