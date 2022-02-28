import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label('Name'),
  nickname: Yup.string().required().min(4).label('Nickname'),
  bio: Yup.string().min(1).label('Bio'),
})
