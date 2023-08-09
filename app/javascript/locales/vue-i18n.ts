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
        questions: 'Вопросы',
        my_profile: 'Мой профиль',
        users_list: 'Список пользователей',
        logout: 'Выйти'
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
        title: 'Список пользователей'
      },
      show: {
        title: 'Страница пользователя {name}',
        info: {
          email: 'Почта',
          name: 'Имя',
          role: 'Роль',
          created_at: 'Аккаунт создан'
        }
      },
      edit: {
        title: 'Редактирование пользователя',
        form: {
          email: 'Почта',
          name: 'Имя'
        }
      }
    },
    questions: {
      index: {
        title: 'Список вопросов'
      },
      new: {
        title: 'Новый вопрос',
        form: {
          title: 'Заголовок',
          content: 'Контент'
        }
      },
      show: {
        comment: 'Комментарии',
        card: {
          created: 'Создал',
          modified: 'Изменен',
          rating: 'Рейтинг',
          viewed: 'Просмотрело'
        }
      },
      edit: {
        title: 'Изменение вопроса',
        form: {
          title: 'Заголовок',
          content: 'Контент'
        }
      }
    },
    // Component
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
    },
    pagination: {
      previous: 'Назад',
      next: 'Дальше'
    },
    search: {
      error: 'Ошибка',
      not_found: 'Не найдено'
    }
  },
  en: {
    header: {
      nav: {
        main: 'Main',
        login: 'Login',
        signup: 'Signup',
        questions: 'Questions',
        my_profile: 'My profile',
        users_list: 'Users list',
        logout: 'Logout'
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
    questions: {
      index: {
        title: 'Questions list'
      },
      new: {
        title: 'New question',
        form: {
          title: 'Title',
          content: 'Content'
        }
      },
      show: {
        comment: 'Comment',
        card: {
          created: 'Created',
          modified: 'Modified',
          rating: 'Rating',
          viewed: 'Viewed',
        }
      },
      edit: {
        title: 'Edit question',
        form: {
          title: 'Title',
          content: 'Content'
        }
      }
    },
    // Component
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
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
    },
    search: {
      error: 'Error',
      not_found: 'Not found'
    }
  },
}

const availableLocales = ['ru', 'en']

export const i18n = new VueI18n({
  locale: availableLocales.some(el => el == navigator.language) ? navigator.language : 'en',
  fallbackLocale: 'en',
  messages,
})