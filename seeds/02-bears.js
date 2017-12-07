
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('bears')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('bears').insert([
        { 'zooId': 3, 'species': 'Grizzly', 'latinName': 'Ursus Arctos' },
        { 'zooId': 3, 'species': 'Polar', 'latinName': 'Ursus Maritimus' },
        { 'zooId': 3, 'species': 'Black', 'latinName': 'Ursus Americanus' },
      ]);
    });
};
