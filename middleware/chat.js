export default function({store, redirect}) {
  //если информации о пользователе нет, редиректим на сраницу входа
  if(!Object.keys(store.state.user).length) {
    redirect('/?message=noUser');
  }
}
