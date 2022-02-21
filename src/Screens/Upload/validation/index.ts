import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  description: Yup.string(),
  uploadURI: Yup.mixed().required('File is required'),
})
