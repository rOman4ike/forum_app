import store from 'main/store/base'
import { router } from 'main/routes/index'

export default function(): object {
  function checkAbiltities(abilityPath: boolean) {
    return new Promise((resolve, reject) => {
      if (abilityPath) {
        resolve(true)
      } else {
        router.push({ name: 'main' })
        store.commit('notice/setNotice', {
          title: "Error",
          text: 'asdfdsf',
          type: 'danger'
        })
        resolve(false)
      }
    })
  }

  return {
    checkAbiltities
  }
}