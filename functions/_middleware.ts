type PagesContext = {
  request: Request;
  next: () => Promise<Response>;
};

const CANONICAL_HOST = "nomadburn.com";

function shouldNormalizeTrailingSlash(pathname: string): boolean {
  return (
    pathname !== "/" &&
    !pathname.endsWith("/") &&
    !pathname.includes(".") &&
    !pathname.startsWith("/api/")
  );
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const url = new URL(context.request.url);
  let shouldRedirect = false;

  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    shouldRedirect = true;
  }

  if (shouldNormalizeTrailingSlash(url.pathname)) {
    url.pathname = `${url.pathname}/`;
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
