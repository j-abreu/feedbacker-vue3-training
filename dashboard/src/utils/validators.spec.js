import {
  validateEmptyAndEmail,
  validateEmptyAndLength3
} from './validators'

describe('Validators utils', () => {
  it('should inform that field is required', () => {
    expect(validateEmptyAndLength3()).toBe('*Required field')
  })

  it('should inform that value must be at least 3 characters long', () => {
    expect(validateEmptyAndLength3('ab')).toBe[('*Use at least 3 characters')]
  })

  it('should return true when value length is greater than or equal to 3', () => {
    expect(validateEmptyAndLength3('name')).toBe(true)
  })

  it('should inform required field on empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('*Required field')
  })

  it('should inform that email is invalid if the value does\'t match the regex', () => {
    expect(validateEmptyAndEmail('jeremias')).toBe('*Invalid email')
  })

  it('should return true if the email matches the regex', () => {
    expect(validateEmptyAndEmail('jeremias@email.com')).toBe(true)
  })
})