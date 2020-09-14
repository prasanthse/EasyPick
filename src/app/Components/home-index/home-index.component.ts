import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import{ GlobalService } from '../../global.service';
import{ CRUDService } from '../../crud.service';
import { ViewItemComponent } from '../../Components/view-item/view-item.component';

export interface SalesBanner{
  id:string;
  image:string;
}

export interface Categories{
  id: string;
  image: string;
  name: string;
}

export interface Recomendations{
  userId: string;
  name: string;
  image:string;
  category: string;
  description: string;
  size_small: number;
  size_medium: number;
  size_large: number;
  shop: string;
}

export interface User{
  user_name: string;
}

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
})
export class HomeIndexComponent implements OnInit {

  private salesBannerArray: SalesBanner[];
  private categories: Categories[];
  private recommendationArray: Recomendations[];
  private itemArray: Recomendations[];

  constructor(private global: GlobalService, private modalController: ModalController, private fbService: CRUDService) { }

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
    this.fbService.GetAll('Recommendations').subscribe((data: Recomendations[]) => {
      for(let i = 0; i < data.length; i++){
        this.recommendationArray = [...data]

        this.fbService.GetById('Items', 'name', data[i].name).subscribe((item: Recomendations[]) => {
          this.recommendationArray[i].category = item[0].category;
          this.recommendationArray[i].description = item[0].description;
          this.recommendationArray[i].image = item[0].image;
          this.recommendationArray[i].size_large = item[0].size_large;
          this.recommendationArray[i].size_medium = item[0].size_medium;
          this.recommendationArray[i].size_small = item[0].size_small;

          this.fbService.GetById('Users', 'user_id', this.recommendationArray[i].userId).subscribe((user: User[]) => {
            this.recommendationArray[i].shop = user[0].user_name;
          });

          this.fbService.GetImage(this.recommendationArray[i].image).then(img => {
            this.recommendationArray[i].image = img;
          });
        });
      }
    });

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

  async ViewRecomendetItem(i){
    const modal = await this.modalController.create({
      component: ViewItemComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'userId': this.recommendationArray[i].userId,
        'name': this.recommendationArray[i].name,
        'image': this.recommendationArray[i].image,
        'size_small': this.recommendationArray[i].size_small,
        'size_medium': this.recommendationArray[i].size_medium,
        'size_large': this.recommendationArray[i].size_large,
        'description': this.recommendationArray[i].description,
        'shop': this.recommendationArray[i].shop
      }
    });

    return await modal.present();
  }
}
