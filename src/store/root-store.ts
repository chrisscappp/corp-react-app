import CommandStore from "./command-store"
import UsersStore from "./users-store"
import AdminsStore from "./admins-store"

class RootStore {
    commandsStore = new CommandStore()
    usersStore = new UsersStore()
    adminsStore = new AdminsStore()
}

export default RootStore