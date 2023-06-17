import VueI18n from "vue-i18n"
import Vue from "vue"

Vue.use(VueI18n) // DIRTY :(

const messages = {
  ru: {
    header: {
      nav: {
        main: 'Главная',
        login: 'Войти',
        signup: 'Регистрация',
        users_list: 'Список пользователей'
      }
    },
    main: {
      title: 'Привет'
    },
    signup: {
      title: 'Регистрация',
      form: {
        email: 'Почта',
        name: 'Имя',
        password: 'Пароль',
        password_confirmation: 'Повторите пароль'
      }
    },
    login: {
      title: 'Вход',
      form: {
        email: 'Почта',
        password: 'Пароль',
        remember: 'Сохранить вход'
      }
    },
    users: {
      index: {
        title: 'Список пользователей',
      },
      show: {
        title: 'Страница пользователя {name}',
        info: {
          email: 'Почта',
          name: 'Имя',
          role: 'Роль',
          created_at: 'Аккаунт создан',
        }
      },
      edit: {
        title: 'Редактирование пользователя',
        form: {
          email: 'Почта',
          name: 'Имя',
        }
      }
    },
    notification: {
      user: {
        destroy: {
          title: 'Пользователь удален',
          text: 'Пользователь успешно удален!',
        },
        update: {
          title: 'Пользователь изменен',
          text: 'Пользователь успешно изменен!'
        },
        create: {
          title: 'Пользователь создан',
          text: 'Пользователь успешно создан!'
        }
      }
    }
  },
  en: {
    header: {
      nav: {
        main: 'Main',
        login: 'Login',
        signup: 'Signup',
        users_list: 'Users list'
      }
    },
    main: {
      title: 'Hello there'
    },
    signup: {
      title: 'Signup',
      form: {
        email: 'Email',
        name: 'Name',
        password: 'Password',
        password_confirmation: 'Repeat password'
      }
    },
    login: {
      title: 'Login',
      form: {
        email: 'Email',
        password: 'Password',
        remember: 'Remember me'
      }
    },
    users: {
      index: {
        title: 'Users list',
      },
      show: {
        title: '{name} page',
        info: {
          email: 'Email',
          name: 'Name',
          role: 'Role',
          created_at: 'Created at',
        }
      },
      edit: {
        title: 'User edit',
        form: {
          email: 'Email',
          name: 'Name',
        }
      }
    },
    notification: {
      user: {
        destroy: {
          title: 'User deleted',
          text: 'User has been successfully deleted!',
        },
        update: {
          title: 'User changed',
          text: 'User has been successfully changed!'
        },
        create: {
          title: 'User created',
          text: 'User has been successfully created!'
        }
      }
    }
  },
}

const availableLocales = ['ru', 'en']
console.log(
  availableLocales.some(el => el == navigator.language) ? navigator.language : 'en'
);

export const i18n = new VueI18n({
  locale: availableLocales.some(el => el == navigator.language) ? navigator.language : 'en',
  fallbackLocale: 'en',
  messages,
})