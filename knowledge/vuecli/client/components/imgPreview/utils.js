import PhotoSwipe from 'photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'

function fmtSrc (images) {
  let result = []
  images.forEach(image => {
    result.push({src:image.bigSrc,w:image.width || 800,h:image.height || 800,msrc:image.thumbSrc + '&h=80'})
  })
  return result
}

export function openPhotoSwipe ({index = 0, disableAnimation = false, galleryArray}) {
  let pswpElement = document.querySelectorAll('.pswp')[0]
  if (!pswpElement) {
    console.log('需要引入imgPreview组件并在页面装载他')
    return
  }
  let gallery
  let photoSwipeOptions = {
    index,
    history: false,
    bgOpacity: 0.85
  }


  photoSwipeOptions.index = parseInt(index, 10)
  photoSwipeOptions.history = false


  // exit if index not found
  if (isNaN(photoSwipeOptions.index)) {
    return
  }
  if (disableAnimation) {
    photoSwipeOptions.showAnimationDuration = 0
  }

  galleryArray = fmtSrc(galleryArray)
  // Pass data to PhotoSwipe and initialize it
  gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, galleryArray, photoSwipeOptions)
  gallery.init()
  // Gallery starts closing
  // gallery.listen('close', () => {

  // })
}

