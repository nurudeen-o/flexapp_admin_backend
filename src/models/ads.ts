import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface AdAttributes {
  ad_id: number;
  user_id: number | null;
  payment_method_id: number | null;
  currency: string;
  min_trade_amount: number;
  max_trade_amount: number;
  exchange_rate: string;
  exchange_currency: string;
  terms_and_conditions: string | null;
  type: number;
  payment_details: string | null;
  status: "active" | "inactive";
  created_at: Date;
}

// Optional attributes for creation
type AdCreationAttributes = Optional<AdAttributes, "ad_id" | "user_id" | "payment_method_id" | "terms_and_conditions" | "payment_details" | "status" | "created_at">;

class Ad extends Model<AdAttributes, AdCreationAttributes> implements AdAttributes {
  public ad_id!: number;
  public user_id!: number | null;
  public payment_method_id!: number | null;
  public currency!: string;
  public min_trade_amount!: number;
  public max_trade_amount!: number;
  public exchange_rate!: string;
  public exchange_currency!: string;
  public terms_and_conditions!: string | null;
  public type!: number;
  public payment_details!: string | null;
  public status!: "active" | "inactive";
  public readonly created_at!: Date;
}

Ad.init(
  {
    ad_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    payment_method_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    min_trade_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    max_trade_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    exchange_rate: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    exchange_currency: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "USD",
    },
    terms_and_conditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: true,
      defaultValue: "active",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "p2p_ads",
    timestamps: false,
  }
);

export default Ad;
