const findNearestScrollContainer = (
    elem: HTMLElement,
  ): HTMLElement | undefined => {
    if (elem.scrollHeight > elem.offsetHeight) {
      return elem
    }
  
    const parent = elem.parentElement
    if (!parent) {
      return undefined
    }
  
    return findNearestScrollContainer(parent)
  }
  
  export default findNearestScrollContainer