class Emitter {
  constructor() {
    //Key:Value DS
    //check mdn for more info on Map
    this._subscriptions = new Map();
  }

  subscribe(event, callback) {
    /**
     * if event is there then set the callback to the event
     * event can be {}/[]/anything
     * "event" :{
     *  store the callback
     * "unique-id": callback
     * }
     */

    if (!callback || typeof callback !== "function") {
      throw new TypeError("Callback should be a function");
    }

    if (!this._subscriptions.has(event)) {
      this._subscriptions.set(event, new Map());
    }

    const subscriptionId = Symbol();
    const eventSubscriptions = this._subscriptions.get(event);

    eventSubscriptions.set(subscriptionId, callback);

    return {
      release: function () {
        // there is a case like when we release it and then we again try to emit or release it,
        //  then we will get error because eventSubscriptions will be empty,
        // so we need to check if eventSubscriptions is empty or not
        // so we can ask this follow up question to the interviewer that do we need to handle this case or not,
        // if yes then we can do something like this its not about happly flow always sometimes we need to think of sad flows
        if (!eventSubscriptions.has(subscriptionId)) {
          throw new Error("Subscription already released or does not exist");
        }

        eventSubscriptions.delete(subscriptionId);
      }
    };
  }

  emit(eventName, ...args) {
    const eventSubscriptions = this._subscriptions.get(eventName);

    if (!eventSubscriptions) {
      return; // No subscribers for this event, so we can simply return
      // you can also ask interviewer what to do here
    }

    eventSubscriptions.forEach((value) => value(...args));
  }
}

// no arguments
const emitter = new Emitter();

let channel = "";

console.log({ channel });

const subscription = emitter.subscribe("event1", (link) => {
  channel = link;
  console.log({
    modifiedChannel: channel
  });
});

emitter.emit(
  "event1",
  "https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg"
);

subscription.release();

emitter.emit(
  "event1",
  "https://www.youtube.com/channel/ertyuikhgfdser5t6yujhgfr"
);

console.log({
  afterRelease: channel
});
