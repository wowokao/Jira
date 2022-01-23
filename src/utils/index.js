export const isFalsy = (value) => value === 0 ? false : !value

export const cleanObject = (object) => {
    const res = {...object}
    Object.keys(res).forEach(key => {
        const value = res[key]
        if(isFalsy(value)){
            delete res[key]
        }
    })
    return res
}