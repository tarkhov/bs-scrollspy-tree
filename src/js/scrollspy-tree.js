if (typeof bootstrap !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    const spys = document.querySelectorAll('[data-bs-spy="scroll"]')
    if (spys.length) {
      const CLASS_NAME_SHOW = 'show'

      function parentsUntil(el, selector, filter) {
        const result = [];
        // match start from parent
        el = el.parentElement;
        while (el && !el.matches.call(el, selector)) {
          if (!filter) {
            result.push(el);
          } else if (el.matches.call(el, filter)) {
            result.push(el);
          }
          el = el.parentElement;
        }
        return result;
      }

      spys.forEach(spy => {
        spy.addEventListener('activate.bs.scrollspy', function (event) {
          const targetSelector = event.target.dataset.bsTarget
          const target = document.querySelector(targetSelector)
          const shown = target.getElementsByClassName(CLASS_NAME_SHOW)
          if (shown.length) {
            [...shown].forEach(item => item.classList.remove(CLASS_NAME_SHOW))            
          }

          let itemSelector = null
          const link = event.relatedTarget
          if (link.classList.contains('dropdown-item')) {
            itemSelector = '.dropdown, .dropdown-menu, .dropdown-toggle'
          } else if (link.classList.contains('nav-link')) {
            itemSelector = '.nav-item'
          }

          if (itemSelector !== null) {
            const items = parentsUntil(link, targetSelector, itemSelector)
            if (items.length) {
              items.forEach(item => item.classList.add(CLASS_NAME_SHOW))
            }
          }
        })
      })
    }
  })
}