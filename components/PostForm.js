import React, { useEffect, useState } from 'react'

const defaultFormValues = {
  title: '',
  // body: '',
}

export default function PostForm({
  onSubmit,
  initialValues = defaultFormValues,
  submitText,
  clearOnSubmit,
}) {
  const [values, setValues] = useState(initialValues)
  const setValue = (field, value) =>
    setValues(old => ({ ...old, [field]: value }))

  const handleSubmit = e => {
    if (clearOnSubmit) {
      setValues(defaultFormValues)
    }
    e.preventDefault()
    onSubmit(values)
  }

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <div>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={e => setValue('title', e.target.value)}
          required
        />
      </div>
      <br />
      {/* <label htmlFor="body">Body</label>
      <div>
        <textarea
          type="text"
          name="body"
          value={values.body}
          required
          rows="10"
          onChange={e => setValue('body', e.target.value)}
        />
      </div> */}
      <br />
      <button type="submit">{submitText}</button>
    </form>
  )
}
