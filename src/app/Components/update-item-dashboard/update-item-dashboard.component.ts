import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GlobalService } from '../../global.service';
import { CRUDService } from '../../crud.service';

@Component({
  selector: 'app-update-item-dashboard',
  templateUrl: './update-item-dashboard.component.html',
  styleUrls: ['./update-item-dashboard.component.scss'],
})
export class UpdateItemDashboardComponent implements OnInit {

  @Input() userId: string;
  @Input() name: string;
  @Input() description: string;
  @Input() category: string;
  @Input() image: string;
  @Input() size_small: number;
  @Input() size_medium: number;
  @Input() size_large: number;

  constructor(private modalController: ModalController, private global: GlobalService, private fbService: CRUDService) { }

  ngOnInit() {}

  DismissModel(){
    this.modalController.dismiss();
  }

  Update(){
    if(!this.UpdateFormValidation()) return;

    this.fbService.Update('Items', 'name', this.name, {
      category: this.category,
      description: this.description,
      size_small: this.size_small,
      size_medium: this.size_medium,
      size_large: this.size_large
    });

    this.global.PresentToast('Successfully updated!', 'success', 2000);
  }

  UpdateFormValidation(){
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
}
