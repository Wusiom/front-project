// 抽离img Element
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach(itemElement => {
    imgElements.push(...itemElement.getElementsByTagName('img'))
  })
  return imgElements
}

// 生成所有的图片链接数组
export const getAllImg = (imgElements) => {
  return imgElements.map(imgElement => {
    return imgElement.src
  })
}

// 监听图片数组加载完成（加载失败也 resolve，避免 Promise.all 一直 pending 导致 then 不执行）
export const onCompleteImgs = (imgs) => {
  if (!imgs?.length) return Promise.resolve([])
  const promiseAll = imgs.map((img, index) => {
    return new Promise((resolve) => {
      const imageObj = new Image()
      imageObj.onload = () => resolve({ img, index })
      imageObj.onerror = () => resolve({ img, index }) // 失败也 resolve，保证布局继续
      imageObj.src = img
    })
  })
  return Promise.all(promiseAll)
}

/**
 * 返回列高对象中的最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}

/**
 * 返回列高对象中的最小的高度
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中的最大的高度
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
