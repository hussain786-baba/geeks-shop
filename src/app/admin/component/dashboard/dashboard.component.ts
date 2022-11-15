import { Component, Input, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/_services/httpservice.service';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private products: HttpserviceService) {}
  ngOnInit(): void {
    this.products.getAllProductApi(1, 1000).subscribe((res) => {
      this.totalProductChart(res);
    });
  }

  totalProductChart(products: any) {
    let productType: any = [];
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      productType.push(element.category.name);
    }

    const count = productType.reduce((accumulator: any, value: any) => {
      return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
    }, {});

    let modifiedObject = [];
    for (const [key, value] of Object.entries(count)) {
      modifiedObject.push({ category: key, value: value });
    }

    let root = am5.Root.new('chartdiv');
    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
      })
    );

    // Add cursor
    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', true);

    // Create axes
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'category',
      })
    );

    series.columns.template.setAll({
      width: am5.percent(120),
      fillOpacity: 0.9,
      strokeOpacity: 0,
    });
    // Set Colors from chart color array
    series.columns.template.adapters.add('fill', (fill, target) => {
      return chart.get('colors')!.getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add('stroke', (stroke, target) => {
      return chart.get('colors')!.getIndex(series.columns.indexOf(target));
    });
    series.columns.template.set('draw', function (display, target) {
      let w = target.getPrivate('width', 0);
      let h = target.getPrivate('height', 0);
      display.moveTo(0, h);
      display.bezierCurveTo(w / 4, h, w / 4, 0, w / 2, 0);
      display.bezierCurveTo(w - w / 4, 0, w - w / 4, h, w, h);
    });
    // Set data
    xAxis.data.setAll(modifiedObject);
    series.data.setAll(modifiedObject);
    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);
  }
}
