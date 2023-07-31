import TodosStore from "./todos-store"
import UsersStore from "./users-store"
import AdminsStore from "./admins-store"

class RootStore {
    todosStore = new TodosStore()
    usersStore = new UsersStore()
    adminsStore = new AdminsStore()
}

export default RootStore