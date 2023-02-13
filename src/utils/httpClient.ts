/**
 * fetch data from rest api
 *
 * @param {string} url
 * @param {string} accesToken
 * @param {object} options
 * @param {string} [options.method]
 * @param {string} [options.payloadd] - request body
 * @param {object} [options.headers]
 *
 * @returns {Promise}
 */

export const request = async (
    url: string,
    accesToken?: string,
    options = {}
  ) => {
    const config = {
      method: 'GET',
      payload: {},
      headers: {},
      ...options,
    }
  
    const setupErrors = ['']
    if (!url) {
      setupErrors.push('url')
    }
  
    if (setupErrors.length > 0) {
      throw new Error(`Error! you must pass \`${setupErrors.join(',')}\``)
    }
  
    const token = accesToken
    const headers = token
      ? {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          ...config.headers,
        }
      : {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...config.headers,
        }
  
    const body: any = null
  
    const params = {
      headers,
      method: config.method,
      body,
    }
  
    if (params.method !== 'GET') {
      if (
        params.headers &&
        params.headers['Content-Type'] &&
        params.headers['Content-Type'].match('application/x-www-form-urlencoded')
      ) {
        let formBody: any = []
        const payload: any = config.payload
  
        Object.keys(payload).forEach((key: string) => {
          const encodedKey = encodeURIComponent(key)
          const encodedValue = encodeURIComponent(payload[key])
          formBody.push(`${encodedKey}=${encodedValue}`)
        })
        formBody = formBody.join('&')
        params.body = formBody
      } else {
        params.body = JSON.stringify(config.payload)
      }
    }
    return fetch(url, params).then(async (response) => {
      if (response.ok) {
        const success = {
          payload: await getJSON(response),
          status: response.status,
        }
  
        return success
      } else {
        const error = {
          error: true,
          payload: await getJSON(response).then(() => {
            return new ApiError()
          }),
        }
  
        throw error
      }
    })
  }
  
  /**
   * Extract JSON from server response
   *
   * @function getJSON
   * @access public
   * @param {object} response - raw respose object
   * @returns {Promise| undefined}
   */
  
  const getJSON = async (response: any) => {
    const contentType = response.headers.get('Content-Type')
    const emptyCodes = [204, 205]
    if (
      contentType &&
      contentType.indexOf('json') !== -1 &&
      emptyCodes.indexOf(response.status)
    ) {
      return await response.json()
    } else {
      return await Promise.resolve()
    }
  }
  
  class ApiError extends Error {
    constructor() {
      super()
      this.name = 'ApiError'
    }
  }
  