import store from 'main/store/base'
import { router } from 'main/routes/index'

export default function(): object {
  function checkAbiltities(ability: boolean) {
    return new Promise((resolve, reject) => {
      if (ability) {
        resolve(true)
      } else {
        store.commit('notice/setNotice', {
          title: "Error",
          text: 'asdfdsf',
          type: 'danger'
        })
        router.push({ name: 'main' })
        resolve(false)
      }
    })
  }

  return {
    checkAbiltities
  }
}