
export default class Transformer {
  static fetchCollection(items) {
    return items.map(item => this.fetchCollection(item))
  }

  static sendCollection(items) {
    return items.map(item => this.send(item));
  }
}
