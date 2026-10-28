import { MotionConfig, useAnimate } from "framer-motion";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Palette from "./components/Palette";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import CvPage from "./pages/CvPage";
import { BlogList, BlogPost } from "./pages/Blog";
import { Lang } from "./data";
import { LangContext } from "./i18n";
import { savedHomeScroll, useRoute, type Route } from "./router";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "ru" || saved === "en") return saved;
  } catch {}
  return navigator.language.startsWith("ru") ? "ru" : "en";
}

function Page({ route }: { route: Route }) {
  switch (route.page) {
    case "project":
      return <ProjectPage name={route.name} />;
    case "cv":
      return <CvPage />;
    case "blog":
      return <BlogList />;
    case "post":
      return <BlogPost slug={route.slug} />;
    default:
      return <Home />;
  }
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const route = useRoute();
  const [scope, animate] = useAnimate();
  const prevPage = useRef(route.page);
  const firstLang = useRef(true);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    if (firstLang.current) {
      firstLang.current = false;
      return;
    }
    animate(scope.current, { opacity: [0.25, 1], filter: ["blur(3px)", "blur(0px)"] }, { duration: 0.45 });
  }, [lang, animate, scope]);

  useLayoutEffect(() => {
    const from = prevPage.current;
    prevPage.current = route.page;
    if (from === route.page && route.page === "home") return;

    if (route.page !== "home") {
      window.scrollTo(0, 0);
    } else if (route.anchor) {
      document.getElementById(route.anchor)?.scrollIntoView();
    } else {
      window.scrollTo(0, savedHomeScroll());
    }
  }, [route]);

  const key = route.page === "home" ? "home" : JSON.stringify(route);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <MotionConfig reducedMotion="user">
        <Palette />
        <Sidebar route={route} />
        <main ref={scope} key={key}>
          <Page route={route} />
        </main>
        <Footer />
      </MotionConfig>
    </LangContext.Provider>
  );
}
