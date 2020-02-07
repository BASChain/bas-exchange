import Transformer from '@/transformers/AccountTransformer'
import * as types from './mutation-types';


export const find = ({commit}) => {

  const account = {
    nickname:'test',
    wallet:'0xeB1eB91C6f9824af574D8273FA66e68F68fEEb72'
  };

  commit(types.FIND ,Transformer.fetch(account))
}

export default {
  find,
}
