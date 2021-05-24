// Deepcopy an object
export function deepcopy(original) {
    let copy = [];
    for(const item of original){
        if(Array.isArray(item)){
            copy.push(deepcopy(item));
        } else {
            copy.push(item);
        }
    }
    return copy;
}