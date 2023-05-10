import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      field: 'team_name',
    },
  },
  {
    sequelize: db,
    modelName: 'Teams',
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default Teams;
