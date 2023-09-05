export interface City { 
    id: number,
    // 拼音
    spell: string,
    // 城市名字
    name:string
}

export interface Province { 
    name: string,
    data: string[],
    id?:string
}