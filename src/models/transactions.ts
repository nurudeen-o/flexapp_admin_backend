import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/database";

export class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    ad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM("buy", "sell"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "buyer",
        "seller",
        "completed",
        "cancelled"
      ),
      allowNull: true,
      defaultValue: "pending",
    },
    gas_fee: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "0",
    },
    escrow_fee: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "0",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP") as unknown as string,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "transactions",
    timestamps: false,
  }
);
