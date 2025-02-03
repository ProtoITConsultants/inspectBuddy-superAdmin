import { useQueries } from "@tanstack/react-query";
import { toast } from "sonner";
import DashboardGraphs from "../../features/dashboard/components/StatsGraphs";
import { dashboardServices } from "../../features/dashboard/api";
import Analytics from "../../features/dashboard/components/Analytics";
import DashboardSkeleton from "../../features/dashboard/components/DashboardSkeleton";

const Dashboard = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["inspectionAndPropertiesAnalytics"],
        queryFn: () => dashboardServices.getInspectionAndPropertiesAnalytics(),
      },
      {
        queryKey: ["graphicalAnalytics"],
        queryFn: () => dashboardServices.getGraphicalAnalytics(),
      },
    ],
  });

  const [inspectionAndPropertiesAnalytics, graphicalAnalytics] = queries;

  queries.forEach((query) => {
    if (query.isError) {
      return toast.error("Error fetching stats", {
        description: query.error.message || "An error occurred.",
        duration: 3000,
      });
    }
  });

  if (
    inspectionAndPropertiesAnalytics.isPending ||
    graphicalAnalytics.isPending
  ) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <DashboardGraphs.Root>
        {graphicalAnalytics?.data?.map((stat) => (
          <DashboardGraphs.GraphCard key={stat._id}>
            <DashboardGraphs.GraphCardTitle
              cardData={{
                label: stat.label,
                statCount: stat.statCount,
                icon: stat.icon,
              }}
            />
            <DashboardGraphs.Graph
              graphData={{
                chartData: stat.chartData,
                chartColor: stat.chartColor,
                chartLabel: stat.label,
                statPercentage: stat.statPercentage,
              }}
            />
          </DashboardGraphs.GraphCard>
        ))}
      </DashboardGraphs.Root>

      <Analytics.Root>
        <Analytics.InspectionsSection>
          <Analytics.InspectionsOverview
            inspectionsDone={
              inspectionAndPropertiesAnalytics?.data?.totalInspectionCount
            }
          />
          <Analytics.ReportsGeneratedOverview
            reportsGenerated={
              inspectionAndPropertiesAnalytics?.data?.totalReportsGeneratedCount
            }
          />
        </Analytics.InspectionsSection>
        <Analytics.PropertiesSection
          propertiesData={{
            totalProperties:
              inspectionAndPropertiesAnalytics?.data?.totalPropertiesCount,
            inspectedProperties:
              inspectionAndPropertiesAnalytics?.data
                ?.propertiesWithInspectionsCount,
            nonInspectedProperties:
              inspectionAndPropertiesAnalytics?.data
                ?.propertiesWithNoInspectionsCount,
          }}
        />
      </Analytics.Root>
    </>
  );
};

export default Dashboard;
