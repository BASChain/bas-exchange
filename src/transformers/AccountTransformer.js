import Transformer from './Transformer';

export default class AccountTransformer extends Transformer {

  static fetch(account) {
    return {
      nickname:account.nickname,
      wallet:account.wallet
    }
  }

  static send(account) {
    return  {
      nickname: account.nickname,
      wallet:account.wallet
    }
  }
}
