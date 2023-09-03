export interface MenuItem { 
    // 导航图标
    icon?: string,
    // 导航名字
    name: string,
    // 导航标识
    index: string,
    // 导航的子菜单
    children?: MenuItem[]
}