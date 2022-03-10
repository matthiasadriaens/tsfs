import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';
import { CreationAttributes, TSFSUserRole } from './coreTypes';

export interface ICoreTestUser {
    id: string;
    username: string;
    role: TSFSUserRole;
    password: string;
}

export class CoreTestUser extends Model<ICoreTestUser, CreationAttributes<ICoreTestUser>> implements ICoreTestUser {
    readonly id!: string;
    username!: string;
    role!: TSFSUserRole;
    password!: string;
}

export const coreTestUserAttributes: ModelAttributes<CoreTestUser> = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        unique: true,
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    }
};

export const initializeCoreTestModels = async (sequelize: Sequelize): Promise<CoreTestModels> => {
    CoreTestUser.init(coreTestUserAttributes, {
        sequelize
    });

    // Define relations here.

    await sequelize.drop();
    await sequelize.sync();

    return { CoreTestUser };
};

export type CoreTestModels = {
    CoreTestUser: typeof CoreTestUser;
};