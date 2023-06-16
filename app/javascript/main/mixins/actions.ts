import store from 'main/store/base'

export default function(): object {
  function destroyRecord(params: object, methodPath: string): object {
    return new Promise((resolve, reject) => {
      if (confirm('Are you sure?')) {
        store.dispatch(methodPath, params).then(data => {
          if (data.ok) {
            store.commit('notice/setNotice', {
              title: "Success",
              text: 'asdfdsf',
              type: 'success'
            })
            resolve(data)
          }
        })
      }
    })
  }

  return {
    destroyRecord
  }
}