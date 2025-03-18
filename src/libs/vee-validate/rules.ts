export const validatorRequired = (value: string | number | boolean | null | undefined): boolean => {
  const isNullOrUndefined = value === null || value === undefined
  const isEmptyArray = Array.isArray(value) && value.length === 0

  if (isNullOrUndefined || isEmptyArray || value === false) return false

  return !!String(value).trim().length
}
