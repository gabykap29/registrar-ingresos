import Persons from "../Persons.js";
import Entries from "../Entries.js";

Persons.hasMany(Entries, { foreignKey: 'person_id', as: 'entries'});
Entries.belongsTo(Persons, { foreignKey: 'person_id', as: 'persons'});

Persons.sync({force: false});
Entries.sync({force: false});

export default { Persons, Entries };