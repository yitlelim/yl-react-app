import {request} from '../utils/httpClient';
import {useCallback} from 'react'
import useSWR from 'swr'

export function useCrud(url: string, key: any, fetchOptions?: any) {
  //get callback
  const fetching: any = useCallback(async (url: string) => {
    const response = await request(url)
    return response
  }, [])
  const {data, error, isValidating, mutate} = useSWR(url, fetching, {
    ...fetchOptions,
  })

  // post callback
  const create: any = useCallback(
    async (payload: any, shouldRevalidate = false) => {
      const response = request(url, undefined, {
        //second param is access token
        method: 'POST',
        payload,
      })
      console.log("Create console");
      const result = response
      if (data && mutate) {
        let newData = data.payload
        // console.log(newData)
        await mutate([...new Set(newData)], shouldRevalidate)
      }
      return result
    },
    [url, data, mutate]
  )
  //delete callback
  const remove = useCallback(
    async (payload: any, shouldRevalidate = false) => {
      const response = request(url, undefined, {
        //second param is access token
        method: 'DELETE',
        payload,
      })
      const result: any = response
      if (data && mutate) {
        //  if (isArray(result)) {
        //  const updatedObjects = […data].filter((current) => {
        //  const isDeleted = result.find((result) => result[key] === current[key])
        //  return !isDeleted
        //  })
        //  await mutate(result.length === 0 ? [] : updatedObjects, shouldRevalidate)
        //  } else {
        const deletedIndex = data.findIndex(
          (object: any) => object[key] === result[key]
        )
        if (deletedIndex >= 0) {
          const updatedObjects = [...data]
          updatedObjects.splice(deletedIndex, 1)
          await mutate(updatedObjects, shouldRevalidate)
        }
      }
      //  }
      return result
    },
    [url, data, key, mutate]
  )
  //update callback
  const update = useCallback(
    async (payload: any, shouldRevalidate = false): Promise<any> => {
      const currentObjectIndex = data.findIndex(
        (object: any) => object[key] === payload[key]
      )
      const response = request(url, undefined, {
        //second param is access token
        method: 'PUT',
        payload,
      })

      if (data && mutate) {
        const updatedObjects = [...data]
        updatedObjects.splice(currentObjectIndex, 1, response)
        await mutate(updatedObjects, shouldRevalidate)
      }
      return response
    },
    [url, data, mutate, key]
  )

  return {
    create,
    fetching: {
      data,
      error,
      loading: isValidating,
      mutate,
    },
    remove,
    update,
  }
}


