interface IBaseMenu {
  title: string
  key: string
}

export interface ISubMenuList extends IBaseMenu {
  icon: string
  menuItemList: IBaseMenu []
}
