import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@material-ui/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import "./chart.css"

const CHART_ID = 'pieChart';

const PieChart = ({ value, category, data, title }) => {

    useEffect(() => {
    am4core.useTheme(am4themes_animated);
    loadChart();
  }, [data]);

  const loadChart = () => {
    var chart = am4core.create(CHART_ID, am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = value;
    pieSeries.dataFields.category = category;

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: 'cursor',
        value: 'pointer'
      }
    ];

    pieSeries.alignLabels = false;
    pieSeries.ticks.template.events.on('ready', hideSmall);
    pieSeries.ticks.template.events.on('visibilitychanged', hideSmall);
    pieSeries.labels.template.events.on('ready', hideSmall);
    pieSeries.labels.template.events.on('visibilitychanged', hideSmall);

    // pieSeries.tooltipText = `{category}[/]

    //                             Value: [bold] {value}$
    //                             `;
    // pieSeries.tooltip.pointerOrientation = 'vertical';

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey('hover'); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'right';
    chart.legend.valign = 'top';

    // chart.legend.maxHeight = 350;
    chart.legend.maxWidth = undefined;
    chart.legend.scrollable = true;
    chart.data = data;
  };

  const hideSmall = (ev) => {
    ev.target.hide();
  };

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        <div>
          <div id={CHART_ID} className="pieChart"></div>
          <div>
            {data?.length > 0 &&
              data.map((item, idx) => (
                <div key={idx}>
                  <div></div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
