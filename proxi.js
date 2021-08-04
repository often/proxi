let handle = async request =>
{
  let url = new URL(request.url)
  let responseHeaders = new Headers({
    'content-type': 'text/plain; charset=utf-8',
    'access-control-allow-origin': '*'
  })

  try { url = new URL(url.search.slice(1)) }
  catch { return new Response('missing or invalid url', { status: 400, headers: responseHeaders }) }

  let response
  let { method, headers, body } = request

  try { response = await fetch(url, { method, headers, body }) }
  catch (error) { return new Response(error.message, { status: 502, headers: responseHeaders }) }

  for (let [name, value] of response.headers)
  if (!responseHeaders.has(name)) responseHeaders.set(name, value)

  return new Response(response.body, { status: response.status, headers: responseHeaders })
}

addEventListener('fetch', event => event.respondWith(handle(event.request)))
