import { codeToHtml } from 'shiki'
import { Suspense, createResource } from 'solid-js';

const Highlighted = (params: {
  code: Parameters<typeof codeToHtml>[0],
  options: Parameters<typeof codeToHtml>[1],
}) => {
  const renderCode = async (code: string) => {
    return await codeToHtml(code, params.options)
  }

  const [renderedCode] = createResource(params.code, renderCode);

  return <Suspense fallback={params.code}>
    <span innerHTML={renderedCode()} class='highlight-container' />
  </Suspense>
};

export default Highlighted;
