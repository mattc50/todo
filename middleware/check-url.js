import mongoose from 'mongoose'
import Set from '../models/Set.js'
import { NotFoundError } from '../errors/index.js';
const ObjectId = mongoose.Types.ObjectId;

const checkURLMiddleware = async (req, res, next) => {
  const { id: setId } = req.params;

  if (!ObjectId.isValid(setId)) {
    // Invalid ObjectId
    throw new NotFoundError('Invalid Set ID');
    // res.status(404).redirect(404, '/client/public/src/pages/error.js')
    // res.status(404).send('invalid ID')
    // next()
    return
  }

  const getSet = await Set.findOne({ _id: setId, createdBy: req.user.userId });

  if (!getSet) {
    // Set not found in the database
    throw new NotFoundError('Set not found');
    // res.status(404).redirect(404, '/client/public/src/pages/error.js')
    // res.status(404).send('no set')
    // next()
    return
  }

  const toString = getSet.createdBy._id.toString();

  if (toString !== req.user.userId) {
    throw new NotFoundError('Set not found');
    // res.status(404).redirect(404, '/client/public/src/pages/error.js')
    // res.status(404).send('not created by user')
    // next()
    return
  }
  else {
    next()
  }
}

export default checkURLMiddleware;