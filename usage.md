# usage
the url you want to proxy is given at the end of the url as a query parameter.

for example: [https://proxi.deno.dev?https://google.com](https://proxi.deno.dev?https://google.com)

# code examples
in the examples below I use the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API.

## get the response
```js
console.log(await fetch('https://proxi.deno.dev?https://google.com'))
```

## get the body
```js
console.log(await (await fetch('https://proxi.deno.dev?https://google.com')).text())
```

## set the request method to POST
```js
console.log(await fetch('https://proxi.deno.dev?https://google.com', { method: 'POST' }))
```

## set a header
```js
console.log(await fetch('https://proxi.deno.dev?https://google.com', {
  headers: { shrug: '¯\_(ツ)_/¯' }
}))
```

## send JSON
```js
console.log(await fetch('https://proxi.deno.dev?https://google.com', {
  method: 'POST',
  body: JSON.stringify({ shrug: '¯\_(ツ)_/¯' })
}))
```
etc.

# other use cases
- HTTP to HTTPS.
- CDN.
- whatever else you want?
