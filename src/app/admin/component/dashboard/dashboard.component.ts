import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/_services/httpservice.service';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private products: HttpserviceService) {}

  ngOnInit(): void {
    this.products.getAllProductApi(1, 1000).subscribe((res) => {
      this.totalProductChart(res);
      this.secondChart(res);
      this.thirdChart(res);
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
        name: key,
        steps: value,
        pictureSettings: {
          src: 'https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg',
        },
      });
    }
    let root = am5.Root.new('secondChart');
    root.setThemes([am5themes_Animated.new(root)]);

    let data = modifiedObject;
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {});

    xRenderer.grid.template.set('visible', false);
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        paddingTop: 50,
        categoryField: 'name',
        renderer: xRenderer,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set('strokeDasharray', [3]);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: yRenderer,
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'steps',
        categoryXField: 'name',
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
        tooltip: am5.Tooltip.new(root, {
          dy: -30,
          pointerOrientation: 'vertical',
          labelText: '{valueY}',
        }),
      })
    );

    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusTL: 10,
      maxWidth: 50,
      fillOpacity: 0.8,
    });

    let currentlyHovered: any;

    series.columns.template.events.on('pointerover', function (e) {
      handleHover(e.target.dataItem);
    });

    series.columns.template.events.on('pointerout', function (e) {
      handleOut();
    });

    function handleHover(dataItem: any) {
      if (dataItem && currentlyHovered != dataItem) {
        handleOut();
        currentlyHovered = dataItem;
        let bullet = dataItem.bullets[0];
        bullet.animate({
          key: 'locationY',
          to: 1,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    function handleOut() {
      if (currentlyHovered) {
        let bullet = currentlyHovered.bullets[0];
        bullet.animate({
          key: 'locationY',
          to: 0,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    let circleTemplate = am5.Template.new({});

    series.bullets.push(function (root, series, dataItem) {
      let bulletContainer = am5.Container.new(root, {});
      let circle = bulletContainer.children.push(
        am5.Circle.new(root, {
          radius: 34,
        })
      );

      let maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 27 })
      );

      let imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle,
        })
      );

      let image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: 'pictureSettings',
          centerX: am5.p50,
          centerY: am5.p50,
          width: 60,
          height: 60,
        })
      );

      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: bulletContainer,
      });
    });

    // heatrule
    series.set('heatRules', [
      {
        dataField: 'valueY',
        min: am5.color(0xe5dc36),
        max: am5.color(0x5faa46),
        target: series.columns.template,
        key: 'fill',
      },
      {
        dataField: 'valueY',
        min: am5.color(0xe5dc36),
        max: am5.color(0x5faa46),
        target: circleTemplate,
        key: 'fill',
      },
    ]);

    series.data.setAll(data);
    xAxis.data.setAll(data);

    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineX.set('visible', false);
    cursor.lineY.set('visible', false);

    cursor.events.on('cursormoved', function () {
      let dataItem = series.get('tooltip')!.dataItem;
      if (dataItem) {
        handleHover(dataItem);
      } else {
        handleOut();
      }
    });
    series.appear();
    chart.appear(1000, 100);
  }

  thirdChart(products: any) {
    let root = am5.Root.new('thirdChart');
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      })
    );

    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      })
    );
    cursor.lineY.set('visible', false);

    // The data
    let data = [
      {
        year: '1994',
        cars: 1587,
        motorcycles: 650,
        bicycles: 121,
      },
      {
        year: '1995',
        cars: 1567,
        motorcycles: 683,
        bicycles: 146,
      },
      {
        year: '1996',
        cars: 1617,
        motorcycles: 691,
        bicycles: 138,
      },
      {
        year: '1997',
        cars: 1630,
        motorcycles: 642,
        bicycles: 127,
      },
      {
        year: '1998',
        cars: 1660,
        motorcycles: 699,
        bicycles: 105,
      },
      {
        year: '1999',
        cars: 1683,
        motorcycles: 721,
        bicycles: 109,
      },
      {
        year: '2000',
        cars: 1691,
        motorcycles: 737,
        bicycles: 112,
      },
      {
        year: '2001',
        cars: 1298,
        motorcycles: 680,
        bicycles: 101,
      },
      {
        year: '2002',
        cars: 1275,
        motorcycles: 664,
        bicycles: 97,
      },
      {
        year: '2003',
        cars: 1246,
        motorcycles: 648,
        bicycles: 93,
      },
      {
        year: '2004',
        cars: 1318,
        motorcycles: 697,
        bicycles: 111,
      },
      {
        year: '2005',
        cars: 1213,
        motorcycles: 633,
        bicycles: 87,
      },
      {
        year: '2006',
        cars: 1199,
        motorcycles: 621,
        bicycles: 79,
      },
      {
        year: '2007',
        cars: 1110,
        motorcycles: 210,
        bicycles: 81,
      },
      {
        year: '2008',
        cars: 1165,
        motorcycles: 232,
        bicycles: 75,
      },
      {
        year: '2009',
        cars: 1145,
        motorcycles: 219,
        bicycles: 88,
      },
      {
        year: '2010',
        cars: 1163,
        motorcycles: 201,
        bicycles: 82,
      },
      {
        year: '2011',
        cars: 1180,
        motorcycles: 285,
        bicycles: 87,
      },
      {
        year: '2012',
        cars: 1159,
        motorcycles: 277,
        bicycles: 71,
      },
    ];

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'year',
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    function createSeries(name: any, field: any) {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueYField: field,
          categoryXField: 'year',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '[bold]{name}[/]\n{categoryX}: {valueY}',
          }),
        })
      );

      series.fills.template.setAll({
        fillOpacity: 0.5,
        visible: true,
      });

      series.data.setAll(data);
      series.appear(1000);
    }

    createSeries('Cars', 'cars');
    createSeries('Motorcycles', 'motorcycles');
    createSeries('Bicycles', 'bicycles');

    // Add scrollbar
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    );

    // Create axis ranges
    let rangeDataItem = xAxis.makeDataItem({
      category: '2001',
      endCategory: '2003',
    });

    let range = xAxis.createAxisRange(rangeDataItem);

    rangeDataItem.get('grid')!.setAll({
      stroke: am5.color(0x00ff33),
      strokeOpacity: 0.5,
      strokeDasharray: [3],
    });

    rangeDataItem.get('axisFill')!.setAll({
      fill: am5.color(0x00ff33),
      fillOpacity: 0.1,
      visible: true,
    });

    rangeDataItem.get('label')!.setAll({
      inside: true,
      text: 'Fines for speeding increased',
      rotation: 90,
      centerX: am5.p100,
      centerY: am5.p100,
      location: 0,
      paddingBottom: 10,
      paddingRight: 15,
    });

    let rangeDataItem2 = xAxis.makeDataItem({
      category: '2007',
    });

    let range2 = xAxis.createAxisRange(rangeDataItem2);

    rangeDataItem2.get('grid')!.setAll({
      stroke: am5.color(0x00ff33),
      strokeOpacity: 1,
      strokeDasharray: [3],
    });

    rangeDataItem2.get('axisFill')!.setAll({
      fill: am5.color(0x00ff33),
      fillOpacity: 0.1,
      visible: true,
    });

    rangeDataItem2.get('label')!.setAll({
      inside: true,
      text: 'Motorcycle fee introduced',
      rotation: 90,
      centerX: am5.p100,
      centerY: am5.p100,
      location: 0,
      paddingBottom: 10,
      paddingRight: 15,
    });

    // Make stuff animate on load
    chart.appear(1000, 100);
  }
}
