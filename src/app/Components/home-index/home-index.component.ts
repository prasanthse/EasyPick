import { Component, OnInit } from '@angular/core';

import{ GlobalService } from '../../global.service';

export interface SalesBanner{
  id:string;
  image:string;
}

export interface Categories{
  id: string;
  image: string;
  name: string;
}

export interface Products{
  id: string;
  name: string;
  image:string;
  size: string[];
  unitPrice: number[];
}

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
})
export class HomeIndexComponent implements OnInit {

  private salesBannerArray: SalesBanner[];
  private categories: Categories[];
  private recommendationArray: Products[];

  constructor(private global: GlobalService) { }

  ngOnInit() {
    //API CALL FOR SALES BANNER
    this.salesBannerArray = [
      {id: "0", image: "assets/Images/Sale/Sale1.jpg"},
      {id: "1", image: "assets/Images/Sale/Sale2.jpg"},
      {id: "2", image: "assets/Images/Sale/Sale3.jpg"},
      {id: "3", image: "assets/Images/Sale/Sale4.jpg"},
      {id: "4", image: "assets/Images/Sale/Sale5.jpg"},
    ];

    //API CALL FOR RECOMMENDATIONS
    this.recommendationArray = [
      {id: "0", name: "Item A", image: "assets/Images/Recommendations/R1.jpg", size: ["small", "medium"], unitPrice: [550, 870]},
      {id: "1", name: "Item B", image: "assets/Images/Recommendations/R2.jpg", size: ["small", "medium"], unitPrice: [100, 190]},
      {id: "2", name: "Item C", image: "assets/Images/Recommendations/R3.jpg", size: ["medium"], unitPrice: [300]},
      {id: "3", name: "Item D", image: "assets/Images/Recommendations/R4.jpg", size: ["small", "medium"], unitPrice: [500, 800]},
      {id: "4", name: "Item E", image: "assets/Images/Recommendations/R5.jpg", size: ["small", "medium", "Large"], unitPrice: [1200, 1500, 2000]},
      {id: "5", name: "Item F", image: "assets/Images/Recommendations/R6.jpg", size: ["small"], unitPrice: [120]},
      {id: "6", name: "Item G", image: "assets/Images/Recommendations/R7.jpg", size: ["small", "Large"], unitPrice: [330, 480]},
      {id: "7", name: "Item H", image: "assets/Images/Recommendations/R8.jpg", size: ["small", "medium"], unitPrice: [270, 525]},
      {id: "8", name: "Item I", image: "assets/Images/Recommendations/R9.jpg", size: ["small", "medium", "Large"], unitPrice: [475, 800, 1200]},
      {id: "9", name: "Item J", image: "assets/Images/Recommendations/R10.jpg", size: ["medium"], unitPrice: [425]}
    ];

    this.categories = [
      {id: "0", image: "assets/Images/Categories/SkinCare.png", name: "Skin Care"},
      {id: "1", image: "assets/Images/Categories/Hair.png", name: "Hair Care"},
      {id: "2", image: "assets/Images/Categories/Fragrances.png", name: "Fragrences"},
      {id: "3", image: "assets/Images/Categories/PersonalCare.png", name: "Personal Care"},
      {id: "4", image: "assets/Images/Categories/Color.png", name: "Color Cosmetics"}
    ];
  }

  slideSalesBanner = {
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

  slideCategory = {
    slidesPerView: 3,
    pagination: false,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  SelectCategory(category){
    this.global.categoryName = category;
    this.global.selectedHomeComponent = 2;
  }
}
