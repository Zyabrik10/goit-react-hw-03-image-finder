export default function fetchImages(query) {
  return fetch(
    `https://pixabay.com/api/?key=35790595-0862ce34bbcdea66fb3b3d261&image_type=photo&orientation=horizontal&per_page=12&${query}`
  ).then(res => {
    if (!res.ok) {
      throw Error('problems');
    }

    return res.json();
  });
}
