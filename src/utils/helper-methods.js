export const debouncer = (cb, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(cb, delay);
  };
};

export const toDataURL = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
};

// export const getImgSrc = (url) => {
//   // return new URL(`/src/assets/images/${url}`, import.meta.url).href;
//   console.log("img:", url);
//   console.log("url:", new URL(`/images/${url}`, import.meta.url).href);
//   return new URL(`/images/${url}`, import.meta.url).href;
// };
