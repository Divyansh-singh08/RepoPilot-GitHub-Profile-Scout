// app/providers.tsx
//this is running in the client-component
//running in the browser not in the server

"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";

export function Providers({ children }) {
	return <ChakraProvider>{children}</ChakraProvider>
}

// "use client";

// import { CacheProvider } from "@chakra-ui/next-js";
// import { ChakraProvider } from "@chakra-ui/react";

// export function Providers({ children }) {
// 	return (
// 		<CacheProvider>
// 			<ChakraProvider>{children}</ChakraProvider>
// 		</CacheProvider>
// 	);
// }
