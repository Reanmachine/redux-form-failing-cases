# Redux-Form >6.0.0-rc.4 & ImmutableJS - Field Array Bug(s)

**Disclaimer:** I am new to `redux-form` and may very well be doing something incorrect, but I've tried
to follow the information available in the most recent documentation & some of the more important tickets
related to the issue:

* [[v6] Can't pass custom props to Field component #1397](https://github.com/erikras/redux-form/issues/1397)
* [Poll: Field component props structure #1425](https://github.com/erikras/redux-form/issues/1425)

I made this repository mostly because it was easier to illustrate the problem as I'm not intimately
familliar with the `redux-form` codebase.

**I suspect the problem is related to [this line](https://github.com/erikras/redux-form/blob/v6/src/reducer.js#L39) 
in `reducer.js`**. I believe that calling `setIn` here may be the problem as the object at `${key}` (in this case 
`fields.things` doesn't exist, so when it creates `things` it does what is described in the 
[immutableJS documentation](https://facebook.github.io/immutable-js/docs/#/Map/setIn):

> Returns a new Map having set value at this keyPath. If any keys in keyPath do not 
> exist, **a new immutable Map will be created** at that key.

This seems to be triggered when the `onFocus` and `onBlur` get fired as they need this object to
specify if it was `touched` or not.

## Running the example

```
npm i
npm start
```

Then open [http://localhost:8080/](http://localhost:8080/) in your browser.