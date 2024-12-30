import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface AdminAttributes {
  id: number;
  avatar: string | null;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
}

type AdminCreationAttributes = Optional<AdminAttributes, "id" | "avatar" | "created_at">;

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
  public id!: number;
  public avatar!: string | null;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public readonly created_at!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "admins",
    timestamps: false,
  }
);

export default Admin;
