// 用户名的表单校验
export const validateUsername = (value) => {
  if (!value) {
    return '用户名不能为空'
  }
  if (value.length < 3 || value.length > 12) {
    return '用户名长度不能小于3位或大于12位'
  }
  return true
}
// 密码的表单校验
export const validatePassword = (value) => {
  if (!value) {
    return '密码不能为空'
  }
  if (value.length < 6 || value.length > 12) {
    return '密码长度不能小于6位或大于12位'
  }
  return true
}
// 确认密码的表单校验
export const validateConfirmPassword = (value, password) => {
  if (!value) {
    return '确认密码不能为空'
  }
  if (value !== password[0]) {
    return '确认密码与密码不一致'
  }
  return true
}