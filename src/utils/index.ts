// 把图标的驼峰转换成横杠连接
export const toLine = (value: string) => { 
    // 将大写字母分组 再转成横杠连接的  再转成小写
    // return value.replace(/(A-Z)g/,'-$1').toLocaleLowerCase()
    return value.toLocaleLowerCase()
}