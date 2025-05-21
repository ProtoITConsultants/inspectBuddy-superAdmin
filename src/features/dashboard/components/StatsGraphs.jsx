import positiveIcon from "../../../assets/icons/positiveArrow.svg";
import negativeIcon from "../../../assets/icons/negativeArrow.svg";
import { LineChart } from "@mantine/charts";

const Root = ({ children }) => (
  <div className="flex flex-wrap items-center gap-[25px] sm:justify-start justify-center">
    {children}
  </div>
);

const GraphCard = ({ children }) => {
  return (
    <div className="border border-[#CCE2FF] rounded-[12px] p-[20px] h-[210px] flex flex-col justify-center items-center gap-[10px] w-full sm:max-w-[330px] min-w-[250px] flex-1">
      {children}
    </div>
  );
};

const GraphCardTitle = ({ cardData }) => {
  return (
    <div className="flex flex-col gap-[10px] items-center w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="text-[24px] font-bold text-dark-blue">
            {cardData.statCount}
          </p>
          <p className="text-[16px] text-dark-grays">{cardData.label}</p>
        </div>
        <img src={cardData.icon} alt="stat-icon" />
      </div>
      <div className="border-b border-[#CCE2FF] w-full"></div>
    </div>
  );
};

const Graph = ({ graphData }) => {
  return (
    <div className="flex-1 flex flex-col gap-[16px] w-full">
      <div className="flex items-center">
        {graphData.statPercentage > 0 || graphData.statPercentage === "∞" ? (
          <img src={positiveIcon} alt="positive-icon" />
        ) : (
          <img src={negativeIcon} alt="positive-icon" />
        )}
        &nbsp;
        <p className="text-[14px]">
          <span
            className={`${
              graphData.statPercentage > 0 || graphData.statPercentage === "∞"
                ? "text-[#27AE60]"
                : "text-[#EB5757]"
            }`}
          >
            {graphData.statPercentage}%
          </span>
          &nbsp;<span className="text-dark-gray">vs PREV.</span>
          &nbsp;<span className="text-dark-blue">Month</span>
        </p>
      </div>
      <LineChart
        h={50}
        data={graphData.chartData}
        series={[
          {
            name: "count",
            label: graphData.chartLabel,
            color: graphData.chartColor,
          },
        ]}
        dataKey="label"
        withDots={false}
        strokeWidth={3}
        curveType="natural"
        yAxisProps={{ domain: [-25, 40] }}
        valueFormatter={(value) => `${value}`}
        withXAxis={false}
        withYAxis={false}
        gridAxis="none"
      />
    </div>
  );
};

const DashboardGraphs = {
  Root,
  GraphCard,
  GraphCardTitle,
  Graph,
};

export default DashboardGraphs;
