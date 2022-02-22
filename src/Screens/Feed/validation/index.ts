import * as Yup from 'yup'

export const nicknameValidation = Yup.object().shape({
  nickname: Yup.string().required().min(4).label('Nickname'),
})

export const supportValidation = Yup.object().shape({
  support: Yup.number().required().min(1).label('Support'),
})
