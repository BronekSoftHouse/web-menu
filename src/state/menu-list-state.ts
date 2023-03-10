import { MenuItem, MenuItemHeader } from "../components/menu-item.js";
import { MenuItemModel } from "../models/menu-item.js";

export class MenuListState {
  private static instance: MenuListState;
  private menuItems: MenuItemModel[] = [];

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new MenuListState();
      return this.instance;
    }
  }

  updateMenuList(menuItems: MenuItemModel[]) {
    this.menuItems = menuItems;
    
    const container = document.getElementById("menu-list-container")!;
    container.innerHTML = "";
    
    const categories = Array.from(new Set(menuItems.map(item => item.foodCategory)));

    categories.forEach(category => {
      new MenuItemHeader("menu-list-container", category.toString());
      this.menuItems.filter(item => item.foodCategory == category).forEach((item) => {
        new MenuItem("menu-list-container", item);
      });
    });
  }
}