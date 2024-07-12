/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.alterTable('users', function(table) {
    table.string('number').alter(); // 学籍番号を文字列に変更
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable('users', function(table) {
    table.integer('number').alter(); // 学籍番号を元の整数に戻す
  });
};
