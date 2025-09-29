import { jsx } from 'react/jsx-runtime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function withQueryProvider(WrappedComponent) {
  return (props) => {
    const queryClient = new QueryClient();
    return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(WrappedComponent, { ...props }) });
  };
}

export { withQueryProvider as w };
