import db from '../db/Connection'

const PermissionModel = {

    findByName: async (name) => {

        let query = "SELECT id, name FROM permissions WHERE name = ?"

        const [rows] = await db.execute(query, [name])

        return rows[0]

    },
    findById: async (permissionId) => {

        let query = "SELECT id, name FROM permissions WHERE id = ?"

        const [rows] = await db.execute(query, [permissionId])

        return rows[0]

    }

}

export default PermissionModel;
