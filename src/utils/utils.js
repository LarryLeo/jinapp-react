
export const requestGet = ({apiUrl, data={}} = {}) => {
  const urlPrefix = 'http://jz.test.chimukeji.com'
  let paramsArr = []
  Object.keys(data).forEach((key) => paramsArr.push(`${key}=${data[key]}`))
  let url = `${urlPrefix}${apiUrl}?${paramsArr.join('&')}`

  return new Promise((resolve, reject) => {
    window.fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const requestPost = ({apiUrl, data={}} = {}) => {
  const urlPrefix = 'http://jz.test.chimukeji.com'
  let paramsArr = []
  Object.keys(data).forEach((key) => paramsArr.push(`${key}=${data[key]}`))
  let url = `${urlPrefix}${apiUrl}?${paramsArr.join('&')}`

  return new Promise((resolve, reject) => {
    window.fetch(url, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}
