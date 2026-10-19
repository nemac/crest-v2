import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@mui/material/styles";

import CustomTheme from "../../CRESTTheme/CRESTCustomTheme";
import ChartDescriptionCard from "./ChartDescriptionCard.jsx";

const renderCard = () =>
  renderToStaticMarkup(
    <ThemeProvider theme={CustomTheme}>
      <ChartDescriptionCard
        chartLabel="Threat Index"
        chartDescription="How the threat index is built."
        setChartDescription={() => {}}
      />
    </ThemeProvider>,
  );

// The inline style of the description grid: the element whose first child is the divider line.
const descriptionGridStyle = (markup) =>
  markup.match(/<div[^>]*style="([^"]*)"[^>]*><hr/)?.[1] ?? "";

describe("ChartDescriptionCard", () => {
  it("rounds the card's bottom corners on the description grid", () => {
    const style = descriptionGridStyle(renderCard());
    expect(style).toContain("border-bottom-left-radius:4px");
    expect(style).toContain("border-bottom-right-radius:4px");
  });

  it("ends with the description: no empty footer grid after it", () => {
    const markup = renderCard();
    expect(markup.match(/border-bottom-left-radius:4px/g)).toHaveLength(1);
    expect(markup.match(/border-bottom-right-radius:4px/g)).toHaveLength(1);
    expect(markup).not.toContain("Data and Reports");
  });

  it("keeps the rounded top corners on the header", () => {
    const markup = renderCard();
    expect(markup).toContain("border-top-left-radius:4px");
    expect(markup).toContain("border-top-right-radius:4px");
  });
});
