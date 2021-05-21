export function deepcopy(original) {
    let clone = [];
    for(const item of original){
        if(Array.isArray(item)){
            clone.push(deepcopy(item));
        } else {
            clone.push(item);
        }
    }
    return clone;
}