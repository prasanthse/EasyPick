import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GlobalService } from '../../global.service';

export interface SalesBanner{
  id:string;
  image:string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  salesBannerArray: SalesBanner[] = [
    {id: "0", image: "assets/Images/Sale/Sale1.jpg"},
    {id: "1", image: "assets/Images/Sale/Sale2.jpg"},
    {id: "2", image: "assets/Images/Sale/Sale3.jpg"},
    {id: "3", image: "assets/Images/Sale/Sale4.jpg"},
    {id: "4", image: "assets/Images/Sale/Sale5.jpg"},
  ];

  private isSideMenuOpen: any;

  constructor(private menu: MenuController, private global: GlobalService) { }

  ngOnInit() {
    this.isSideMenuOpen = false;
    this.global.homePageTitle = "HOME";
  }

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }

  HandleSideMenu() {
    if(!this.isSideMenuOpen){
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }
    else{
      this.menu.close();
    }
  }

  SideMenuResetProperty(){
    this.isSideMenuOpen = false;
  }

  SideMenuActiveProperty(){
    this.isSideMenuOpen = true;
  }
}
