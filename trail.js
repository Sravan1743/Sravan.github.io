/* 
 Image Trail Effect
 Codrops Demo 4
 https://tympanus.net
 MIT License
*/

const MathUtils = {
  lerp: (a, b, n) => (1 - n) * a + n * b,
  distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
  rand: (min, max) => Math.random() * (max - min) + min
}

let mousePos = { x: 0, y: 0 }
let lastMousePos = { x: 0, y: 0 }
let cacheMousePos = { x: 0, y: 0 }

window.addEventListener("mousemove", e => {
  mousePos = { x: e.clientX, y: e.clientY }
})

class TrailImage {
  constructor(el) {
    this.el = el
    this.rect = el.getBoundingClientRect()
  }

  show(zIndex) {
    TweenMax.killTweensOf(this.el)

    TweenMax.set(this.el, {
      opacity: 1,
      zIndex,
      x: cacheMousePos.x - this.rect.width / 2,
      y: cacheMousePos.y - this.rect.height / 2
    })

    TweenMax.to(this.el, 1.6, {
      ease: Expo.easeOut,
      x: mousePos.x - this.rect.width / 2,
      y: mousePos.y - this.rect.height / 2
    })

    TweenMax.to(this.el, 0.8, {
      ease: Power1.easeOut,
      opacity: 0,
      delay: 0.6
    })

    TweenMax.to(this.el, 1, {
      ease: Quint.easeOut,
      x: `+=${MathUtils.rand(-200, 200)}`,
      y: `+=${MathUtils.rand(-200, 200)}`,
      rotation: MathUtils.rand(-30, 30),
      delay: 0.6
    })
  }
}

class ImageTrail {
  constructor() {
    this.images = [...document.querySelectorAll(".trail-img")].map(
      img => new TrailImage(img)
    )
    this.total = this.images.length
    this.index = 0
    this.zIndex = 1
    this.threshold = 50

    requestAnimationFrame(() => this.render())
  }

  render() {
    const distance = MathUtils.distance(
      mousePos.x,
      mousePos.y,
      lastMousePos.x,
      lastMousePos.y
    )

    cacheMousePos.x = MathUtils.lerp(cacheMousePos.x, mousePos.x, 0.1)
    cacheMousePos.y = MathUtils.lerp(cacheMousePos.y, mousePos.y, 0.1)

    if (distance > this.threshold) {
      this.images[this.index].show(this.zIndex++)
      this.index = (this.index + 1) % this.total
      lastMousePos = { ...mousePos }
    }

    requestAnimationFrame(() => this.render())
  }
}

imagesLoaded(document.querySelectorAll(".trail-img"), () => {
  document.querySelector(".image-trail-section").classList.remove("loading")
  new ImageTrail()
})
