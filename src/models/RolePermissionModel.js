import db from '../db/Connection'

const RolePermissionModel = {

    findByRole: async (roleId) => {

        let query = "SELECT id_role, id_permission FROM role_permissions WHERE id_role = ?"

        const [rows] = await db.execute(query, [roleId])

        return rows

    },
    create: async (roleId, permissionId) => {

        let query = "INSERT INTO role_permissions (id_role, id_permission) VALUES (?, ?)"

        const [result] = await db.execute(query, [roleId, permissionId])

        return result.insertId

    },
    delete: async (roleId, permissionId) => {

        let query = "DELETE FROM role_permissions WHERE id_role = ? AND id_permission = ?"

        const [result] = await db.execute(query, [roleId, permissionId])

        return result.affectedRows

    }

}

export default RolePermissionModel;
