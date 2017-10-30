/**
 * node for pathfinding;
 */
class Node {

  constructor(position, previous) {
    this.position = position;
    this.previous = previous;
  }

  retunAllNodes() {
    if (this.previous == null)
      return;

    return this + this.previous.retunAllNodes();
  }

}