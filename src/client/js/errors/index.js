export default errCode => ({
  something_bad_happened: 'Упс...Что-то пошло не так.',
  popup_closed_by_user: '',
  access_denied: '',
}[errCode]);
