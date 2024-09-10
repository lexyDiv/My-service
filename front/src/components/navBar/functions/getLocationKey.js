export function getLocationKey(pathName) {
   let key = "";
   for (let i = 1; i < pathName.length; i++) {
    const litera = pathName[i];
     if (litera === '/') {
        return key;
     }
     key += litera;
   }
   return key;
}