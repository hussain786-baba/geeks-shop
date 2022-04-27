import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule,NgxUiLoaderConfig,SPINNER, POSITION,PB_DIRECTION, } from 'ngx-ui-loader';
import { NgxLoaderComponent } from '../components/ngx-loader/ngx-loader.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    blur: 1,
    delay: 0,
    fastFadeOut: true,
    fgsColor: "#f06543",
    fgsPosition: "bottom-right",
    fgsSize: 50,
    fgsType: "three-strings",
    gap: 24,
    logoPosition: "bottom-left",
    logoSize: 50,
    logoUrl: "../../assets/logo/logo2.png",
    masterLoaderId: "master",
    overlayBorderRadius: "0",
    overlayColor: "rgba(40, 40, 40, 0.8)",
    pbColor: "#f06543",
    pbDirection: "ltr",
    pbThickness: 4,
    hasProgressBar: true,
    text: "",
    textColor: "#f06543",
    textPosition: "center-center",
    maxTime: -1,
    minTime: 300
  };
const modules = [
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    // NgxUiLoaderRouterModule.forRoot({ showForeground: true }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ]

@NgModule({
    declarations: [
        NgxLoaderComponent,
  ],
  imports: [
      CommonModule,
      modules,
    ],
  exports: [
      modules
  ]
})
export class UILoader {

 }
