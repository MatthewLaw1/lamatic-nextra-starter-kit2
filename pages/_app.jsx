import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import ChatbotScript from "../components/chatbot";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // Initialize PostHog
    if (typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com",
        // Enable debug mode in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
      });
    }
    // Track page views
    const handleRouteChange = (path) => {
      posthog.capture("$pageview");
      hsPageView(path);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <div className={`font-sans`}>
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
        <ChatbotScript />
      </PostHogProvider>
    </div>
  );
}
