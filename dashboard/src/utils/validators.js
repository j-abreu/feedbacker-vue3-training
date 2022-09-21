export function validateEmptyAndLength3 (value) {
  if (!value) {
    return '*Required field'
  }

  if (value.length < 3) {
    return '*Use at least 3 characters'
  }

  return true
}

export function validateEmptyAndEmail (value) {
  if (!value) {
    return '*Required field'
  }

  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

  if (!isValid) {
    return '*Invalid email'
  }

  return true
}
