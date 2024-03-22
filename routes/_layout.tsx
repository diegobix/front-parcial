import { PageProps } from "$fresh/server.ts";
import Navbar from "../components/Navbar.tsx";

export default function Layout(props: PageProps) {
  const Component = props.Component;
  return (
    <div class="layout">
      <Navbar />
      <h1>My Dictionary</h1>
      <Component />
    </div>
  );
}
