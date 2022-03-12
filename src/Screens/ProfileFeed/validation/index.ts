import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  price: Yup.number().required().label('Price'),
})
