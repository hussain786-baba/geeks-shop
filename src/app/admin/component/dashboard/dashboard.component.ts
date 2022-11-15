import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/_services/httpservice.service';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private products: HttpserviceService) { }

  ngOnInit(): void {
    this.products.getAllProductApi(1, 1000).subscribe((res) => {
      this.totalProductChart(res);
      this.secondChart(res);
    });
  }

  ngOnDestroy(): void {
    am5.disposeAllRootElements();
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

    let root = am5.Root.new('firstChart');
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

  secondChart(products: any) {
    console.log(products);

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
      modifiedObject.push({
        name: key, steps: value, pictureSettings: {
          src: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg"
        }
      });
    }
    console.log('modifiedObject',modifiedObject);

    let root = am5.Root.new("secondChart");
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let data = modifiedObject
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      
    });
    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        paddingTop: 40,
        categoryField: "name",
        renderer: xRenderer
        
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set("strokeDasharray", [3]);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: yRenderer
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Income",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "steps",
        categoryXField: "name",
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
        tooltip: am5.Tooltip.new(root, {
          dy: -30,
          pointerOrientation: "vertical",
          labelText: "{valueY}"
        })
      })
    );

    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusTL: 10,
      maxWidth: 50,
      fillOpacity: 0.8
    });

    let currentlyHovered: any;

    series.columns.template.events.on("pointerover", function (e) {
      handleHover(e.target.dataItem);
    });

    series.columns.template.events.on("pointerout", function (e) {
      handleOut();
    });

    function handleHover(dataItem: any) {
      if (dataItem && currentlyHovered != dataItem) {
        handleOut();
        currentlyHovered = dataItem;
        let bullet = dataItem.bullets[0];
        bullet.animate({
          key: "locationY",
          to: 1,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }
    }

    function handleOut() {
      if (currentlyHovered) {
        let bullet = currentlyHovered.bullets[0];
        bullet.animate({
          key: "locationY",
          to: 0,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }
    }

    let circleTemplate = am5.Template.new({});

    series.bullets.push(function (root, series, dataItem) {
      let bulletContainer = am5.Container.new(root, {});
      let circle = bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: 34
          },

        )
      );

      let maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 27 })
      );

      let imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle
        })
      );

      let image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: "pictureSettings",
          centerX: am5.p50,
          centerY: am5.p50,
          width: 60,
          height: 60
        })
      );

      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: bulletContainer
      });
    });

    // heatrule
    series.set("heatRules", [
      {
        dataField: "valueY",
        min: am5.color(0xe5dc36),
        max: am5.color(0x5faa46),
        target: series.columns.template,
        key: "fill"
      },
      {
        dataField: "valueY",
        min: am5.color(0xe5dc36),
        max: am5.color(0x5faa46),
        target: circleTemplate,
        key: "fill"
      }
    ]);

    series.data.setAll(data);
    xAxis.data.setAll(data);

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    cursor.events.on("cursormoved", function () {
      let dataItem = series.get("tooltip")!.dataItem;
      if (dataItem) {
        handleHover(dataItem);
      } else {
        handleOut();
      }
    });
    series.appear();
    chart.appear(1000, 100);
  }
}
