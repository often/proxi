# usage
while being simple **proxi** is actually very flexible!

the possibilities with it are infinite and I will only cover most common CORS proxy use cases.

## understanding the API

the url you want to proxy is given inside of the `url` query parameter.

with the `url` query parameter there are also two other query parameters you can use.

those are `pretty` and `raw`.

the `pretty` query parameter beautifies or in other words makes the output of JSON responses more pretty and therefore should be used for better readability.

the `raw` query parameter on the other hand will tell **proxi** to serve only raw responses.

at the end of the day it is all pretty self explanatory, but I feel like it is worth noting!

## examples of URLs you can request
- https://proxi.deno.dev?url=https://example.com - will return a non-beautified JSON response
- https://proxi.deno.dev?url=https://example.com&pretty - will return a beautified JSON response
- https://proxi.deno.dev?url=https://example.com&raw - will return a raw response

## code examples
in the examples down below I make use of the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API.

### GET request, JSON response
```js
let response = await fetch('https://proxi.deno.dev?url=https://example.com')
let data = await response.json()

console.log(data) // {...}
```

### POST request, JSON response
```js
let response = await fetch('https://proxi.deno.dev?url=https://example.com', {
  method: 'POST',
  headers: {foo: 'bar'},
  body: JSON.stringify({bar: 'foo'})
})
let data = await response.json()

console.log(data) // {...}
```

### GET request, raw response
```js
let response = await fetch('https://proxi.deno.dev?url=https://example.com&raw')
let body = await response.text()

console.log(body) // ...
```

### POST request, raw response
```js
let response = await fetch('https://proxi.deno.dev?url=https://example.com&raw', {
  method: 'POST',
  headers: {foo: 'bar'},
  body: JSON.stringify({bar: 'foo'})
})
let body = await response.text()

console.log(body) // ...
```
etc.

so, whatever you send to the CORS proxy will be passed to the desired url.

## limits
since this is running on Deno Deploy, their limits are described [here](https://deno.com/deploy/docs/pricing-and-limits).

## other use cases
- HTTP to HTTPS.
- CDN.
- whatever else you might consider!
