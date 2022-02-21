import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  comment: Yup.string().min(1).required().label('Comment'),
})
