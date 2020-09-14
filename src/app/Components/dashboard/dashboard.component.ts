import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';
import { UpdateItemDashboardComponent } from '../../Components/update-item-dashboard/update-item-dashboard.component';

export interface Item{
  userId:string;
  name: string;
  image:string;
  description:string;
  category: string;
  size_small: number;
  size_medium: number;
  size_large: number;
}

export interface SpecialItem{
  userId:string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private isAdd: boolean;
  private isDelete: boolean;
  private isUpdate: boolean;
  private isSale: boolean;
  private isRecommendation: boolean;

  private name: string;
  private category: string;
  private description: string;
  private size_small: number;
  private size_medium: number;
  private size_large: number;
  private image: string;

  private confirmProduct: string;
  private maxRecommendation: number = 5;

  private itemArray: Item[];
  private saleItemArray: SpecialItem[];
  private recommendedItemArray: SpecialItem[];

  constructor(private imagePicker: ImagePicker, private global: GlobalService, private fbService: CRUDService, private modalController: ModalController) { }

  ngOnInit() {
    this.SetBodySateChange(true, false, false, false, false);

    //API CALL
    this.itemArray = [
      {userId: "0", name: "Item 01", image: "assets/Images/Cart/C1.jpg", description: "description 1", category: "hair", size_small: 40, size_medium: 540, size_large: 1000},
      {userId: "0", name: "Item 02", image: "assets/Images/Cart/C2.jpg", description: "description 2", category: "hair", size_small: 50, size_medium: 400, size_large: 0},
      {userId: "0", name: "Item 03", image: "assets/Images/Cart/C3.jpg", description: "description 3", category: "color", size_small: 0, size_medium: 40, size_large: 86},
      {userId: "0", name: "Item 04", image: "assets/Images/Cart/C4.jpg", description: "description 4", category: "fragrances", size_small: 200, size_medium: 500, size_large: 0},
      {userId: "0", name: "Item 05", image: "assets/Images/Cart/C5.jpg", description: "description 5", category: "skin", size_small: 0, size_medium: 0, size_large: 123}
    ];

    //API CALL
    this.saleItemArray = [
      {userId: "0", name: "Item 01"},
      {userId: "0", name: "Item 04"}
    ];

    //API CALL
    this.recommendedItemArray = [
      {userId: "0", name: "Item 02"},
      {userId: "0", name: "Item 03"}
    ];
  }

  SegmentChanged(ev: any){
    switch(ev.detail.value){
      case '0':
        this.SetBodySateChange(true, false, false, false, false);
        break;
      case '1':
        this.SetBodySateChange(false, true, false, false, false);
        break;
      case '2':
        this.SetBodySateChange(false, false, true, false, false);
        break;
      case '3':
        this.SetBodySateChange(false, false, false, true, false);
        break;
      case '4':
        this.SetBodySateChange(false, false, false, false, true);
        break;
    }
  }

  SetBodySateChange(addCond, deleteCond, updateCon, saleCond, recommentedCond){
    this.isAdd = addCond;
    this.isDelete = deleteCond;
    this.isUpdate = updateCon;
    this.isSale = saleCond;
    this.isRecommendation = recommentedCond;
  }

  SelectImage(){
    let options = {
      maximumImagesCount: 1,
      width: 300,
      height: 300,
      quality : 100
    }

    this.imagePicker.getPictures(options).then((res) => {
      console.log('Image URI: ' + res);
      this.global.PresentToast("Image URI: " + res, "warning", 2000);
    }).then((err) => {
      console.log(err);
      this.global.PresentToast("image error: " + err, "danger", 2000);
    })
  }

  //ADD
  AddFormValidation(){
    if(this.name == undefined || this.name.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Item name is required", "danger", 2000);
      return false;
    }

    if(this.category == undefined || this.category.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Item category is required", "danger", 2000);
      return false;
    }

    if(this.description == undefined || this.description.replace(/\s/g, "").length <= 0){
      this.global.PresentToast("Item description is required", "danger", 2000);
      return false;
    }

    if(this.size_small < 0 || this.size_medium < 0 || this.size_large < 0){
      this.global.PresentToast("Item price cannot be in negative value", "danger", 2000);
      return false;
    }

    //image here

    let sizeCount = 0;

    if(this.size_small == undefined || this.size_small == 0) sizeCount++;
    if(this.size_medium == undefined || this.size_medium == 0) sizeCount++;
    if(this.size_large == undefined || this.size_large == 0) sizeCount++;

    if(sizeCount == 3){
      this.global.PresentToast("Please select atleast one size", "danger", 2000);
      return false;
    }

    if(this.size_small == undefined) this.size_small = 0;
    if(this.size_medium == undefined) this.size_medium = 0;
    if(this.size_large == undefined) this.size_large = 0;

    return true;
  }

  Add(){
    if(!this.AddFormValidation()) return; 

    let item = {
      userId: this.global.userId,
      name: this.name,
      category: this.category,
      description: this.description,
      size_small: this.size_small,
      size_medium: this.size_medium,
      size_large: this.size_large,
      image: this.image
    }

    this.fbService.Add('Items', item);
    this.global.PresentToast("Item added!", "success", 2000);
  }

  //DELETE
  ConfirmDeleteCallback(){
    console.log(this.confirmProduct);
  }

  CancelDeleteCallback(){
    console.log("Delete canceled!");
  }

  CallDelete(name){
    this.confirmProduct = name;
    this.global.CreateAlert("Delete", "Are you sure, you want to delete this item?", "Yes", "No", this.CancelDeleteCallback, this.ConfirmDeleteCallback.bind(this));
  }

  //UPDATE
  async Update(index){
    const modal = await this.modalController.create({
      component: UpdateItemDashboardComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'userId': this.itemArray[index].userId,
        'name': this.itemArray[index].name,
        'description': this.itemArray[index].description,
        'category': this.itemArray[index].category,
        'image': this.itemArray[index].image,
        'size_small': this.itemArray[index].size_small,
        'size_medium': this.itemArray[index].size_medium,
        'size_large': this.itemArray[index].size_large,
      }
    });

    return await modal.present();
  }

  //SALE
  CheckAlreadyInSale(name){
    for(let i = 0 ; i < this.saleItemArray.length; i++){
      if(this.saleItemArray[i].name == name){
        return true;
      }
    }

    return false;
  }

  CallAddToSale(name){
    this.confirmProduct = name;
    this.global.CreateAlert("Sale", "Are you sure, you want to add this item to sale?", "Yes", "No", this.CancelSaleCallback, this.ConfirmSaleCallback.bind(this));
  }

  ConfirmSaleCallback(){
    console.log(this.confirmProduct);
  }

  CancelSaleCallback(){
    console.log("Sale canceled!");
  }

  CallRemoveSale(name){
    this.confirmProduct = name;
    this.global.CreateAlert("Sale", "Are you sure, you want to remove this item from sale?", "Yes", "No", this.CancelSaleRemoveCallback, this.ConfirmSaleRemoveCallback.bind(this));
  }

  ConfirmSaleRemoveCallback(){
    console.log(this.confirmProduct);
  }

  CancelSaleRemoveCallback(){
    console.log("Sale canceled!");
  }

  //RECOMMENDATION
  CheckAlreadyInRecommendation(name){
    for(let i = 0 ; i < this.recommendedItemArray.length; i++){
      if(this.recommendedItemArray[i].name == name){
        return true;
      }
    }

    return false;
  }

  CallAddToRecommendation(name){
    if(this.recommendedItemArray.length > this.maxRecommendation){
      this.global.PresentToast("You cannot add more than " + this.maxRecommendation + " items as recommended item", "danger", 2000);
    }
    else{
      this.confirmProduct = name;
      this.global.CreateAlert("Recommendation", "Are you sure, you want to add this item to recommendation?", "Yes", "No", this.CancelRecommendationCallback, this.ConfirmRecommendationCallback.bind(this));
    }
  }

  ConfirmRecommendationCallback(){
    console.log(this.confirmProduct);
  }

  CancelRecommendationCallback(){
    console.log("Recommendation canceled!");
  }

  CallRemoveRecommendation(name){
    this.confirmProduct = name;
    this.global.CreateAlert("Recommendation", "Are you sure, you want to remove this item from recommendation?", "Yes", "No", this.CancelRecommendationRemoveCallback, this.ConfirmRecommendationRemoveCallback.bind(this));
  }

  ConfirmRecommendationRemoveCallback(){
    console.log(this.confirmProduct);
  }

  CancelRecommendationRemoveCallback(){
    console.log("Recommendation canceled!");
  }
}
