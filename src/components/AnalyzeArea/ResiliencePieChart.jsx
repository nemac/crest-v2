import React from "react";
import {
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { PropTypes } from "prop-types";

const ToolTipBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  borderRadius: "4px",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.CRESTLight.main,
  borderColor: theme.palette.CRESTLightBorderColor.main,
  color: theme.palette.CRESTLight.contrastText,
  borderStyle: "solid",
  borderWidth: "1px",
  justifyContent: "center",
  alignItems: "center",
}));

const RADIAN = Math.PI / 180;

export default function ResiliencePieChart(props) {
  const { data, legendColors, chartTitle, showLegend, chartType } = props;
  const renderCustomizedLabel = ({
    entry,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentFixed = (percent * 100).toFixed(0);
    if (percentFixed <= 3) {
      return null;
    }
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {percentFixed}%
      </text>
    );
  };

  const sumTotal = data.reduce((a, b) => a + (b.value || 0), 0);

  const CustomTooltip = ({ active, payload }) => {
    if (
      active &&
      payload &&
      payload.length &&
      Number.isFinite(payload[0].value)
    ) {
      return (
        <ToolTipBox>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="body2"
              component="div"
            >
              {payload[0].name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="h4"
              component="h2"
            >
              {Math.round((payload[0].value / sumTotal) * 100)}%
            </Typography>
          </Box>
        </ToolTipBox>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
  };

  return (
    <ResponsiveContainer
      id={`${chartType}-container`}
      style={{ paddingTop: "8px" }}
    >
      <PieChart>
        chartTitle && (
        <text
          x={400 / 2}
          y={"5%"}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <tspan x="50%" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {chartTitle}
          </tspan>
          {chartType === "Landcover" ? (
            <tspan x="50%" dy={"25px"} style={{ fontSize: "1rem" }}>
              {chartType}
            </tspan>
          ) : (
            <></>
          )}
        </text>
        )
        <Pie
          data={data}
          cx="50%"
          cy="60%"
          labelLine={false}
          innerRadius={"35%"}
          outerRadius={"75%"}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={legendColors[index % legendColors.length]}
            />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        {showLegend && (
          <Legend
            iconType="circle"
            layout="vertical"
            align="right"
            verticalAlign="middle"
            height={245}
            formatter={(value, entry, index) => (
              <span style={{ color: "white" }}>{value}</span>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

ResiliencePieChart.propTypes = {
  data: PropTypes.array,
  legendColors: PropTypes.array,
  chartTitle: PropTypes.string,
  showLegend: PropTypes.bool,
  chartType: PropTypes.string,
};
