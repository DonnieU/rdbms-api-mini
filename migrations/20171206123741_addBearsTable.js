
exports.up = function (knex, Promise) {
  return knex.schema.createTable('bears', function (tbl) {
    tbl.increments('id');
    // this is how we express FK (foreign key) relationships...
    tbl.integer('zooId')
      .notNullable()
      .references('id')
      .inTable('zoos');

    tbl.string('species', 80).notNullable().unique('species', 'uq_bear_species');
    tbl.string('latinName', 80).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  // to rollback or undo the changes
  knex.schema.dropTableIfExists('bears');
};
