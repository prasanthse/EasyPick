import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';

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

  constructor(private imagePicker: ImagePicker, private global: GlobalService, private fbService: CRUDService) { }

  ngOnInit() {
    this.SetBodySateChange(true, false, false, false, false);
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
}
