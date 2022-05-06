const Author = require('../models/Author')

const getNewAuthor = (authorData) => {
  const { id, firstName, middleName, lastName } = authorData;

  const fullName = [firstName, middleName, lastName]
    .filter((name) => name)
    .join(' ');

  return {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
  };
};

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;

  return true;
  }

const getAll = async () => {
  const authors = await Author.getAll();

  return authors.map(getNewAuthor);
}

const findById = async (id) => {
  const author = await Author.findById(id);

  if (!author) return null;

  return getNewAuthor(author);
};

async function createAuthor (firstName, middleName, lasteName) {
  const validAuthor = isValid(firstName, middleName, lasteName)

  if (!validAuthor) return false

  const author = await Author.createAuthor(firstName, middleName, lasteName)

  return author
}

module.exports = {
  getAll,
  findById,
  createAuthor
}