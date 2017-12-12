const VueSwipeLength =  {
  install (Vue, options) {
    Vue.directive('swipe-length', {
      bind: function(el, binding, vnode) {
        let startPos = null
        let started = false

        const set = (val) => {
          Vue.set(vnode.context, binding.expression, val)
        }

        const calcLength = (pos1, pos2, direction) => {
          let width = pos1.x - pos2.x
          let height = pos1.y - pos2.y

          let length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
          if( (direction === 'vertical' && height < 0) || (direction === 'horizontal' && width < 0) ) length *= -1

          return length
        }

        const start = (e) => {
          started = true
          startPos = eToPos(e)
          set(0)
        }


        const move = (e) => {
          if(started) {
            let nowPos = eToPos(e)
            set(calcLength(startPos, nowPos, binding.arg))
          }
        }

        const end = (e) => {
          started = false
          set(0)
        }

        if(isMobile()) {
          el.addEventListener('touchstart', start, false)
          el.addEventListener('touchmove', move, false)
          el.addEventListener('touchend', end, false)
        } else {
          el.addEventListener('mousedown', start, false)
          el.addEventListener('mousemove', move, false)
          el.addEventListener('mouseup', end, false)
          el.addEventListener('mouseleave', end, false)
        }

      }
    })



    const eToPos = (e) => {
      if(e instanceof TouchEvent) {
        return {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        }
      }
      if(e instanceof MouseEvent) {
        return {
          x: e.pageX,
          y: e.pageY
        }
      }
    }

    const isMobile = () => {
      let agent = navigator.userAgent
      return agent.indexOf('Android ') !== -1 || agent.indexOf('iPhone') !== -1 || agent.indexOf('iPad') !== -1
    }
  }
}



export default VueSwipeLength
