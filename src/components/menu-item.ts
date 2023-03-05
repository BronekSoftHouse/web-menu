import { Component } from "../models/component.js";
import { MenuItemModel } from "../models/menu-item.js";
import { foodAllergensTypes } from "../data/allergen-types.js";
import * as Currency from "../util/currency.js";

export class MenuItem extends Component<HTMLDivElement, HTMLDivElement> {
    private item: MenuItemModel;
    private imageElement: HTMLImageElement;
  
    constructor(hostId: string, position: MenuItemModel) {
      const screenWidth = window.innerWidth;
  
      if (screenWidth >= 600) {
        super("menu-item-template", hostId, false, position.id);
      } else {
        super("menu-list-position-small-template", hostId, false, position.id);
      }
  
      this.imageElement = this.element.querySelector(".menu-item-image")! as HTMLImageElement
      this.item = position;
      this.renderContent();
    }
  
    configure(): void {}
  
    renderContent(): void {
      this.element.querySelector(".menu-item-name")!.textContent = this.item.name;
      this.element.querySelector(".menu-item-description")!.textContent = this.item.description;
      this.element.querySelector(".menu-item-price")!.textContent = Currency.convertToCurrency(this.item.price);

      if (this.item.imagePath) {
        this.imageElement.src = this.item.imagePath!;
      } else {
        this.imageElement.style.objectFit = "none";
      }
  
      const allergenList = this.element.querySelector(".menu-position-allergens") as HTMLDivElement;
  
      this.item.allergenCodes.forEach((code) => {
        const allergen = foodAllergensTypes.find((el) => el.code === code);
        const img = document.createElement("img") as HTMLImageElement;
        img.className = "alergy-icon";
        img.src = allergen!.iconPath;
  
        allergenList.appendChild(img);
      });
    }
}
  
