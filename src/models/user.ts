import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface UserAttributes {
  id: number;
  user_id: number;
  full_name: string;
  nationality: string | null;
  city: string | null;
  address: string | null;
  live_selfie: string | null;
  proof_of_address: string | null;
  identity_document: string | null;
  verification_status: string;
  created_at: Date;
}

// Optional attributes for creation
type UserCreationAttributes = Optional<UserAttributes, "id" | "nationality" | "city" | "address" | "live_selfie" | "proof_of_address" | "identity_document" | "created_at">;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public user_id!: number;
  public full_name!: string;
  public nationality!: string | null;
  public city!: string | null;
  public address!: string | null;
  public live_selfie!: string | null;
  public proof_of_address!: string | null;
  public identity_document!: string | null;
  public verification_status!: string;
  public readonly created_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    live_selfie: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    proof_of_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    identity_document: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    verification_status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "unverified",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users_verification",
    timestamps: false,
  }
);

export default User;
