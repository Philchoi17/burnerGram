import * as Yup from 'yup'

export const nicknameValidation = Yup.object().shape({
  nickname: Yup.string().required().min(4).label('Nickname'),
})
