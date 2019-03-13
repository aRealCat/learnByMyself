import Handsontable from 'handsontable-pro'
// import Vue from 'vue'
// import imgComponent from './img.vue'

// function px2num (str) {
//   return parseInt((str.toString()).replace(/[^\d.]/g, ''))
// }

function ImgRenderer (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.dom.empty(td)
  if (Array.isArray(value) && value.length && value[0].id) {
    value.forEach(el => {
      if (el === null) { // 某些产品数据有问题
        return
      }
      let img = document.createElement('img')
      let div = document.createElement('div')
      let i = document.createElement('i')
      div.style.width = el.width ? el.width * 50 / el.height + 'px' : '70px'
      div.style.margin = '2px 4px 3px 0px'
      img.style.border = '1px solid #ccc'
      div.style.display = 'inline-block'
      div.style.textAlign = 'center'
      img.src = el.thumbSrc + '&h=80'
      div.style.background = 'rgb(245, 245, 245)'
      i.setAttribute('class', 'el-icon-loading')
      i.style.fontSize = '20px'
      i.style.color = '#66b1ff'
      let maxWidth = (window.getComputedStyle(td, null).width).replace(/[^\d.]/g, '')
      if (parseInt(div.style.width) > maxWidth && el.height) {
        div.style.width = maxWidth + 'px'
        div.style.height = (el.height.toString()).replace(/[^\d.]/g, '') / (((el.width.toString()).replace(/[^\d.]/g, '') / maxWidth)) + 'px'
        div.style.marginTop = (50 - parseFloat((div.style.height).replace(/[^\d.]/g, ''))) / 2 + 'px'
        div.style.marginBottom = (50 - parseFloat((div.style.height).replace(/[^\d.]/g, ''))) / 2 + 'px'
        img.style.width = maxWidth + 'px'
        img.style.height = (el.height.toString()).replace(/[^\d.]/g, '') / (((el.width.toString()).replace(/[^\d.]/g, '') / maxWidth)) + 'px'
      } else {
        div.style.height = '50px'
        img.style.height = '50px'
      }
      div.addEventListener('click', () => {
        // 返回点击的当前图片，所有图片
        Handsontable.hooks.run(instance, 'afterClickImage', [el, value])
      })
      div.appendChild(i)
      // div.appendChild(img)
      div.style.lineHeight = parseFloat(div.style.height.toString().replace(/[^\d.]/g, '')) - 2 + 'px'
      td.appendChild(div)
      img.onload = () => {
        div.removeChild(i)
        div.appendChild(img)
      }
    })
  }
}
// function ImgRenderer (instance, td, row, col, prop, value, cellProperties) {
//   Handsontable.dom.empty(td)
//   if (Array.isArray(value) && value.length && value[0].id) {
//     // 防止ht自动创建的行 图片单元格数据为【{bigSr:null,id:null,height:null}】
//     let colWidth = instance.getColWidth(col)
//     let div = document.createElement('div')
//     div.setAttribute('id', prop + row)

//     div.style.display = 'flex'
//     div.style.alignItems = 'center'
//     div.style.flexDirection = 'row'
//     div.style.flexWrap = 'wrap'

//     // 先渲染图片 占好位置
//     value.forEach(el => {
//       if (el === null) { // 某些产品数据有问题
//         return
//       }
//       let imgWrapper = document.createElement('span')
//       imgWrapper.style.display = 'flex'
//       imgWrapper.style.alignItems = 'center'
//       imgWrapper.style.height = '50px'

//       let img = document.createElement('img')
//       img.style.marginRight = '5px'
//       img.style.cursor = 'pointer'

//       img.setAttribute('src', el.thumbSrc + '&h=50')

//       if (el.width) {
//         let expectWidth = el.width * 50 / el.height // 缩放后的宽度
//         if (expectWidth > colWidth) {
//           img.style.width = colWidth + 'px'
//         }
//       }

//       img.addEventListener('click', () => {
//         // 返回点击的当前图片，所有图片
//         Handsontable.hooks.run(instance, 'afterClickImage', [el, value])
//       })

//       imgWrapper.appendChild(img)
//       div.appendChild(imgWrapper)
//     })

//     td.appendChild(div)

//     // if (td.querySelector(`#${prop + row}`)) {
//     //   // 再渲染组件
//     //   new Vue({
//     //     template: `<img-component :images="images" :col-width="colWidth" @clickImg="clickImg"></img-component>`,
//     //     data () {
//     //       return {
//     //         images: value,
//     //         colWidth
//     //       }
//     //     },
//     //     components: {
//     //       imgComponent
//     //     },
//     //     methods: {
//     //       clickImg (src) {
//     //         Handsontable.hooks.run(instance, 'afterChange', [
//     //           [row, prop, src, src]
//     //         ], 'showBigImage')
//     //       }
//     //     }
//     //   }).$mount(`#${prop + row}`)
//     // }
//   }
//   return td
// }

export default ImgRenderer
