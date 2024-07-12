/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.uuid('uuid').defaultTo(knex.raw('gen_random_uuid()')).notNullable().unique();
    table.string('name', 15).notNullable();
    table.string('email', 100).unique().notNullable();
    table.string('ruby', 100).notNullable(); // 追加されたカラム
    table.boolean('sex').notNullable(); // ブール値: true = male, false = female
    table.integer('faculty_id').unsigned().references('id').inTable('faculties'); // 学部（外部キー制約）
    table.integer('number').notNullable(); // 学籍番号
    table.integer('year_id').unsigned().references('id').inTable('years'); // 学年（外部キー制約）
    table.integer('campus_id').unsigned().references('id').inTable('campuses'); // キャンパス（外部キー制約）
    table.date('birthday'); // 誕生日（日付型）
    table.string('tell', 100);
    table.string('post', 20); // 郵便番号
    table.string('address', 100);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
